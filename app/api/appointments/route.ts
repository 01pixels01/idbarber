import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  serviceId: z.string(),
  barberId: z.string(),
  date: z.string(),
  startTime: z.string(),
  notes: z.string().optional(),
  clientName: z.string(),
  clientPhone: z.string(),
  clientEmail: z.string().email(),
});

// GET /api/appointments — lista las citas del usuario autenticado
export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ appointments: [] });
    }

    const appointments = await prisma.appointment.findMany({
      where: { clientId: user.id },
      include: {
        service: true,
        barber: { select: { name: true, avatarUrl: true } },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("[GET /api/appointments]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// POST /api/appointments — crea una nueva cita
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = createSchema.parse(body);

    // Obtener o crear usuario (puede ser guest que no ha iniciado sesión)
    const { userId } = await auth();

    const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
    if (!service) {
      return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
    }

    // Calcular hora fin
    const [h, m] = data.startTime.split(":").map(Number);
    const endMinutes = h * 60 + m + service.duration;
    const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;

    // Verificar disponibilidad
    const conflict = await prisma.appointment.findFirst({
      where: {
        barberId: data.barberId,
        date: new Date(data.date),
        status: { notIn: ["CANCELLED", "NO_SHOW"] },
        OR: [
          { startTime: { lte: data.startTime }, endTime: { gt: data.startTime } },
          { startTime: { lt: endTime }, endTime: { gte: endTime } },
          { startTime: { gte: data.startTime }, endTime: { lte: endTime } },
        ],
      },
    });

    if (conflict) {
      return NextResponse.json({ error: "Horario no disponible" }, { status: 409 });
    }

    // Obtener o crear el cliente en DB
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

    const appointment = await prisma.appointment.create({
      data: {
        clientId: dbUser.id,
        barberId: data.barberId,
        serviceId: data.serviceId,
        date: new Date(data.date),
        startTime: data.startTime,
        endTime,
        notes: data.notes,
        totalPrice: service.price,
        status: "CONFIRMED",
      },
      include: {
        service: true,
        barber: { select: { name: true } },
      },
    });

    // Sumar puntos de fidelización (1 punto por cada $1.000)
    const pointsEarned = Math.floor(service.price / 1000);
    await prisma.loyaltyPoint.create({
      data: {
        userId: dbUser.id,
        points: pointsEarned,
        description: `Cita: ${service.name}`,
        type: "EARN",
      },
    });

    return NextResponse.json({ appointment, pointsEarned }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }
    console.error("[POST /api/appointments]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
