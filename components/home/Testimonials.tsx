"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Santiago Vargas",
    role: "Cliente desde 2022",
    avatar: "SV",
    rating: 5,
    comment: "El mejor servicio de barbería que he vivido. El sistema de reservas es súper fácil y siempre me recuerdan la cita. Carlos hace un fade increíble.",
    service: "Fade Premium",
  },
  {
    id: 2,
    name: "Julián Morales",
    role: "Cliente VIP",
    avatar: "JM",
    rating: 5,
    comment: "Pagué online, llegué, me atendieron al instante. Sin esperas, sin contratiempos. La experiencia VIP vale cada peso.",
    service: "Experiencia VIP",
  },
  {
    id: 3,
    name: "Rodrigo Estrada",
    role: "Cliente desde 2023",
    avatar: "RE",
    rating: 5,
    comment: "Llevo 6 meses viniendo cada 2 semanas. La app es perfecta: veo mis citas, acumulo puntos y me avisan por WhatsApp. Todo muy profesional.",
    service: "Corte Clásico",
  },
  {
    id: 4,
    name: "Felipe Castro",
    role: "Cliente nuevo",
    avatar: "FC",
    rating: 5,
    comment: "Primera vez que fui y quedé enamorado. El ambiente, la atención, el corte... todo de primera. Ya agendé para el próximo mes.",
    service: "Corte + Barba",
  },
  {
    id: 5,
    name: "Tomás Pedraza",
    role: "Cliente frecuente",
    avatar: "TP",
    rating: 5,
    comment: "Compré los productos de la tienda online y llegaron en 24 horas. La pomada es espectacular. Servicio al cliente de 10.",
    service: "Tienda Online",
  },
  {
    id: 6,
    name: "Mario Quintero",
    role: "Cliente VIP",
    avatar: "MQ",
    rating: 5,
    comment: "El programa de puntos es genial. Ya llevo acumulados suficientes para un corte gratis. Muy buena estrategia la de ellos.",
    service: "Programa Fidelidad",
  },
];

// Duplicate for infinite scroll
const TRACK = [...testimonials, ...testimonials];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let pos = 0;
    let raf: number;
    const speed = 0.4;

    const tick = () => {
      pos += speed;
      const half = el.scrollWidth / 2;
      if (pos >= half) pos = 0;
      el.style.transform = `translateX(-${pos}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // Pause on hover
    const pause = () => cancelAnimationFrame(raf);
    const resume = () => { raf = requestAnimationFrame(tick); };
    el.parentElement?.addEventListener("mouseenter", pause);
    el.parentElement?.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(raf);
      el.parentElement?.removeEventListener("mouseenter", pause);
      el.parentElement?.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative text-center mb-20 px-4">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          500+ reseñas ★★★★★
        </div>
        <h2
          className="text-white leading-none mb-4"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(52px, 7vw, 90px)",
            letterSpacing: "0.02em",
          }}
        >
          LO QUE DICEN{" "}
          <span style={{ WebkitTextStroke: "1px #D4AF37", color: "transparent" }}>
            NUESTROS CLIENTES
          </span>
        </h2>
        <p className="text-[#888888] text-lg max-w-md mx-auto">
          Resultados reales, clientes satisfechos. Cada corte cuenta una historia.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#060606] to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#060606] to-transparent pointer-events-none" />

        <div ref={trackRef} className="flex gap-5 w-max will-change-transform pb-2">
          {TRACK.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="group w-[340px] shrink-0 bg-[#111111] border border-white/5 hover:border-[#D4AF37]/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.07)]"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed mb-6 group-hover:text-white/90 transition-colors">
                &ldquo;{t.comment}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{t.name}</div>
                    <div className="text-[#888888] text-xs">{t.role}</div>
                  </div>
                </div>
                <span className="text-[#D4AF37]/50 text-[10px] font-medium tracking-wider uppercase border border-[#D4AF37]/20 px-2 py-0.5 rounded-full">
                  {t.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Big number */}
      <div className="relative text-center mt-20 px-4">
        <div className="inline-flex flex-col sm:flex-row items-center gap-8 sm:gap-16">
          {[
            { n: "4.9", label: "Calificación promedio" },
            { n: "500+", label: "Reseñas verificadas" },
            { n: "98%", label: "Clientes que regresan" },
          ].map(({ n, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-[#D4AF37] leading-none"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px,6vw,72px)", letterSpacing: "0.04em" }}
              >
                {n}
              </div>
              <div className="text-[#888888] text-xs tracking-[0.2em] uppercase mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
