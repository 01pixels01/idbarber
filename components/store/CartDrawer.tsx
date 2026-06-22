"use client";

import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(p);
}

export default function CartDrawer() {
  const { state, dispatch, total, count } = useCart();

  if (!state.open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={() => dispatch({ type: "SET_OPEN", open: false })}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-white/5 z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-semibold text-white">
              Carrito{" "}
              {count > 0 && (
                <span className="ml-1 text-xs bg-[#D4AF37] text-[#0A0A0A] font-bold px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={() => dispatch({ type: "SET_OPEN", open: false })}
            className="p-2 rounded-lg text-[#888888] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#888888]" />
              </div>
              <div>
                <p className="text-white font-medium mb-1">Tu carrito está vacío</p>
                <p className="text-[#888888] text-sm">Agrega productos de nuestra tienda</p>
              </div>
              <Link href="/tienda" onClick={() => dispatch({ type: "SET_OPEN", open: false })}>
                <Button variant="gold" size="sm">
                  Ir a la tienda
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#111111] rounded-xl border border-white/5"
                >
                  {/* Product image placeholder */}
                  <div className="w-16 h-16 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0 text-2xl">
                    {item.imageUrl.startsWith("http") ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      item.imageUrl
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">{item.name}</p>
                    {item.brand && (
                      <p className="text-[#888888] text-xs mt-0.5">{item.brand}</p>
                    )}
                    <p className="text-[#D4AF37] font-semibold text-sm mt-1">
                      {fmt(item.price)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch({ type: "DECREMENT", id: item.id })}
                        className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/20 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch({ type: "INCREMENT", id: item.id })}
                        className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/20 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                      className="p-1.5 rounded-lg text-[#888888] hover:text-red-400 hover:bg-red-400/5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-white text-sm font-bold">
                      {fmt(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/5 space-y-4">
            {/* Coupon */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Código de descuento"
                className="flex-1 bg-[#111111] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#888888] outline-none focus:border-[#D4AF37]/40"
              />
              <Button variant="dark" size="sm">
                Aplicar
              </Button>
            </div>

            {/* Summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#888888]">
                <span>Subtotal ({count} items)</span>
                <span className="text-white">{fmt(total)}</span>
              </div>
              <div className="flex justify-between text-[#888888]">
                <span>Envío</span>
                <span className="text-green-400">
                  {total >= 100000 ? "Gratis" : fmt(12000)}
                </span>
              </div>
              {total < 100000 && (
                <p className="text-xs text-[#888888]">
                  Agrega{" "}
                  <span className="text-[#D4AF37]">{fmt(100000 - total)}</span>{" "}
                  más para envío gratis
                </p>
              )}
              <div className="flex justify-between text-base font-bold border-t border-white/5 pt-2">
                <span className="text-white">Total</span>
                <span className="text-[#D4AF37]">
                  {fmt(total >= 100000 ? total : total + 12000)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={() => dispatch({ type: "SET_OPEN", open: false })}
              className="block"
            >
              <Button variant="gold" size="lg" className="w-full">
                Ir al checkout
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
