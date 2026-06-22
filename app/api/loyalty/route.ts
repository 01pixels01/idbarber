import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const redeemSchema = z.object({
  points: z.number().int().positive(),
  description: z.string().default("Canje de puntos"),
});

// GET /api/loyalty — historial de puntos
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ history: [], total: 0 });

    const history = await prisma.loyaltyPoint.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const total = history.reduce((s: number, h: { points: number }) => s + h.points, 0);

    return NextResponse.json({ history, total });
  } catch (error) {
    console.error("[GET /api/loyalty]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// POST /api/loyalty — canjear puntos
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const body = await req.json();
    const { points, description } = redeemSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

    // Calcular saldo actual
    const agg = await prisma.loyaltyPoint.aggregate({
      where: { userId: user.id },
      _sum: { points: true },
    });
    const balance = agg._sum.points ?? 0;

    if (points > balance) {
      return NextResponse.json({ error: "Puntos insuficientes" }, { status: 400 });
    }

    const record = await prisma.loyaltyPoint.create({
      data: {
        userId: user.id,
        points: -points,
        description,
        type: "REDEEM",
      },
    });

    return NextResponse.json({ record, newBalance: balance - points });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    console.error("[POST /api/loyalty]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
