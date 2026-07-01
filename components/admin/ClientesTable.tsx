"use client";

import { useState } from "react";
import { Search, Star, Phone, Mail, Users } from "lucide-react";
import type { AdminClient } from "@/lib/admin";

const tierColors: Record<string, string> = {
  VIP: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20",
  Gold: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Silver: "text-gray-300 bg-white/5 border-white/10",
  Bronze: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p);
}

export default function ClientesTable({ clients }: { clients: AdminClient[] }) {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  const avgTicket =
    clients.length && clients.some((c) => c.visits > 0)
      ? clients.reduce((a, c) => a + (c.visits ? c.spent / c.visits : 0), 0) / clients.filter((c) => c.visits > 0).length
      : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Clientes</h1>
          <p className="text-[#888888] text-sm">{clients.length} clientes registrados</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total clientes", value: clients.length, icon: "👥" },
          { label: "Clientes VIP", value: clients.filter((c) => c.tier === "VIP").length, icon: "👑" },
          { label: "Con visitas", value: clients.filter((c) => c.visits > 0).length, icon: "📅" },
          { label: "Ticket promedio", value: fmt(Math.round(avgTicket)), icon: "💰" },
        ].map((s) => (
          <div key={s.label} className="bg-[#111111] border border-white/5 rounded-xl p-4">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-white font-bold text-xl">{s.value}</div>
            <div className="text-[#888888] text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
        <input
          type="text"
          placeholder="Buscar por nombre, email o teléfono..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
        />
      </div>

      {clients.length === 0 ? (
        <div className="bg-[#111111] border border-white/5 rounded-2xl flex flex-col items-center justify-center py-20 text-center">
          <Users className="w-12 h-12 text-[#333] mb-4" />
          <p className="text-white font-medium mb-1">Aún no hay clientes</p>
          <p className="text-[#666] text-sm">Los clientes se registran automáticamente al reservar su primera cita.</p>
        </div>
      ) : (
        <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-white/5">
                {["Cliente", "Contacto", "Visitas", "Total gastado", "Puntos", "Última visita", "Tier"].map((h) => (
                  <th key={h} className="text-left text-xs text-[#888888] font-medium px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                        {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-white text-sm">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-[#888888] text-xs space-y-0.5">
                      <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {c.phone}</div>
                      <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {c.email}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white text-sm font-medium">{c.visits}</td>
                  <td className="px-5 py-4 text-[#D4AF37] text-sm font-semibold">{fmt(c.spent)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                      <span className="text-white font-medium">{c.points}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#888888] text-sm">{c.lastVisit ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs border ${tierColors[c.tier]}`}>{c.tier}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
