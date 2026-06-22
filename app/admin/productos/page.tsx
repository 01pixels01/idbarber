"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, Star, Tag, Eye, EyeOff } from "lucide-react";

const initialProducts = [
  { id: 1, name: "Pomada Mate Premium", brand: "IDBARBER Pro", category: "Pomadas", price: 65000, stock: 24, rating: 4.8, reviews: 127, active: true, new: false, featured: true, emoji: "🏺" },
  { id: 2, name: "Aceite de Barba Premium", brand: "Gentleman Jack", category: "Aceites", price: 98000, stock: 8, rating: 4.9, reviews: 89, active: true, new: true, featured: true, emoji: "💧" },
  { id: 3, name: "Cera Texturizante", brand: "IDBARBER Pro", category: "Ceras", price: 72000, stock: 31, rating: 4.7, reviews: 64, active: true, new: false, featured: false, emoji: "✨" },
  { id: 4, name: "Shampoo Carbón Activo", brand: "Urban Barber", category: "Shampoo", price: 45000, stock: 2, rating: 4.6, reviews: 43, active: true, new: false, featured: false, emoji: "🖤" },
  { id: 5, name: "Bálsamo para Barba", brand: "Gentleman Jack", category: "Aceites", price: 55000, stock: 15, rating: 4.8, reviews: 91, active: true, new: false, featured: false, emoji: "🌿" },
  { id: 6, name: "Kit Completo Barbería", brand: "IDBARBER Pro", category: "Kits", price: 220000, stock: 0, rating: 4.9, reviews: 52, active: false, new: false, featured: true, emoji: "🎁" },
  { id: 7, name: "Máquina de Corte Pro", brand: "Wahl", category: "Máquinas", price: 280000, stock: 4, rating: 4.7, reviews: 38, active: true, new: true, featured: false, emoji: "⚡" },
  { id: 8, name: "Pomada Brillante Gold", brand: "IDBARBER Pro", category: "Pomadas", price: 75000, stock: 19, rating: 4.8, reviews: 76, active: true, new: true, featured: true, emoji: "✨" },
];

const categories = ["Todos", "Pomadas", "Aceites", "Ceras", "Shampoo", "Kits", "Máquinas"];

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p);
}

export default function ProductosPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "Todos" || p.category === category;
    return matchSearch && matchCat;
  });

  const toggleActive = (id: number) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p)));

  const toggleFeatured = (id: number) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Productos</h1>
          <p className="text-[#888888] text-sm">
            {products.filter((p) => p.active).length} activos · {products.filter((p) => !p.active).length} inactivos
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#D4AF37] text-black text-sm font-bold px-4 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
          <Plus className="w-4 h-4" />
          Nuevo producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total productos", value: products.length },
          { label: "Destacados", value: products.filter((p) => p.featured).length },
          { label: "Nuevos", value: products.filter((p) => p.new).length },
          { label: "Sin stock", value: products.filter((p) => p.stock === 0).length },
        ].map((s) => (
          <div key={s.label} className="bg-[#111111] border border-white/5 rounded-xl p-5 text-center">
            <div className="text-white font-bold text-3xl mb-1">{s.value}</div>
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
            placeholder="Buscar productos o marcas..."
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

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className={`bg-[#111111] border rounded-2xl overflow-hidden transition-all ${
              p.active ? "border-white/5 hover:border-white/10" : "border-white/5 opacity-50"
            }`}
          >
            {/* Image placeholder */}
            <div className="h-40 bg-[#0A0A0A] flex items-center justify-center text-5xl relative">
              {p.emoji}
              <div className="absolute top-3 left-3 flex gap-1.5">
                {p.new && (
                  <span className="text-[10px] bg-[#D4AF37] text-black font-bold px-2 py-0.5 rounded-full">NUEVO</span>
                )}
                {p.featured && (
                  <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" /> Destacado
                  </span>
                )}
              </div>
              {!p.active && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-[#888888] text-xs font-medium">Inactivo</span>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="mb-3">
                <p className="text-white font-semibold text-sm leading-tight">{p.name}</p>
                <p className="text-[#888888] text-xs mt-0.5">{p.brand}</p>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-[#D4AF37] font-bold text-lg">{fmt(p.price)}</span>
                <div className="flex items-center gap-1 text-xs text-[#888888]">
                  <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
                  {p.rating} ({p.reviews})
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#888888] mb-4">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {p.category}
                </span>
                <span className={p.stock === 0 ? "text-red-400" : p.stock < 10 ? "text-yellow-400" : "text-green-400"}>
                  {p.stock === 0 ? "Sin stock" : `${p.stock} en stock`}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(p.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                    p.active
                      ? "border-red-500/20 text-red-400 hover:bg-red-400/5"
                      : "border-green-500/20 text-green-400 hover:bg-green-400/5"
                  }`}
                >
                  {p.active ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {p.active ? "Desactivar" : "Activar"}
                </button>
                <button
                  onClick={() => toggleFeatured(p.id)}
                  className={`p-2 rounded-xl border transition-all ${
                    p.featured
                      ? "border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/5"
                      : "border-white/10 text-[#888888] hover:text-[#D4AF37]"
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${p.featured ? "fill-[#D4AF37]" : ""}`} />
                </button>
                <button className="p-2 rounded-xl border border-white/10 text-[#888888] hover:text-white hover:border-white/20 transition-all">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button className="p-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-400/5 transition-all">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
