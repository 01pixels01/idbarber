"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

const barbers = ["Carlos M.", "Andrés G.", "Miguel T.", "David R."];

const appointments = [
  { id: 1, client: "Juan Pérez", service: "Fade Premium", barber: "Carlos M.", time: "09:00", duration: 45, date: new Date() },
  { id: 2, client: "Andrés L.", service: "Corte + Barba", barber: "Miguel T.", time: "09:30", duration: 60, date: new Date() },
  { id: 3, client: "Camilo R.", service: "Corte Clásico", barber: "Andrés G.", time: "10:30", duration: 30, date: new Date() },
  { id: 4, client: "Diego C.", service: "Barba Completa", barber: "David R.", time: "11:00", duration: 30, date: new Date() },
  { id: 5, client: "Mateo V.", service: "VIP", barber: "Carlos M.", time: "14:00", duration: 120, date: new Date() },
  { id: 6, client: "Sebastián G.", service: "Fade Premium", barber: "Miguel T.", time: "15:00", duration: 45, date: new Date() },
];

const HOURS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const barberColors = [
  "bg-amber-500/20 border-amber-500/40 text-amber-300",
  "bg-blue-500/20 border-blue-500/40 text-blue-300",
  "bg-green-500/20 border-green-500/40 text-green-300",
  "bg-purple-500/20 border-purple-500/40 text-purple-300",
];

export default function AgendaPage() {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedDay, setSelectedDay] = useState(new Date());

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const dayApts = appointments.filter((a) => isSameDay(a.date, selectedDay));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Agenda</h1>
          <p className="text-[#888888] text-sm">Vista semanal de citas</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekStart((d) => addDays(d, -7))}
            className="p-2 rounded-lg bg-[#111111] border border-white/10 text-[#888888] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-white px-3">
            {format(weekStart, "'Semana del' d 'de' MMMM", { locale: es })}
          </span>
          <button
            onClick={() => setWeekStart((d) => addDays(d, 7))}
            className="p-2 rounded-lg bg-[#111111] border border-white/10 text-[#888888] hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week selector */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((day) => {
          const isSelected = isSameDay(day, selectedDay);
          const isToday = isSameDay(day, new Date());
          const dayAptCount = appointments.filter((a) => isSameDay(a.date, day)).length;
          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "p-3 rounded-xl text-center transition-all duration-200",
                isSelected
                  ? "bg-[#D4AF37]/10 border border-[#D4AF37]/30"
                  : "bg-[#111111] border border-white/5 hover:border-white/15"
              )}
            >
              <div className={cn("text-xs mb-1", isSelected ? "text-[#D4AF37]" : "text-[#888888]")}>
                {format(day, "EEE", { locale: es })}
              </div>
              <div
                className={cn(
                  "text-lg font-bold",
                  isSelected ? "text-[#D4AF37]" : isToday ? "text-white" : "text-[#888888]"
                )}
              >
                {format(day, "d")}
              </div>
              {dayAptCount > 0 && (
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#D4AF37] mx-auto" />
              )}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
        <div className="grid" style={{ gridTemplateColumns: "64px repeat(4, 1fr)" }}>
          {/* Header */}
          <div className="border-b border-white/5 p-3" />
          {barbers.map((b, i) => (
            <div
              key={b}
              className="border-b border-l border-white/5 p-3 text-center text-xs font-medium text-[#888888]"
            >
              {b}
            </div>
          ))}

          {/* Hours */}
          {HOURS.map((hour) => (
            <>
              <div key={`hour-${hour}`} className="border-b border-white/5 p-3 text-xs text-[#888888] text-right pr-4">
                {hour}
              </div>
              {barbers.map((barber, bi) => {
                const apt = dayApts.find(
                  (a) => a.barber === barber && a.time === hour
                );
                return (
                  <div
                    key={`${hour}-${barber}`}
                    className="border-b border-l border-white/5 p-1.5 min-h-[52px] relative"
                  >
                    {apt && (
                      <div
                        className={cn(
                          "rounded-lg border p-2 text-xs cursor-pointer hover:opacity-90",
                          barberColors[bi % barberColors.length]
                        )}
                      >
                        <div className="font-semibold truncate">{apt.client}</div>
                        <div className="opacity-75 truncate">{apt.service}</div>
                        <div className="opacity-60">{apt.duration} min</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
