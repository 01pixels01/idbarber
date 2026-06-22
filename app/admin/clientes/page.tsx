"use client";

import { useState } from "react";
import { Search, Star, Phone, Mail, Calendar, TrendingUp } from "lucide-react";

const clients = [
  { id: 1, name: "Juan Pérez", phone: "+57 300 111 2222", email: "juan@mail.com", visits: 24, spent: 960000, points: 960, lastVisit: "2026-06-15", tier: "VIP" },
  { id: 2, name: "Andrés López", phone: "+57 311 222 3333", email: "andres@mail.com", visits: 18, spent: 720000, points: 720, lastVisit: "2026-06-14", tier: "Gold" },
  { id: 3, name: "Camilo Ruiz", phone: "+57 322 333 4444", email: "camilo@mail.com", visits: 12, spent: 480000, points: 480, lastVisit: "2026-06-10", tier: "Silver" },
  { id: 4, name: "Diego Castro", phone: "+57 333 444 5555", email: "diego@mail.com", visits: 6, spent: 240000, points: 240, lastVisit: "2026-06-08", tier: "Bronze" },
  { id: 5, name: "Mateo Vargas", phone: "+57 344 555 6666", email: "mateo@mail.com", visits: 31, spent: 1240000, points: 1240, lastVisit: "2026-06-17", tier: "VIP" },
  { id: 6, name: "Sebastián Gil", phone: "+57 355 666 7777", email: "sebastian@mail.com", visits: 9, spent: 360000, points: 360, lastVisit: "2026-06-12", tier: "Silver" },
  { id: 7, name: "Felipe Mora", phone: "+57 366 777 8888", email: "felipe@mail.com", visits: 2, spent: 80000, points: 80, lastVisit: "2026-06-01", tier: "Bronze" },
  { id: 8, name: "Santiago Ríos", phone: "+57 377 888 9999", email: "santiago@mail.com", visits: 45, spent: 1800000, points: 1800, lastVisit: "2026-06-18", tier: "VIP" },
];

const tierColors: Record<string, string> = {
  VIP: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20",
  Gold: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Silver: "text-gray-300 bg-white/5 border-white/10",
  Bronze: "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p);
}

export default function ClientesPage() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

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
          { label: "Visitas este mes", value: "124", icon: "📅" },
          { label: "Ticket promedio", value: fmt(clients.reduce((a, c) => a + c.spent / c.visits, 0) / clients.length), icon: "💰" },
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

      {/* Table */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Cliente", "Contacto", "Visitas", "Total gastado", "Puntos", "Última visita", "Tier"].map((h) => (
                <th key={h} className="text-left text-xs text-[#888888] font-medium px-5 py-3.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                      {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="font-medium text-white text-sm">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="text-[#888888] text-xs space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3" /> {c.phone}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3" /> {c.email}
                    </div>
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
                <td className="px-5 py-4 text-[#888888] text-sm">{c.lastVisit}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs border ${tierColors[c.tier]}`}>
                    {c.tier}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
