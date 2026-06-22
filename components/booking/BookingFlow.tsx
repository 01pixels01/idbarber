"use client";

import { useState } from "react";
import { Check, Scissors, Calendar, User, ClipboardCheck } from "lucide-react";
import StepService from "./StepService";
import StepBarber from "./StepBarber";
import StepDateTime from "./StepDateTime";
import StepConfirm from "./StepConfirm";
import { cn } from "@/lib/utils";

export interface BookingData {
  serviceId: number | null;
  serviceName: string;
  servicePrice: number;
  serviceDuration: number;
  barberId: number | null;
  barberName: string;
  date: Date | null;
  time: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes: string;
}

const STEPS = [
  { id: 1, label: "Servicio", icon: Scissors },
  { id: 2, label: "Barbero", icon: User },
  { id: 3, label: "Fecha", icon: Calendar },
  { id: 4, label: "Confirmar", icon: ClipboardCheck },
];

const initialData: BookingData = {
  serviceId: null,
  serviceName: "",
  servicePrice: 0,
  serviceDuration: 0,
  barberId: null,
  barberName: "",
  date: null,
  time: "",
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  notes: "",
};

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>(initialData);
  const [completed, setCompleted] = useState(false);

  const update = (patch: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...patch }));

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  if (completed) return <BookingSuccess data={data} />;

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-10">
        {/* Progress bar */}
        <div className="relative h-[2px] bg-white/5 rounded-full mb-8 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#D4AF37] to-[#F5E070] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Glow on progress head */}
          {progress > 0 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-700"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          )}
        </div>

        {/* Steps row */}
        <div className="flex items-start justify-between">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const done = step > s.id;
            const active = step === s.id;
            return (
              <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    done
                      ? "bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.5)]"
                      : active
                      ? "bg-[#111111] border-2 border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.3)]"
                      : "bg-[#111111] border border-white/10"
                  )}
                >
                  {done ? (
                    <Check className="w-4 h-4 text-[#0A0A0A]" />
                  ) : (
                    <Icon className={cn("w-4 h-4", active ? "text-[#D4AF37]" : "text-[#444]")} />
                  )}
                </div>
                <span
                  className={cn(
                    "text-[11px] tracking-wider uppercase hidden sm:block",
                    active ? "text-white font-medium" : done ? "text-[#D4AF37]" : "text-[#444]"
                  )}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step content card */}
      <div className="relative bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

        <div className="p-6 sm:p-10">
          {step === 1 && <StepService data={data} update={update} onNext={next} />}
          {step === 2 && <StepBarber data={data} update={update} onNext={next} onPrev={prev} />}
          {step === 3 && <StepDateTime data={data} update={update} onNext={next} onPrev={prev} />}
          {step === 4 && (
            <StepConfirm data={data} update={update} onPrev={prev} onComplete={() => setCompleted(true)} />
          )}
        </div>

        {/* Bottom accent */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
}

function BookingSuccess({ data }: { data: BookingData }) {
  return (
    <div className="relative bg-[#111111] border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
      {/* Gold top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#F5E070] to-[#D4AF37]" />

      <div className="p-12 text-center">
        {/* Success icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
            <Check className="w-10 h-10 text-[#D4AF37]" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping bg-[#D4AF37]/10" />
        </div>

        <div
          className="text-white leading-none mb-3"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px,5vw,56px)", letterSpacing: "0.04em" }}
        >
          ¡CITA{" "}
          <span className="text-[#D4AF37]">CONFIRMADA!</span>
        </div>

        <p className="text-[#888888] mb-10 max-w-sm mx-auto leading-relaxed">
          Enviamos confirmación a{" "}
          <span className="text-white">{data.clientEmail}</span> y por WhatsApp a{" "}
          <span className="text-white">{data.clientPhone}</span>.
        </p>

        {/* Summary card */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-xl p-6 text-left max-w-sm mx-auto mb-8 space-y-3">
          {[
            ["Servicio", data.serviceName],
            ["Barbero", data.barberName],
            [
              "Fecha",
              data.date?.toLocaleDateString("es-CO", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }) ?? "",
            ],
            ["Hora", data.time],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
              <span className="text-[#888888] uppercase text-[11px] tracking-wider">{label}</span>
              <span className="text-white font-medium capitalize">{value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center text-sm pt-1">
            <span className="text-[#888888] uppercase text-[11px] tracking-wider">Total</span>
            <span className="text-[#D4AF37] font-bold">
              {new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(data.servicePrice)}
            </span>
          </div>
        </div>

        <p className="text-[#555] text-xs tracking-wider uppercase">
          ¿Necesitas cambiar tu cita? · WhatsApp disponible 24/7
        </p>
      </div>
    </div>
  );
}
