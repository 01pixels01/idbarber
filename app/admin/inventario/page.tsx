"use client";

import { useState } from "react";
import { Search, AlertTriangle, Package, TrendingDown, CheckCircle, Plus, Edit2 } from "lucide-react";

const inventory = [
  { id: 1, name: "Pomada Mate Premium", sku: "PMB-001", category: "Pomadas", stock: 24, minStock: 10, price: 65000, cost: 28000, brand: "IDBARBER Pro" },
  { id: 2, name: "Aceite de Barba Premium", sku: "ABP-002", category: "Aceites", stock: 8, minStock: 10, price: 98000, cost: 42000, brand: "Gentleman Jack" },
  { id: 3, name: "Cera Texturizante", sku: "CTX-003", category: "Ceras", stock: 31, minStock: 8, price: 72000, cost: 31000, brand: "IDBARBER Pro" },
  { id: 4, name: "Shampoo Carbón Activo", sku: "SCA-004", category: "Shampoo", stock: 2, minStock: 6, price: 45000, cost: 18000, brand: "Urban Barber" },
  { id: 5, name: "Bálsamo para Barba", sku: "BBB-005", category: "Aceites", stock: 15, minStock: 8, price: 55000, cost: 22000, brand: "Gentleman Jack" },
  { id: 6, name: "Kit Completo Barbería", sku: "KCB-006", category: "Kits", stock: 0, minStock: 5, price: 220000, cost: 95000, brand: "IDBARBER Pro" },
  { id: 7, name: "Máquina de Corte Pro", sku: "MCP-007", category: "Máquinas", stock: 4, minStock: 3, price: 280000, cost: 120000, brand: "Wahl" },
  { id: 8, name: "Pomada Brillante Gold", sku: "PBG-008", category: "Pomadas", stock: 19, minStock: 10, price: 75000, cost: 32000, brand: "IDBARBER Pro" },
  { id: 9, name: "Aceite Nutritivo Capilar", sku: "ANC-009", category: "Aceites", stock: 6, minStock: 8, price: 82000, cost: 35000, brand: "Gentleman Jack" },
  { id: 10, name: "Recortadora Inalámbrica", sku: "RI-010", category: "Máquinas", stock: 7, minStock: 3, price: 185000, cost: 80000, brand: "Andis" },
];

const categories = ["Todos", "Pomadas", "Aceites", "Ceras", "Shampoo", "Kits", "Máquinas"];

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p);
}

function stockStatus(stock: number, min: number) {
  if (stock === 0) return { label: "Sin stock", color: "text-red-400 bg-red-400/10 border-red-400/20", icon: AlertTriangle };
  if (stock < min) return { label: "Stock bajo", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", icon: TrendingDown };
  return { label: "Disponible", color: "text-green-400 bg-green-400/10 border-green-400/20", icon: CheckCircle };
}

export default function InventarioPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [stocks, setStocks] = useState<Record<number, number>>(
    Object.fromEntries(inventory.map((p) => [p.id, p.stock]))
  );

  const filtered = inventory.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Todos" || p.category === category;
    return matchSearch && matchCat;
  });

  const totalValue = inventory.reduce((s, p) => s + p.price * (stocks[p.id] ?? p.stock), 0);
  const outOfStock = inventory.filter((p) => (stocks[p.id] ?? p.stock) === 0).length;
  const lowStock = inventory.filter((p) => {
    const s = stocks[p.id] ?? p.stock;
    return s > 0 && s < p.minStock;
  }).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Inventario</h1>
          <p className="text-[#888888] text-sm">{inventory.length} productos · Stock valorado en {fmt(totalValue)}</p>
        </div>
        <button className="flex items-center gap-2 bg-[#D4AF37] text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
          <Plus className="w-4 h-4" />
          Agregar producto
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Valor del stock", value: fmt(totalValue), icon: Package, color: "text-[#D4AF37]" },
          { label: "Productos", value: inventory.length, icon: Package, color: "text-blue-400" },
          { label: "Sin stock", value: outOfStock, icon: AlertTriangle, color: "text-red-400" },
          { label: "Stock bajo", value: lowStock, icon: TrendingDown, color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="bg-[#111111] border border-white/5 rounded-xl p-5">
            <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
            <div className="text-white font-bold text-xl mb-0.5">{s.value}</div>
            <div className="text-[#888888] text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                category === cat
                  ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]"
                  : "bg-[#111111] border border-white/10 text-[#888888] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Producto", "SKU", "Categoría", "Stock", "Stock mín.", "Precio", "Costo", "Estado", ""].map((h) => (
                <th key={h} className="text-left text-xs text-[#888888] font-medium px-4 py-3.5">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const currentStock = stocks[p.id] ?? p.stock;
              const status = stockStatus(currentStock, p.minStock);
              const StatusIcon = status.icon;
              const isEditing = editingId === p.id;
              return (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-white text-sm">{p.name}</div>
                    <div className="text-[#888888] text-xs">{p.brand}</div>
                  </td>
                  <td className="px-4 py-3.5 text-[#888888] text-xs font-mono">{p.sku}</td>
                  <td className="px-4 py-3.5 text-[#888888] text-sm">{p.category}</td>
                  <td className="px-4 py-3.5">
                    {isEditing ? (
                      <input
                        type="number"
                        min={0}
                        value={currentStock}
                        onChange={(e) => setStocks((s) => ({ ...s, [p.id]: Number(e.target.value) }))}
                        onBlur={() => setEditingId(null)}
                        autoFocus
                        className="w-16 bg-[#0A0A0A] border border-[#D4AF37]/40 rounded-lg px-2 py-1 text-white text-sm outline-none text-center"
                      />
                    ) : (
                      <span className="text-white font-bold text-sm">{currentStock}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-[#888888] text-sm">{p.minStock}</td>
                  <td className="px-4 py-3.5 text-[#D4AF37] text-sm font-semibold">{fmt(p.price)}</td>
                  <td className="px-4 py-3.5 text-[#888888] text-sm">{fmt(p.cost)}</td>
                  <td className="px-4 py-3.5">
                    <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border w-fit ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => setEditingId(isEditing ? null : p.id)}
                      className="p-1.5 rounded-lg text-[#888888] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
