import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import type { PrismaClient } from "@prisma/client";

const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      unitPrice: z.number().positive(),
    })
  ),
  address: z.string().optional(),
  clientName: z.string(),
  clientEmail: z.string().email(),
  clientPhone: z.string(),
});

// GET /api/orders — pedidos del usuario
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ orders: [] });

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: {
        items: { include: { product: { select: { name: true, imageUrl: true } } } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("[GET /api/orders]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// POST /api/orders — crear pedido
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = orderSchema.parse(body);
    const { userId } = await auth();

    // Verificar stock de todos los productos
    for (const item of data.items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        return NextResponse.json(
          { error: `Producto ${item.productId} no encontrado` },
          { status: 404 }
        );
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${product.name}` },
          { status: 409 }
        );
      }
    }

    // Obtener o crear usuario
    let dbUser = userId
      ? await prisma.user.findUnique({ where: { clerkId: userId } })
      : await prisma.user.findUnique({ where: { email: data.clientEmail } });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: userId ?? `guest_${Date.now()}`,
          email: data.clientEmail,
          name: data.clientName,
          phone: data.clientPhone,
          role: "CLIENT",
        },
      });
    }

    const total = data.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const shipping = total >= 100000 ? 0 : 12000;

    // Crear la orden en transacción
    const order = await prisma.$transaction(async (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => {
      const newOrder = await tx.order.create({
        data: {
          userId: dbUser.id,
          total: total + shipping,
          status: "PAID",
          address: data.address,
          items: {
            create: data.items.map((i) => ({
              productId: i.productId,
              quantity: i.quantity,
              unitPrice: i.unitPrice,
            })),
          },
        },
        include: { items: true },
      });

      // Descontar stock
      for (const item of data.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      // Puntos de fidelización
      const pointsEarned = Math.floor(total / 1000);
      await tx.loyaltyPoint.create({
        data: {
          userId: dbUser.id,
          points: pointsEarned,
          description: `Compra online: ${newOrder.id.slice(-6).toUpperCase()}`,
          type: "EARN",
        },
      });

      return newOrder;
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    console.error("[POST /api/orders]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
