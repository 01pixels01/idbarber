import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// PATCH /api/appointments/[id] — actualiza estado (cancelar, reagendar)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, date, startTime } = body;

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const appointment = await prisma.appointment.findFirst({
      where: { id, clientId: user.id },
      include: { service: true },
    });

    if (!appointment) {
      return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};

    if (status) updateData.status = status;

    if (date && startTime) {
      const [h, m] = startTime.split(":").map(Number);
      const endMinutes = h * 60 + m + appointment.service.duration;
      updateData.date = new Date(date);
      updateData.startTime = startTime;
      updateData.endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ appointment: updated });
  } catch (error) {
    console.error("[PATCH /api/appointments/[id]]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
