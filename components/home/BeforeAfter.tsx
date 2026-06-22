"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const transformations = [
  {
    id: 1,
    service: "Fade Premium",
    barber: "Carlos Mendoza",
    time: "45 min",
  },
  {
    id: 2,
    service: "Corte + Barba",
    barber: "Miguel Torres",
    time: "60 min",
  },
  {
    id: 3,
    service: "Experiencia VIP",
    barber: "Andrés García",
    time: "120 min",
  },
];

function Slider({ label }: { label: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updatePos(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { updatePos(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[480px] sm:h-[600px] rounded-xl overflow-hidden cursor-ew-resize select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* BEFORE */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-[#222] mx-auto mb-4" />
          <div className="w-24 h-3 bg-[#1A1A1A] rounded mx-auto mb-2" />
          <div className="w-16 h-2 bg-[#141414] rounded mx-auto" />
        </div>
        <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-sm text-white/60 text-xs px-3 py-1.5 rounded-full tracking-wider uppercase">
          Antes
        </div>
        {/* Simulate "before" look */}
        <div className="absolute inset-0 bg-[#0A0A0A]/20" />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "18px", color: "#333", letterSpacing: "0.2em" }}
        >
          FOTO CLIENTE
        </div>
      </div>

      {/* AFTER (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#2A1800] to-[#0A0A0A] flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-[#D4AF37]/20 mx-auto mb-4 border border-[#D4AF37]/30" />
            <div className="w-24 h-3 bg-[#D4AF37]/20 rounded mx-auto mb-2" />
            <div className="w-16 h-2 bg-[#D4AF37]/10 rounded mx-auto" />
          </div>
          <div className="absolute top-5 right-5 bg-[#D4AF37] text-[#000] text-xs px-3 py-1.5 rounded-full tracking-wider uppercase font-bold">
            Después
          </div>
          {/* Gold glow */}
          <div className="absolute inset-0 bg-[#D4AF37]/5" />
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "18px", color: "#D4AF37", opacity: 0.3, letterSpacing: "0.2em" }}>
            RESULTADO IDBARBER
          </div>
        </div>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 z-10 flex flex-col items-center justify-center"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="w-[2px] h-full bg-[#D4AF37]/60" />
        <div className="absolute w-10 h-10 rounded-full bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.7)] flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-[3px] h-4 bg-black rounded-full" />
            <div className="w-[3px] h-4 bg-black rounded-full" />
          </div>
        </div>
      </div>

      {/* Service label */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-[#D4AF37] text-xs px-4 py-1.5 rounded-full tracking-wider uppercase border border-[#D4AF37]/20">
        {label}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="transformaciones"
      className="relative py-36 px-4 sm:px-6 lg:px-8 bg-[#080808] overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D4AF37]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
              Resultados reales
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
          <h2
            className="text-white leading-none uppercase"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px,7vw,96px)", letterSpacing: "0.02em" }}
          >
            TRANSFORMACIONES
          </h2>
          <p className="text-[#888] mt-4 max-w-md mx-auto" style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}>
            Arrastra el slider para ver la diferencia.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {transformations.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-200 rounded-full border ${
                active === i
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] font-bold"
                  : "border-white/10 text-[#888] hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              }`}
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              {t.service}
            </button>
          ))}
        </div>

        {/* Slider */}
        <Slider label={`${transformations[active].service} · ${transformations[active].barber} · ${transformations[active].time}`} />

        {/* Info row */}
        <div className="mt-6 flex items-center justify-between text-xs text-[#555]" style={{ fontFamily: "var(--font-barlow)" }}>
          <span className="tracking-wider uppercase">Arrastra para comparar</span>
          <span className="tracking-wider uppercase text-[#D4AF37]/60">{transformations[active].barber} · IDBARBER</span>
        </div>
      </div>
    </section>
  );
}
