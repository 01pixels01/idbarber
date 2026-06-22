"use client";

import { useState, useEffect } from "react";
import {
  Calendar, ShoppingBag, Star, Gift, Clock, CheckCircle,
  XCircle, RefreshCw, Scissors, Package, Bell, Loader2
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

interface Appointment {
  id: string;
  service: { name: string; price: number };
  barber: { name: string };
  date: string;
  startTime: string;
  status: string;
  totalPrice: number;
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: { product: { name: string; imageUrl?: string }; quantity: number; unitPrice: number }[];
}

interface LoyaltyPoint {
  id: string;
  points: number;
  description: string;
  type: string;
  createdAt: string;
}

const pointsHistory = [
  { id: 1, desc: "Corte + Barba", points: +50, date: "7 Jun 2026", type: "earn" },
  { id: 2, desc: "Pomada Mate Premium", points: +65, date: "10 Jun 2026", type: "earn" },
  { id: 3, desc: "Canje: descuento 10%", points: -100, date: "3 Jun 2026", type: "redeem" },
  { id: 4, desc: "Fade Premium", points: +35, date: "24 May 2026", type: "earn" },
  { id: 5, desc: "Kit Completo Barbería", points: +220, date: "15 May 2026", type: "earn" },
];

const tierConfig = {
  Bronze: { color: "text-orange-400 bg-orange-400/10 border-orange-400/20", next: "Silver", pointsNeeded: 250 },
  Silver: { color: "text-gray-300 bg-white/5 border-white/10", next: "Gold", pointsNeeded: 750 },
  Gold: { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", next: "VIP", pointsNeeded: 1500 },
  VIP: { color: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20", next: null, pointsNeeded: null },
};

const tabs = [
  { id: "overview", label: "Resumen", icon: Calendar },
  { id: "appointments", label: "Mis citas", icon: Scissors },
  { id: "orders", label: "Mis pedidos", icon: ShoppingBag },
  { id: "loyalty", label: "Puntos", icon: Gift },
];

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(p);
}

export default function DashboardClient() {
  const { user: clerkUser } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [aptsRes, ordersRes] = await Promise.all([
          fetch("/api/appointments"),
          fetch("/api/orders"),
        ]);
        if (aptsRes.ok) {
          const { appointments: apts } = await aptsRes.json();
          setAppointments(apts ?? []);
        }
        if (ordersRes.ok) {
          const { orders: ords } = await ordersRes.json();
          setOrders(ords ?? []);
        }
      } catch {
        // DB not connected yet — silently use empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const now = new Date();
  const upcomingAppointments = appointments.filter((a) => new Date(`${a.date}T${a.startTime}`) >= now);
  const pastAppointments = appointments.filter((a) => new Date(`${a.date}T${a.startTime}`) < now);
  const totalSpent = appointments.reduce((s, a) => s + a.totalPrice, 0) + orders.reduce((s, o) => s + o.total, 0);
  const points = totalPoints || Math.floor(totalSpent / 1000);
  const tier_key = points >= 1500 ? "VIP" : points >= 750 ? "Gold" : points >= 250 ? "Silver" : "Bronze";

  const user = {
    name: clerkUser?.fullName ?? clerkUser?.firstName ?? "Usuario",
    email: clerkUser?.primaryEmailAddress?.emailAddress ?? "",
    initials: ((clerkUser?.firstName?.[0] ?? "") + (clerkUser?.lastName?.[0] ?? "")).toUpperCase() || "U",
    points,
    tier: tier_key,
    totalVisits: appointments.length,
    totalSpent,
  };

  const tier = tierConfig[user.tier as keyof typeof tierConfig];
  const pointsPct = tier.pointsNeeded ? Math.min((user.points / tier.pointsNeeded) * 100, 100) : 100;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Profile header */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xl font-bold text-[#D4AF37]">
            {user.initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-white">{user.name}</h1>
              <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", tier.color)}>
                {user.tier}
              </span>
            </div>
            <p className="text-[#888888] text-sm">{user.email}</p>
          </div>
          <div className="flex gap-6 text-center">
            {[
              { label: "Visitas", value: user.totalVisits },
              { label: "Gastado", value: fmt(user.totalSpent) },
              { label: "Puntos", value: user.points },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-white font-bold text-lg">{value}</div>
                <div className="text-[#888888] text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Points progress */}
        {tier.next && (
          <div className="mt-5 pt-5 border-t border-white/5">
            <div className="flex justify-between text-xs text-[#888888] mb-2">
              <span>
                <span className="text-[#D4AF37]">{user.points}</span> puntos actuales
              </span>
              <span>
                {tier.pointsNeeded! - user.points} puntos para {tier.next}
              </span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D4AF37] rounded-full transition-all duration-700"
                style={{ width: `${pointsPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Reservar cita", icon: Scissors, href: "/reservar", variant: "gold" as const },
          { label: "Ir a la tienda", icon: ShoppingBag, href: "/tienda", variant: "dark" as const },
          { label: "Ver puntos", icon: Gift, href: "#", variant: "dark" as const, onClick: () => setActiveTab("loyalty") },
          { label: "Notificaciones", icon: Bell, href: "#", variant: "dark" as const },
        ].map(({ label, icon: Icon, href, variant, onClick }) => (
          <Link key={label} href={href} onClick={onClick}>
            <Button variant={variant} size="sm" className="w-full flex-col gap-2 py-4 h-auto">
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111111] border border-white/5 rounded-2xl p-1.5 mb-6 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap flex-1 justify-center transition-all",
              activeTab === id
                ? "bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]"
                : "text-[#888888] hover:text-white"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && <OverviewTab upcoming={upcomingAppointments} past={pastAppointments} />}
      {activeTab === "appointments" && <AppointmentsTab upcoming={upcomingAppointments} past={pastAppointments} />}
      {activeTab === "orders" && <OrdersTab orders={orders} />}
      {activeTab === "loyalty" && <LoyaltyTab points={user.points} tier={user.tier} history={pointsHistory} />}
    </div>
  );
}

function OverviewTab({ upcoming, past }: { upcoming: Appointment[]; past: Appointment[] }) {
  const next = upcoming[0];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Next appointment */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          Próxima cita
        </h2>
        {next ? (
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-white">{next.service.name}</p>
                <p className="text-[#888888] text-sm">{next.barber.name}</p>
              </div>
              <span className="bg-green-400/10 text-green-400 border border-green-400/20 text-xs px-2 py-0.5 rounded-full">
                Confirmada
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#888888]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(next.date).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {next.startTime}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="dark" size="sm">
                <RefreshCw className="w-3.5 h-3.5" />
                Reagendar
              </Button>
              <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-400/5">
                <XCircle className="w-3.5 h-3.5" />
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-[#888888] text-sm mb-3">No tienes citas próximas</p>
            <Link href="/reservar">
              <Button variant="gold" size="sm">Reservar cita</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Recent activity */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          Actividad reciente
        </h2>
        {past.length === 0 ? (
          <p className="text-[#888888] text-sm text-center py-6">Sin historial aún</p>
        ) : (
          <div className="space-y-3">
            {past.slice(0, 3).map((apt) => (
              <div key={apt.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{apt.service.name}</p>
                  <p className="text-[#888888] text-xs">
                    {new Date(apt.date).toLocaleDateString("es-CO")} · {apt.barber.name}
                  </p>
                </div>
                <p className="text-[#D4AF37] text-sm font-semibold">{fmt(apt.totalPrice)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentsTab({ upcoming, past }: { upcoming: Appointment[]; past: Appointment[] }) {
  return (
    <div className="space-y-6">
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Próximas citas</h2>
          <Link href="/reservar"><Button variant="gold" size="sm">+ Nueva cita</Button></Link>
        </div>
        {upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((apt) => (
              <div key={apt.id} className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{apt.service.name}</p>
                  <p className="text-[#888888] text-sm">
                    {apt.barber.name} · {new Date(apt.date).toLocaleDateString("es-CO")} a las {apt.startTime}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-bold">{fmt(apt.totalPrice)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#888888] text-sm text-center py-4">Sin citas próximas</p>
        )}
      </div>

      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-4">Historial de citas</h2>
        {past.length === 0 ? (
          <p className="text-[#888888] text-sm text-center py-4">Sin historial aún</p>
        ) : (
          <div className="space-y-2">
            {past.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/2 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{apt.service.name}</p>
                  <p className="text-[#888888] text-xs">
                    {new Date(apt.date).toLocaleDateString("es-CO")} · {apt.barber.name}
                  </p>
                </div>
                <p className="text-white text-sm font-semibold">{fmt(apt.totalPrice)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrdersTab({ orders }: { orders: Order[] }) {
  const statusLabel: Record<string, { label: string; color: string }> = {
    PAID: { label: "Pagado", color: "text-green-400 bg-green-400/10 border-green-400/20" },
    PENDING: { label: "Pendiente", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
    CANCELLED: { label: "Cancelado", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  };

  return (
    <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-white">Mis pedidos</h2>
        <Link href="/tienda"><Button variant="gold" size="sm">Ir a la tienda</Button></Link>
      </div>
      {orders.length === 0 ? (
        <p className="text-[#888888] text-sm text-center py-6">No tienes pedidos aún</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const s = statusLabel[order.status] ?? statusLabel.PENDING;
            const firstName = order.items[0]?.product.name ?? "Pedido";
            return (
              <div key={order.id} className="flex items-center gap-4 p-4 bg-[#0A0A0A] rounded-xl border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#888888]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{firstName}{order.items.length > 1 ? ` +${order.items.length - 1}` : ""}</p>
                  <p className="text-[#888888] text-xs mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("es-CO")} · #{order.id.slice(-6).toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-bold">{fmt(order.total)}</p>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full border mt-1 inline-block", s.color)}>
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LoyaltyTab({ points, tier, history }: { points: number; tier: string; history: typeof pointsHistory }) {
  const tierBenefits = {
    Bronze: ["5% descuento en servicios", "Acumula 1 punto por $1.000"],
    Silver: ["10% descuento en servicios", "Acumula 1.5 puntos por $1.000", "Prioridad en agenda"],
    Gold: ["15% descuento en servicios", "Acumula 2 puntos por $1.000", "1 corte gratis al mes", "Acceso anticipado a promociones"],
    VIP: ["20% descuento en servicios", "Acumula 3 puntos por $1.000", "2 cortes gratis al mes", "Experiencia VIP gratis trimestral", "Barbero dedicado"],
  };

  const benefits = tierBenefits[tier as keyof typeof tierBenefits];

  return (
    <div className="space-y-6">
      {/* Points balance */}
      <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06)_0%,_transparent_70%)]" />
        <div className="relative">
          <Gift className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
          <div className="text-5xl font-bold text-[#D4AF37] mb-1">{points}</div>
          <div className="text-white font-medium mb-1">puntos disponibles</div>
          <div className="text-[#888888] text-sm">≈ {fmt(points * 10)} en descuentos</div>
          <Button variant="gold" size="md" className="mt-5">
            Canjear puntos
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Benefits */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Beneficios {tier}</h2>
          <ul className="space-y-2.5">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm">
                <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[#888888]">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* History */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Historial de puntos</h2>
          <div className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                    h.type === "earn" ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"
                  )}
                >
                  {h.type === "earn" ? "+" : "-"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm">{h.desc}</p>
                  <p className="text-[#888888] text-xs">{h.date}</p>
                </div>
                <span
                  className={cn(
                    "font-bold text-sm",
                    h.type === "earn" ? "text-green-400" : "text-red-400"
                  )}
                >
                  {h.points > 0 ? "+" : ""}{h.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
