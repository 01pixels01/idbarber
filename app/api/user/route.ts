import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/user — obtiene o crea el perfil del usuario en DB
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        loyaltyPoints: { orderBy: { createdAt: "desc" }, take: 10 },
        appointments: {
          where: { date: { gte: new Date() }, status: { notIn: ["CANCELLED"] } },
          include: { service: true, barber: { select: { name: true } } },
          orderBy: { date: "asc" },
          take: 3,
        },
      },
    });

    // Auto-crear si es primera vez
    if (!user) {
      const clerkUser = await currentUser();
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser?.emailAddresses[0]?.emailAddress ?? "",
          name: `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim(),
          avatarUrl: clerkUser?.imageUrl,
          role: "CLIENT",
        },
        include: {
          loyaltyPoints: true,
          appointments: { include: { service: true, barber: { select: { name: true } } } },
        },
      });
    }

    // Calcular puntos totales
    const totalPoints = await prisma.loyaltyPoint.aggregate({
      where: { userId: user.id },
      _sum: { points: true },
    });

    // Contar visitas totales
    const totalVisits = await prisma.appointment.count({
      where: { clientId: user.id, status: "COMPLETED" },
    });

    // Calcular total gastado
    const totalSpent = await prisma.appointment.aggregate({
      where: { clientId: user.id, status: "COMPLETED" },
      _sum: { totalPrice: true },
    });

    // Determinar tier
    const points = totalPoints._sum.points ?? 0;
    const tier =
      points >= 1500
        ? "VIP"
        : points >= 750
        ? "Gold"
        : points >= 250
        ? "Silver"
        : "Bronze";

    return NextResponse.json({
      user,
      stats: {
        totalPoints: points,
        totalVisits,
        totalSpent: totalSpent._sum.totalPrice ?? 0,
        tier,
      },
    });
  } catch (error) {
    console.error("[GET /api/user]", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
