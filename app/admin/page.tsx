import {
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Inbox,
} from "lucide-react";
import { getDashboardData } from "@/lib/admin";

export const dynamic = "force-dynamic";

const statusConfig: Record<string, { label: string; color: string }> = {
  completed: { label: "Completada", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  confirmed: { label: "Confirmada", color: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20" },
  in_progress: { label: "En proceso", color: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20" },
  pending: { label: "Pendiente", color: "text-[#888888] bg-white/5 border-white/10" },
  cancelled: { label: "Cancelada", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  no_show: { label: "No asistió", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export default async function AdminDashboard() {
  const data = await getDashboardData();
  const now = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const stats = [
    { label: "Ingresos del mes", value: data.revenueMonth, icon: DollarSign, sub: "citas confirmadas" },
    { label: "Citas hoy", value: String(data.appointmentsToday), icon: Calendar, sub: "agendadas" },
    { label: "Clientes nuevos", value: String(data.newClientsMonth), icon: Users, sub: "este mes" },
    { label: "Ticket promedio", value: data.avgTicket, icon: TrendingUp, sub: "por servicio" },
  ];

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
          <div key={s.label} className="bg-[#111111] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#888888] text-xs">{s.label}</span>
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <s.icon className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-xs text-[#888888]">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Citas de hoy */}
        <div className="lg:col-span-2 bg-[#111111] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white">Citas de hoy</h2>
            <span className="text-[#888888] text-xs">{data.todayList.length} citas</span>
          </div>

          {data.todayList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <Inbox className="w-10 h-10 text-[#333] mb-3" />
              <p className="text-white text-sm font-medium mb-1">Sin citas para hoy</p>
              <p className="text-[#666] text-xs">Las reservas del día aparecerán aquí automáticamente.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.todayList.map((apt) => {
                const status = statusConfig[apt.status] ?? statusConfig.pending;
                return (
                  <div key={apt.id} className="flex items-center gap-4 p-3 rounded-xl bg-[#0A0A0A] border border-white/5">
                    <div className="text-center min-w-[48px]">
                      <div className="text-white font-bold text-sm">{apt.time}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm">{apt.client}</div>
                      <div className="text-[#888888] text-xs">{apt.service} · {apt.barber}</div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs border ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top servicios */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Top servicios</h2>
          {data.topServices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center">
              <TrendingUp className="w-10 h-10 text-[#333] mb-3" />
              <p className="text-white text-sm font-medium mb-1">Aún sin datos</p>
              <p className="text-[#666] text-xs">El ranking se genera con las primeras citas.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {data.topServices.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white">{s.name}</span>
                    <span className="text-[#888888]">{s.count}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37] rounded-full transition-all duration-700" style={{ width: `${s.pct}%` }} />
                  </div>
                  <div className="text-[#888888] text-xs mt-1">{s.revenue}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
