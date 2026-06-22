"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Star, ShoppingCart, Shield, Truck, RotateCcw, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { type Product, products } from "@/lib/products";
import Button from "@/components/ui/Button";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(p);
}

export default function ProductDetail({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({
        type: "ADD",
        item: {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          brand: product.brand,
        },
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#888888] mb-8">
        <Link href="/tienda" className="hover:text-white flex items-center gap-1 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Tienda
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </div>

      {/* Product main */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <div className="space-y-3">
          <div className="aspect-square bg-[#111111] border border-white/5 rounded-2xl flex items-center justify-center text-[120px] relative">
            {product.imageUrl}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{discount}%
              </div>
            )}
            {product.new && (
              <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#0A0A0A] text-sm font-bold px-3 py-1 rounded-full">
                NUEVO
              </div>
            )}
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, text: "Envío gratis +$100k" },
              { icon: Shield, text: "Compra segura" },
              { icon: RotateCcw, text: "30 días devolución" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="bg-[#111111] border border-white/5 rounded-xl p-3 text-center"
              >
                <Icon className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
                <p className="text-[#888888] text-xs">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[#888888] text-sm mb-2">{product.brand}</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(product.rating)
                      ? "text-[#D4AF37] fill-[#D4AF37]"
                      : "text-white/20"
                  )}
                />
              ))}
            </div>
            <span className="text-white font-medium">{product.rating}</span>
            <span className="text-[#888888] text-sm">({product.reviews} reseñas)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-[#D4AF37]">{fmt(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[#888888] text-lg line-through">
                {fmt(product.originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500/10 text-red-400 text-sm font-semibold px-2 py-0.5 rounded-full">
                Ahorras {fmt(product.originalPrice! - product.price)}
              </span>
            )}
          </div>

          <p className="text-[#888888] leading-relaxed mb-6">{product.longDescription}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/10 text-[#888888] text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                product.stock > 10
                  ? "bg-green-400"
                  : product.stock > 0
                  ? "bg-orange-400"
                  : "bg-red-400"
              )}
            />
            <span
              className={cn(
                product.stock > 10
                  ? "text-green-400"
                  : product.stock > 0
                  ? "text-orange-400"
                  : "text-red-400"
              )}
            >
              {product.stock > 10
                ? "En stock"
                : product.stock > 0
                ? `Solo ${product.stock} disponibles`
                : "Sin stock"}
            </span>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-[#888888] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-white font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="px-4 py-3 text-[#888888] hover:text-white hover:bg-white/5 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="flex-1"
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="w-4 h-4" />
              {added ? "¡Agregado! ✓" : "Agregar al carrito"}
            </Button>
          </div>

          <p className="text-[#888888] text-sm mt-4">
            Total:{" "}
            <span className="text-[#D4AF37] font-semibold">{fmt(product.price * qty)}</span>
          </p>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-bold text-white mb-6">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
