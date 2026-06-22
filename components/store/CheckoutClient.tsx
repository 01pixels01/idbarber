"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";
import { CreditCard, Smartphone, Building2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(p);
}

const paymentMethods = [
  { id: "card", label: "Tarjeta débito/crédito", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
  { id: "nequi", label: "Nequi / Daviplata", icon: Smartphone, desc: "Pago con tu celular" },
  { id: "pse", label: "PSE / Transferencia", icon: Building2, desc: "Bancos colombianos" },
];

export default function CheckoutClient() {
  const { state, total, count, dispatch } = useCart();
  const [payMethod, setPayMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", department: "",
    cardNumber: "", cardExpiry: "", cardCVV: "", cardName: "",
  });

  const shipping = total >= 100000 ? 0 : 12000;
  const orderTotal = total + shipping;

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const [payError, setPayError] = useState<string | null>(null);

  const handlePay = async () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      setPayError("Completa nombre, correo, WhatsApp y dirección.");
      return;
    }
    setPayError(null);
    setLoading(true);

    try {
      // 1. Crear la orden en nuestra DB
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: form.name,
          clientEmail: form.email,
          clientPhone: form.phone,
          address: `${form.address}, ${form.city}, ${form.department}`.trim(),
          items: state.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
        }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err.error ?? "Error al registrar el pedido");
      }

      const { order } = await orderRes.json();

      // 2. Crear preferencia de MercadoPago
      const mpRes = await fetch("/api/payments/mp-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          clientName: form.name,
          clientEmail: form.email,
          clientPhone: form.phone,
          items: state.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
        }),
      });

      if (!mpRes.ok) throw new Error("Error al iniciar el pago");

      const { initPoint, sandboxInitPoint } = await mpRes.json();

      // initPoint para credenciales de producción; sandbox solo existe con credenciales TEST
      const redirect = initPoint ?? sandboxInitPoint;
      if (!redirect) throw new Error("No se pudo generar el link de pago");
      window.location.href = redirect;
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  };


  if (state.items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-[#888888] mb-4">No tienes productos en el carrito</p>
        <Link href="/tienda"><Button variant="gold">Ir a la tienda</Button></Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Personal info */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Datos personales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { k: "name", label: "Nombre completo", placeholder: "Juan Pérez", colSpan: true },
              { k: "email", label: "Correo electrónico", placeholder: "juan@correo.com" },
              { k: "phone", label: "WhatsApp", placeholder: "+57 300 000 0000" },
            ].map(({ k, label, placeholder, colSpan }) => (
              <div key={k} className={colSpan ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-medium text-white mb-1.5">{label}</label>
                <input
                  value={form[k as keyof typeof form]}
                  onChange={(e) => set(k, e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Dirección de envío</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { k: "address", label: "Dirección", placeholder: "Calle 93 #15-20 Apto 401", colSpan: true },
              { k: "city", label: "Ciudad", placeholder: "Bogotá" },
              { k: "department", label: "Departamento", placeholder: "Cundinamarca" },
            ].map(({ k, label, placeholder, colSpan }) => (
              <div key={k} className={colSpan ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-medium text-white mb-1.5">{label}</label>
                <input
                  value={form[k as keyof typeof form]}
                  onChange={(e) => set(k, e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-5">Método de pago</h2>

          <div className="space-y-3 mb-6">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setPayMethod(m.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left",
                  payMethod === m.id
                    ? "border-[#D4AF37] bg-[#D4AF37]/5"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    payMethod === m.id ? "bg-[#D4AF37]/20" : "bg-white/5"
                  )}
                >
                  <m.icon
                    className={cn("w-5 h-5", payMethod === m.id ? "text-[#D4AF37]" : "text-[#888888]")}
                  />
                </div>
                <div className="flex-1">
                  <div className={cn("font-medium text-sm", payMethod === m.id ? "text-white" : "text-[#888888]")}>
                    {m.label}
                  </div>
                  <div className="text-[#888888] text-xs">{m.desc}</div>
                </div>
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all",
                    payMethod === m.id
                      ? "border-[#D4AF37] bg-[#D4AF37]"
                      : "border-white/20"
                  )}
                />
              </button>
            ))}
          </div>

          {payMethod === "card" && (
            <div className="space-y-4 p-4 bg-[#0A0A0A] rounded-xl border border-white/5">
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Número de tarjeta</label>
                <input
                  value={form.cardNumber}
                  onChange={(e) => set("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">Vencimiento</label>
                  <input
                    value={form.cardExpiry}
                    onChange={(e) => set("cardExpiry", e.target.value)}
                    placeholder="MM/AA"
                    maxLength={5}
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1.5">CVV</label>
                  <input
                    value={form.cardCVV}
                    onChange={(e) => set("cardCVV", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    type="password"
                    className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">Nombre en tarjeta</label>
                <input
                  value={form.cardName}
                  onChange={(e) => set("cardName", e.target.value)}
                  placeholder="JUAN PEREZ"
                  className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
                />
              </div>
            </div>
          )}

          {payMethod === "nequi" && (
            <div className="p-4 bg-[#0A0A0A] rounded-xl border border-white/5">
              <label className="block text-sm font-medium text-white mb-1.5">Número Nequi / Daviplata</label>
              <input
                placeholder="+57 300 000 0000"
                className="w-full bg-[#111111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/40"
              />
              <p className="text-[#888888] text-xs mt-2">Recibirás una notificación en tu app para aprobar el pago.</p>
            </div>
          )}

          {payMethod === "pse" && (
            <div className="p-4 bg-[#0A0A0A] rounded-xl border border-white/5 text-[#888888] text-sm">
              Serás redirigido al portal de PSE para completar la transferencia bancaria de forma segura.
            </div>
          )}
        </div>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-1">
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 sticky top-24">
          <h2 className="font-semibold text-white mb-5">Resumen del pedido</h2>

          <div className="space-y-3 mb-5">
            {state.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-lg shrink-0">
                  {item.imageUrl}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-[#888888] text-xs">x{item.quantity}</p>
                </div>
                <p className="text-white text-sm font-medium shrink-0">
                  {fmt(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[#888888]">
              <span>Subtotal</span>
              <span className="text-white">{fmt(total)}</span>
            </div>
            <div className="flex justify-between text-[#888888]">
              <span>Envío</span>
              <span className={shipping === 0 ? "text-green-400" : "text-white"}>
                {shipping === 0 ? "Gratis" : fmt(shipping)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-white/5">
              <span className="text-white">Total</span>
              <span className="text-[#D4AF37]">{fmt(orderTotal)}</span>
            </div>
          </div>

          {payError && (
            <p className="text-red-400 text-xs mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              {payError}
            </p>
          )}

          <Button
            variant="gold"
            size="lg"
            className="w-full mt-6"
            onClick={handlePay}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Procesando pago...
              </>
            ) : (
              `Pagar ${fmt(orderTotal)}`
            )}
          </Button>

          <p className="text-[#888888] text-xs text-center mt-3 flex items-center justify-center gap-1">
            🔒 Pago 100% seguro y encriptado
          </p>
        </div>
      </div>
    </div>
  );
}
