"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories, getProductsByCategory } from "@/lib/products";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

const sortOptions = [
  { id: "featured", label: "Destacados" },
  { id: "price_asc", label: "Precio: menor a mayor" },
  { id: "price_desc", label: "Precio: mayor a menor" },
  { id: "rating", label: "Mejor valorados" },
  { id: "new", label: "Nuevos" },
];

export default function StoreClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(400000);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = getProductsByCategory(activeCategory);

    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
    }

    result = result.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "price_asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        result = [...result].filter((p) => p.new).concat(result.filter((p) => !p.new));
        break;
    }

    return result;
  }, [activeCategory, search, sort, maxPrice]);

  function fmt(p: number) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(p);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
          <input
            type="text"
            placeholder="Buscar productos, marcas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]/40 cursor-pointer"
        >
          {sortOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-all",
            showFilters
              ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]"
              : "bg-[#111111] border-white/10 text-[#888888] hover:text-white"
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-5 mb-6">
          <div>
            <label className="text-sm text-white font-medium mb-3 block">
              Precio máximo:{" "}
              <span className="text-[#D4AF37]">{fmt(maxPrice)}</span>
            </label>
            <input
              type="range"
              min={15000}
              max={400000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#D4AF37]"
            />
            <div className="flex justify-between text-xs text-[#888888] mt-1">
              <span>{fmt(15000)}</span>
              <span>{fmt(400000)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0",
              activeCategory === cat.id
                ? "bg-[#D4AF37] text-[#0A0A0A]"
                : "bg-[#111111] border border-white/10 text-[#888888] hover:text-white hover:border-white/20"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-[#888888] text-sm mb-5">
        {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
        {search && (
          <> para <span className="text-white">"{search}"</span></>
        )}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#888888]">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-white font-medium mb-1">Sin resultados</p>
          <p className="text-sm">Intenta con otros términos o categorías</p>
        </div>
      )}
    </div>
  );
}
