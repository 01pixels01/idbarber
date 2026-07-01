import { prisma } from "@/lib/db";

function fmtCOP(n: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}
function startOfMonth() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export interface DashboardData {
  revenueMonth: string;
  revenueMonthRaw: number;
  appointmentsToday: number;
  newClientsMonth: number;
  avgTicket: string;
  todayList: {
    id: string;
    client: string;
    service: string;
    barber: string;
    time: string;
    status: string;
  }[];
  topServices: { name: string; count: number; revenue: string; pct: number }[];
}

export interface AdminClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  spent: number;
  points: number;
  lastVisit: string | null;
  tier: string;
}

function tierFor(points: number): string {
  if (points >= 1500) return "VIP";
  if (points >= 750) return "Gold";
  if (points >= 250) return "Silver";
  return "Bronze";
}

/** Lista de clientes reales con sus métricas (visitas, gastado, puntos, tier). */
export async function getClients(): Promise<AdminClient[]> {
  try {
    const users = await prisma.user.findMany({
      where: { role: "CLIENT" },
      include: {
        appointments: { select: { totalPrice: true, date: true, status: true } },
        loyaltyPoints: { select: { points: true, type: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return users.map((u) => {
      const valid = u.appointments.filter((a) => a.status !== "CANCELLED" && a.status !== "NO_SHOW");
      const spent = valid.reduce((s, a) => s + a.totalPrice, 0);
      const points = u.loyaltyPoints.reduce(
        (s, p) => s + (p.type === "REDEEM" ? -p.points : p.points),
        0
      );
      const last = valid.length
        ? valid.map((a) => a.date).sort((a, b) => b.getTime() - a.getTime())[0]
        : null;
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone ?? "—",
        visits: valid.length,
        spent,
        points,
        lastVisit: last ? last.toISOString().split("T")[0] : null,
        tier: tierFor(points),
      };
    });
  } catch (e) {
    console.error("[getClients]", e);
    return [];
  }
}

/** Métricas reales del dashboard admin. Devuelve estado vacío si la DB no responde. */
export async function getDashboardData(): Promise<DashboardData> {
  const empty: DashboardData = {
    revenueMonth: fmtCOP(0),
    revenueMonthRaw: 0,
    appointmentsToday: 0,
    newClientsMonth: 0,
    avgTicket: fmtCOP(0),
    todayList: [],
    topServices: [],
  };

  try {
    const monthStart = startOfMonth();

    const [monthAppts, todayAppts, newClients, topGroups] = await Promise.all([
      prisma.appointment.findMany({
        where: { date: { gte: monthStart }, status: { notIn: ["CANCELLED", "NO_SHOW"] } },
        select: { totalPrice: true },
      }),
      prisma.appointment.findMany({
        where: { date: { gte: startOfToday(), lte: endOfToday() } },
        include: {
          service: { select: { name: true } },
          client: { select: { name: true } },
          barber: { select: { name: true } },
        },
        orderBy: { startTime: "asc" },
      }),
      prisma.user.count({
        where: { role: "CLIENT", createdAt: { gte: monthStart } },
      }),
      prisma.appointment.groupBy({
        by: ["serviceId"],
        where: { status: { notIn: ["CANCELLED", "NO_SHOW"] } },
        _count: { serviceId: true },
        _sum: { totalPrice: true },
        orderBy: { _count: { serviceId: "desc" } },
        take: 5,
      }),
    ]);

    const revenueMonthRaw = monthAppts.reduce((s, a) => s + a.totalPrice, 0);
    const avgTicketRaw = monthAppts.length ? revenueMonthRaw / monthAppts.length : 0;

    // Nombres de servicios para el top
    const serviceIds = topGroups.map((g) => g.serviceId);
    const services = serviceIds.length
      ? await prisma.service.findMany({ where: { id: { in: serviceIds } }, select: { id: true, name: true } })
      : [];
    const nameById = new Map(services.map((s) => [s.id, s.name]));
    const maxCount = topGroups[0]?._count.serviceId ?? 1;

    return {
      revenueMonth: fmtCOP(revenueMonthRaw),
      revenueMonthRaw,
      appointmentsToday: todayAppts.length,
      newClientsMonth: newClients,
      avgTicket: fmtCOP(Math.round(avgTicketRaw)),
      todayList: todayAppts.map((a) => ({
        id: a.id,
        client: a.client?.name ?? "Cliente",
        service: a.service?.name ?? "Servicio",
        barber: a.barber?.name ?? "—",
        time: a.startTime,
        status: a.status.toLowerCase(),
      })),
      topServices: topGroups.map((g) => ({
        name: nameById.get(g.serviceId) ?? "Servicio",
        count: g._count.serviceId,
        revenue: fmtCOP(g._sum.totalPrice ?? 0),
        pct: Math.round((g._count.serviceId / maxCount) * 100),
      })),
    };
  } catch (e) {
    console.error("[getDashboardData]", e);
    return empty;
  }
}
