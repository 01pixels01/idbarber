"use client";

import { Clock, Check, Sparkles, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BookingData } from "./BookingFlow";

const services = [
  {
    id: 1,
    name: "Corte Clásico",
    description: "Tijera + navaja para un acabado preciso.",
    price: 25000,
    duration: 30,
    icon: "✂",
    popular: false,
  },
  {
    id: 2,
    name: "Fade Premium",
    description: "Degradado skin-to-skin impecable.",
    price: 35000,
    duration: 45,
    icon: "⚡",
    popular: true,
  },
  {
    id: 3,
    name: "Barba Completa",
    description: "Perfilado con navaja recta y vapor.",
    price: 20000,
    duration: 30,
    icon: "◈",
    popular: false,
  },
  {
    id: 4,
    name: "Corte + Barba",
    description: "El combo perfecto para verte top.",
    price: 50000,
    duration: 60,
    icon: "◆",
    popular: true,
  },
  {
    id: 5,
    name: "Diseño de Cejas",
    description: "Depilación y diseño de precisión.",
    price: 15000,
    duration: 20,
    icon: "◇",
    popular: false,
  },
  {
    id: 6,
    name: "Limpieza Facial",
    description: "Tratamiento profundo revitalizante.",
    price: 45000,
    duration: 45,
    icon: "○",
    popular: false,
  },
  {
    id: 7,
    name: "Tratamiento Capilar",
    description: "Hidratación y nutrición profunda.",
    price: 55000,
    duration: 60,
    icon: "◉",
    popular: false,
  },
  {
    id: 8,
    name: "Experiencia VIP",
    description: "Corte + barba + cejas + limpieza + bebida.",
    price: 120000,
    duration: 120,
    icon: "◈",
    popular: false,
    vip: true,
  },
];

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p);
}

interface Props {
  data: BookingData;
  update: (patch: Partial<BookingData>) => void;
  onNext: () => void;
}

export default function StepService({ data, update, onNext }: Props) {
  const select = (s: (typeof services)[0]) => {
    update({
      serviceId: s.id,
      serviceName: s.name,
      servicePrice: s.price,
      serviceDuration: s.duration,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2
          className="text-white leading-none mb-2"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(28px,4vw,42px)", letterSpacing: "0.04em" }}
        >
          ELIGE TU{" "}
          <span className="text-[#D4AF37]">SERVICIO</span>
        </h2>
        <p className="text-[#888888] text-sm">Selecciona la experiencia que deseas vivir hoy.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {services.map((s) => {
          const isSelected = data.serviceId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => select(s)}
              className={cn(
                "group relative text-left p-5 rounded-xl border transition-all duration-250 overflow-hidden",
                isSelected
                  ? "border-[#D4AF37] bg-[#D4AF37]/8 shadow-[0_0_24px_rgba(212,175,55,0.18)]"
                  : "border-white/8 hover:border-[#D4AF37]/40 bg-[#111111] hover:bg-[#151515]",
                (s as { vip?: boolean }).vip && !isSelected && "border-[#D4AF37]/20 bg-[#1A1500]/50"
              )}
            >
              {/* Popular/VIP badge */}
              {s.popular && (
                <span className="absolute top-3 right-3 flex items-center gap-1 bg-[#D4AF37] text-[#0A0A0A] text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                  <Sparkles className="w-2.5 h-2.5" />
                  Popular
                </span>
              )}
              {(s as { vip?: boolean }).vip && (
                <span className="absolute top-3 right-3 flex items-center gap-1 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                  <Crown className="w-2.5 h-2.5" />
                  VIP
                </span>
              )}

              <div className="flex items-start gap-4">
                {/* Icon circle */}
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 transition-all duration-200",
                  isSelected
                    ? "bg-[#D4AF37] text-[#0A0A0A]"
                    : "bg-white/5 text-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]"
                )}>
                  {isSelected
                    ? <Check className="w-5 h-5" />
                    : <span className="font-bold text-sm">{s.icon}</span>
                  }
                </div>

                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-semibold text-sm mb-0.5 transition-colors",
                    isSelected ? "text-[#D4AF37]" : "text-white group-hover:text-[#D4AF37]"
                  )}>
                    {s.name}
                  </div>
                  <div className="text-[#666] text-xs mb-2 leading-relaxed">{s.description}</div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-sm font-bold",
                      isSelected ? "text-[#D4AF37]" : "text-white/80"
                    )}>
                      {fmt(s.price)}
                    </span>
                    <span className="flex items-center gap-1 text-[#555] text-xs">
                      <Clock className="w-3 h-3" />
                      {s.duration} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Selected bottom bar */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F5E070] to-[#D4AF37]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected summary + CTA */}
      {data.serviceId && (
        <div className="flex items-center justify-between bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-xl px-5 py-4 mb-6">
          <div>
            <div className="text-[#D4AF37] text-xs font-medium tracking-wider uppercase mb-0.5">Seleccionado</div>
            <div className="text-white font-semibold">{data.serviceName}</div>
            <div className="text-[#888] text-xs mt-0.5">{fmt(data.servicePrice)} · {data.serviceDuration} min</div>
          </div>
          <button
            onClick={onNext}
            className="group flex items-center gap-2 bg-[#D4AF37] text-[#0A0A0A] px-6 py-3 text-sm font-bold tracking-[0.1em] uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-200"
            style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))" }}
          >
            Continuar
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
        </div>
      )}

      {!data.serviceId && (
        <p className="text-center text-[#555] text-sm">← Selecciona un servicio para continuar</p>
      )}
    </div>
  );
}
