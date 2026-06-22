"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { type Product } from "@/lib/products";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(p);
}

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/tienda/${product.slug}`} className="group block">
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_0_24px_rgba(212,175,55,0.08)] transition-all duration-300">
        {/* Image area */}
        <div className="relative h-52 bg-[#1A1A1A] overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.new && (
              <span className="bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                NUEVO
              </span>
            )}
            {discount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-[#888888] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-4 h-4" />
          </button>

          {/* Stock warning */}
          {product.stock <= 10 && (
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-orange-400 text-[10px] px-2 py-0.5 rounded-full">
              Solo {product.stock} en stock
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-[#888888] text-xs mb-1">{product.brand}</div>
          <h3 className="font-medium text-white text-sm mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[#888888] text-xs mb-3 line-clamp-2">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3 h-3",
                    i < Math.floor(product.rating)
                      ? "text-[#D4AF37] fill-[#D4AF37]"
                      : "text-white/20"
                  )}
                />
              ))}
            </div>
            <span className="text-[#888888] text-xs">({product.reviews})</span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#D4AF37] font-bold text-base">{fmt(product.price)}</span>
              {product.originalPrice && (
                <span className="text-[#888888] text-xs line-through ml-2">
                  {fmt(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={addToCart}
              className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
