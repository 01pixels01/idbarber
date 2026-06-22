"use client";

import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BookingData } from "./BookingFlow";

const barbers = [
  { id: 0, name: "Sin preferencia", role: "Cualquier barbero disponible", avatar: "🎲", rating: null, specialties: [] },
  { id: 1, name: "Carlos Mendoza", role: "Master Barber · 12 años", avatar: "CM", rating: 4.9, specialties: ["Fade", "Clásico"] },
  { id: 2, name: "Andrés García", role: "Senior Barber · 8 años", avatar: "AG", rating: 4.8, specialties: ["Barba", "Cejas"] },
  { id: 3, name: "Miguel Torres", role: "Style Artist · 6 años", avatar: "MT", rating: 4.9, specialties: ["Fade", "Diseños"] },
  { id: 4, name: "David Ruiz", role: "Barber Pro · 10 años", avatar: "DR", rating: 4.7, specialties: ["Clásico", "VIP"] },
];

interface Props {
  data: BookingData;
  update: (patch: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepBarber({ data, update, onNext, onPrev }: Props) {
  const select = (b: typeof barbers[0]) => {
    update({ barberId: b.id, barberName: b.id === 0 ? "Sin preferencia" : b.name });
  };

  return (
    <div>
      <h2 className="font-semibold text-xl mb-1">Elige tu barbero</h2>
      <p className="text-[#888888] text-sm mb-6">
        ¿Tienes un barbero favorito? Selecciónalo o elige cualquiera disponible.
      </p>

      <div className="space-y-3 mb-8">
        {barbers.map((b) => (
          <button
            key={b.id}
            onClick={() => select(b)}
            className={cn(
              "w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4",
              data.barberId === b.id
                ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_16px_rgba(212,175,55,0.12)]"
                : "border-white/10 hover:border-white/20 bg-[#0A0A0A]"
            )}
          >
            <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-lg font-bold border border-white/10 shrink-0">
              {b.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white text-sm">{b.name}</div>
              <div className="text-[#888888] text-xs mt-0.5">{b.role}</div>
              {b.specialties.length > 0 && (
                <div className="flex gap-1.5 mt-1.5">
                  {b.specialties.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-white/5 text-[#888888] text-[10px] rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {b.rating && (
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-white text-sm font-medium">{b.rating}</span>
              </div>
            )}
            {data.barberId === b.id && (
              <div className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-[#0A0A0A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="dark" size="md" onClick={onPrev}>
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </Button>
        <Button variant="gold" size="md" onClick={onNext} disabled={data.barberId === null}>
          Continuar
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
