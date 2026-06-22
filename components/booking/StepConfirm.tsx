"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BookingData } from "./BookingFlow";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  data: BookingData;
  update: (patch: Partial<BookingData>) => void;
  onPrev: () => void;
  onComplete: () => void;
}

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p);
}

export default function StepConfirm({ data, update, onPrev, onComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.clientName.trim()) e.clientName = "Ingresa tu nombre";
    if (!data.clientPhone.trim()) e.clientPhone = "Ingresa tu número de WhatsApp";
    if (!data.clientEmail.trim() || !data.clientEmail.includes("@"))
      e.clientEmail = "Ingresa un email válido";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: String(data.serviceId),
          barberId: String(data.barberId),
          date: data.date?.toISOString().split("T")[0],
          startTime: data.time,
          clientName: data.clientName,
          clientPhone: data.clientPhone,
          clientEmail: data.clientEmail,
          notes: data.notes,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrors({ submit: err.error ?? "Error al confirmar. Intenta de nuevo." });
        return;
      }

      onComplete();
    } catch {
      setErrors({ submit: "Error de conexión. Verifica tu internet e intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  const field = (
    id: keyof BookingData,
    label: string,
    placeholder: string,
    type = "text"
  ) => (
    <div>
      <label className="block text-sm font-medium text-white mb-1.5">{label}</label>
      <input
        type={type}
        value={data[id] as string}
        onChange={(e) => {
          update({ [id]: e.target.value });
          setErrors((prev) => ({ ...prev, [id]: "" }));
        }}
        placeholder={placeholder}
        className={cn(
          "w-full bg-[#0A0A0A] border rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none transition-all",
          errors[id]
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 focus:border-[#D4AF37]/60"
        )}
      />
      {errors[id] && <p className="text-red-400 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div>
      <h2 className="font-semibold text-xl mb-1">Confirmar reserva</h2>
      <p className="text-[#888888] text-sm mb-6">Revisa los detalles e ingresa tus datos para completar la reserva.</p>

      {/* Summary */}
      <div className="bg-[#0A0A0A] rounded-xl p-5 mb-6 border border-white/5">
        <h3 className="text-xs text-[#888888] uppercase tracking-wider mb-3">Resumen</h3>
        <div className="space-y-2">
          {[
            ["Servicio", `${data.serviceName} — ${fmt(data.servicePrice)}`],
            ["Barbero", data.barberId === 0 ? "Cualquier barbero disponible" : data.barberName],
            [
              "Fecha",
              data.date
                ? format(data.date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })
                : "",
            ],
            ["Hora", data.time],
            ["Duración", `${data.serviceDuration} minutos`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <span className="text-[#888888]">{label}</span>
              <span className="text-white font-medium capitalize text-right max-w-[60%]">{value}</span>
            </div>
          ))}
          <div className="border-t border-white/5 pt-2 mt-2 flex justify-between">
            <span className="text-white font-semibold">Total</span>
            <span className="text-[#D4AF37] font-bold text-lg">{fmt(data.servicePrice)}</span>
          </div>
        </div>
      </div>

      {/* Client form */}
      <div className="space-y-4 mb-8">
        {field("clientName", "Nombre completo", "Ej: Juan Pérez")}
        {field("clientPhone", "WhatsApp", "+57 300 000 0000", "tel")}
        {field("clientEmail", "Correo electrónico", "juan@correo.com", "email")}
        <div>
          <label className="block text-sm font-medium text-white mb-1.5">
            Notas adicionales{" "}
            <span className="text-[#888888] font-normal">(opcional)</span>
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Ej: Quiero un fade bajo con transición suave..."
            rows={3}
            className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#888888] text-sm outline-none focus:border-[#D4AF37]/60 transition-all resize-none"
          />
        </div>
      </div>

      {errors.submit && (
        <p className="text-red-400 text-sm mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          {errors.submit}
        </p>
      )}

      <p className="text-[#888888] text-xs mb-6">
        Al reservar aceptas nuestra{" "}
        <span className="text-[#D4AF37]">política de cancelación</span>. Recibirás confirmación
        por WhatsApp y email. Cancelación gratuita hasta 24h antes.
      </p>

      <div className="flex justify-between">
        <Button variant="dark" size="md" onClick={onPrev} disabled={loading}>
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </Button>
        <Button variant="gold" size="lg" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Confirmando...
            </>
          ) : (
            "Confirmar reserva"
          )}
        </Button>
      </div>
    </div>
  );
}
