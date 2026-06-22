import {
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const stats = [
  {
    label: "Ingresos del mes",
    value: "$4,820,000",
    change: "+18%",
    positive: true,
    icon: DollarSign,
    sub: "vs mes anterior",
  },
  {
    label: "Citas hoy",
    value: "24",
    change: "+3",
    positive: true,
    icon: Calendar,
    sub: "vs ayer",
  },
  {
    label: "Clientes nuevos",
    value: "47",
    change: "+12%",
    positive: true,
    icon: Users,
    sub: "este mes",
  },
  {
    label: "Ticket promedio",
    value: "$38,500",
    change: "+5%",
    positive: true,
    icon: TrendingUp,
    sub: "por servicio",
  },
];

const todayAppointments = [
  { id: 1, client: "Juan Pérez", service: "Fade Premium", barber: "Carlos M.", time: "09:00", status: "completed" },
  { id: 2, client: "Andrés López", service: "Corte + Barba", barber: "Miguel T.", time: "09:45", status: "in_progress" },
  { id: 3, client: "Camilo Ruiz", service: "Corte Clásico", barber: "Andrés G.", time: "10:30", status: "pending" },
  { id: 4, client: "Diego Castro", service: "Barba Completa", barber: "David R.", time: "11:00", status: "pending" },
  { id: 5, client: "Mateo Vargas", service: "Experiencia VIP", barber: "Carlos M.", time: "11:30", status: "pending" },
  { id: 6, client: "Sebastián Gil", service: "Fade Premium", barber: "Miguel T.", time: "14:00", status: "pending" },
];

const statusConfig = {
  completed: { label: "Completada", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  in_progress: { label: "En proceso", color: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20" },
  pending: { label: "Pendiente", color: "text-[#888888] bg-white/5 border-white/10" },
};

const topServices = [
  { name: "Fade Premium", count: 142, revenue: "$4,970,000", pct: 85 },
  { name: "Corte + Barba", count: 98, revenue: "$4,900,000", pct: 65 },
  { name: "Corte Clásico", count: 87, revenue: "$2,175,000", pct: 55 },
  { name: "Barba Completa", count: 64, revenue: "$1,280,000", pct: 40 },
  { name: "Experiencia VIP", count: 21, revenue: "$2,520,000", pct: 25 },
];

export default function AdminDashboard() {
  const now = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
          <p className="text-[#888888] text-sm capitalize">{now}</p>
        </div>
        <div className="flex items-center gap-2 bg-green-400/10 border border-green-400/20 text-green-400 text-xs px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Sistema activo
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-[#111111] border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#888888] text-xs">{s.label}</span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className={s.positive ? "text-green-400" : "text-red-400"}>
                {s.change}
              </span>
              <span className="text-[#888888]">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's appointments */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Citas de hoy</h2>
            <span className="text-[#888888] text-xs">{todayAppointments.length} citas</span>
          </div>

          <div className="space-y-3">
            {todayAppointments.map((apt) => {
              const status = statusConfig[apt.status as keyof typeof statusConfig];
              return (
                <div
                  key={apt.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[#0A0A0A] border border-white/5"
                >
                  <div className="text-center min-w-[48px]">
                    <div className="text-white font-bold text-sm">{apt.time}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white text-sm">{apt.client}</div>
                    <div className="text-[#888888] text-xs">
                      {apt.service} · {apt.barber}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs border ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top services */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Top servicios</h2>
          <div className="space-y-4">
            {topServices.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white">{s.name}</span>
                  <span className="text-[#888888]">{s.count}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4AF37] rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
                <div className="text-[#888888] text-xs mt-1">{s.revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
