"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BookingData } from "./BookingFlow";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  startOfDay,
  getDay,
} from "date-fns";
import { es } from "date-fns/locale";

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];

// Simulate some booked slots
const BOOKED = ["09:00", "10:30", "14:00", "16:00"];

interface Props {
  data: BookingData;
  update: (patch: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepDateTime({ data, update, onNext, onPrev }: Props) {
  const [viewMonth, setViewMonth] = useState(new Date());

  const today = startOfDay(new Date());
  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Leading empty cells for day-of-week alignment (Mon=0)
  const firstDow = (getDay(monthStart) + 6) % 7;

  const isDisabled = (d: Date) => isBefore(d, today) || getDay(d) === 0;

  return (
    <div>
      <h2 className="font-semibold text-xl mb-1">Elige fecha y hora</h2>
      <p className="text-[#888888] text-sm mb-6">Selecciona el día y el horario que prefieras.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setViewMonth((m) => subMonths(m, 1))}
              className="p-2 rounded-lg hover:bg-white/5 text-[#888888] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium text-sm capitalize">
              {format(viewMonth, "MMMM yyyy", { locale: es })}
            </span>
            <button
              onClick={() => setViewMonth((m) => addMonths(m, 1))}
              className="p-2 rounded-lg hover:bg-white/5 text-[#888888] hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map((d) => (
              <div key={d} className="text-center text-xs text-[#888888] py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {[...Array(firstDow)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((day) => {
              const disabled = isDisabled(day);
              const selected = data.date ? isSameDay(day, data.date) : false;
              const isToday = isSameDay(day, today);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => !disabled && update({ date: day, time: "" })}
                  disabled={disabled}
                  className={cn(
                    "aspect-square rounded-lg text-sm flex items-center justify-center transition-all duration-150",
                    selected
                      ? "bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                      : isToday
                      ? "border border-[#D4AF37]/40 text-[#D4AF37]"
                      : disabled
                      ? "text-white/20 cursor-not-allowed"
                      : "text-[#888888] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div>
          <p className="text-sm font-medium text-white mb-4">
            {data.date
              ? `Horarios — ${format(data.date, "EEEE d 'de' MMMM", { locale: es })}`
              : "Primero selecciona una fecha"}
          </p>

          {data.date ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {TIME_SLOTS.map((slot) => {
                const booked = BOOKED.includes(slot);
                const selected = data.time === slot;

                return (
                  <button
                    key={slot}
                    onClick={() => !booked && update({ time: slot })}
                    disabled={booked}
                    className={cn(
                      "py-2 px-3 rounded-lg text-sm text-center transition-all duration-150",
                      selected
                        ? "bg-[#D4AF37] text-[#0A0A0A] font-bold"
                        : booked
                        ? "bg-white/3 text-white/20 cursor-not-allowed line-through"
                        : "bg-[#0A0A0A] border border-white/10 text-[#888888] hover:border-[#D4AF37]/40 hover:text-white"
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center text-[#888888] text-sm border border-white/5 rounded-xl">
              Selecciona una fecha para ver horarios disponibles
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="dark" size="md" onClick={onPrev}>
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </Button>
        <Button
          variant="gold"
          size="md"
          onClick={onNext}
          disabled={!data.date || !data.time}
        >
          Continuar
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
