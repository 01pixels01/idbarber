"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    num: "01",
    title: "DIAGNÓSTICO",
    subtitle: "De imagen",
    description:
      "Analizamos tu estructura facial, tipo de cabello, estilo de vida y objetivos. Cada detalle cuenta para construir la imagen que mereces.",
    detail: "Consulta personalizada · Análisis facial · Historial de estilos",
    accent: "#D4AF37",
  },
  {
    num: "02",
    title: "DISEÑO",
    subtitle: "Personalizado",
    description:
      "Tu maestro barbero crea un mapa visual exclusivo para tu sesión. No existe una plantilla. Cada plan es único, como tú.",
    detail: "Sketch de corte · Selección de técnica · Paleta de productos",
    accent: "#D4AF37",
  },
  {
    num: "03",
    title: "PRECISIÓN",
    subtitle: "Artesanal",
    description:
      "La ejecución es pura artesanía. Cada línea, cada transición, cada detalle ejecutado con la precisión de décadas de experiencia.",
    detail: "Técnica premium · Instrumentos exclusivos · Tiempo sin prisas",
    accent: "#D4AF37",
  },
  {
    num: "04",
    title: "TRANSFORMACIÓN",
    subtitle: "Total",
    description:
      "No sales igual que entraste. Sales siendo una versión superior de ti mismo. Ese es el estándar IDBARBER.",
    detail: "Acabado premium · Styling final · Ritual de cierre",
    accent: "#D4AF37",
  },
];

export default function ElRitual() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 80%" },
        }
      );

      // Phase items — stagger in
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );

        // Number count-up effect
        const numEl = el.querySelector(".phase-num");
        if (numEl) {
          gsap.fromTo(
            numEl,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.4)",
              scrollTrigger: { trigger: el, start: "top 80%" },
            }
          );
        }

        // Line expand
        const lineEl = el.querySelector(".phase-line");
        if (lineEl) {
          gsap.fromTo(
            lineEl,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 75%" },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ritual"
      className="relative py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#000]"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="text-center mb-28">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <span className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
              El Proceso
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
          <h2
            className="text-white leading-none uppercase"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(52px,8vw,110px)",
              letterSpacing: "0.02em",
            }}
          >
            EL{" "}
            <span style={{ WebkitTextStroke: "1.5px #D4AF37", color: "transparent" }}>
              RITUAL
            </span>
          </h2>
          <p className="text-[#888] text-lg mt-6 max-w-md mx-auto" style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}>
            No ofrecemos servicios. Ofrecemos una experiencia en cuatro fases diseñada para transformar tu presencia.
          </p>
        </div>

        {/* Phases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {phases.map((p, i) => (
            <div
              key={p.num}
              ref={(el) => { itemsRef.current[i] = el; }}
              className={`group relative border-[#D4AF37]/8 p-10 sm:p-14 transition-all duration-500 hover:bg-[#D4AF37]/3 cursor-default ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < 2 ? "border-b" : ""}`}
            >
              {/* Corner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: "inset 0 0 60px rgba(212,175,55,0.04)" }} />

              {/* Phase number */}
              <div
                className="phase-num text-[#D4AF37]/10 leading-none mb-6 select-none"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(72px,8vw,120px)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                {p.num}
              </div>

              {/* Gold line */}
              <div
                className="phase-line h-[1.5px] w-16 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/30 mb-8"
                style={{ transformOrigin: "left center" }}
              />

              {/* Title */}
              <h3
                className="text-white leading-none mb-1 uppercase group-hover:text-[#D4AF37] transition-colors duration-300"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(36px,4vw,56px)",
                  letterSpacing: "0.03em",
                }}
              >
                {p.title}
              </h3>
              <p
                className="text-[#D4AF37]/70 text-sm tracking-[0.25em] uppercase mb-6"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {p.subtitle}
              </p>

              {/* Description */}
              <p className="text-[#888] leading-relaxed text-sm max-w-sm mb-6" style={{ fontFamily: "var(--font-barlow)" }}>
                {p.description}
              </p>

              {/* Detail chips */}
              <div className="flex flex-wrap gap-2">
                {p.detail.split(" · ").map((d) => (
                  <span
                    key={d}
                    className="text-[#D4AF37]/50 text-[10px] tracking-[0.2em] uppercase border border-[#D4AF37]/15 px-3 py-1 rounded-full"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
