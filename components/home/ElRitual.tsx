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
  },
  {
    num: "02",
    title: "DISEÑO",
    subtitle: "Personalizado",
    description:
      "Tu maestro barbero crea un mapa visual exclusivo para tu sesión. No existe una plantilla. Cada plan es único, como tú.",
    detail: "Sketch de corte · Selección de técnica · Paleta de productos",
  },
  {
    num: "03",
    title: "PRECISIÓN",
    subtitle: "Artesanal",
    description:
      "La ejecución es pura artesanía. Cada línea, cada transición, cada detalle ejecutado con la precisión de décadas de experiencia.",
    detail: "Técnica premium · Instrumentos exclusivos · Tiempo sin prisas",
  },
  {
    num: "04",
    title: "TRANSFORMACIÓN",
    subtitle: "Total",
    description:
      "No sales igual que entraste. Sales siendo una versión superior de ti mismo. Ese es el estándar IDBARBER.",
    detail: "Acabado premium · Styling final · Ritual de cierre",
  },
];

export default function ElRitual() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%" },
        }
      );

      // Línea de progreso que se llena con el scroll
      if (progressRef.current && trackRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 60%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
      }

      // Cada escena entra al hacer scroll
      itemsRef.current.forEach((el) => {
        if (!el) return;
        const card = el.querySelector(".ritual-card");
        const dot = el.querySelector(".ritual-dot");
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 78%" },
          }
        );
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(2)",
              scrollTrigger: { trigger: el, start: "top 72%" },
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
      className="relative py-32 sm:py-44 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#000]"
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />
        <div className="absolute top-1/4 right-[10%] w-[400px] h-[400px] bg-[#D4AF37]/4 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="text-center mb-24 sm:mb-32">
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
              fontSize: "clamp(52px,8vw,120px)",
              letterSpacing: "0.02em",
            }}
          >
            EL{" "}
            <span style={{ WebkitTextStroke: "1.5px #D4AF37", color: "transparent" }}>
              RITUAL
            </span>
          </h2>
          <p className="text-[#888] text-base sm:text-lg mt-6 max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}>
            No ofrecemos servicios. Ofrecemos una experiencia en cuatro fases diseñada para transformar tu presencia.
          </p>
        </div>

        {/* Timeline */}
        <div ref={trackRef} className="relative">
          {/* Línea vertical base (centrada en desktop, a la izquierda en móvil) */}
          <div className="absolute top-0 bottom-0 left-[27px] lg:left-1/2 lg:-translate-x-1/2 w-px bg-white/8" />
          {/* Línea de progreso dorada */}
          <div
            ref={progressRef}
            className="absolute top-0 bottom-0 left-[27px] lg:left-1/2 lg:-translate-x-1/2 w-px bg-gradient-to-b from-[#F5E070] via-[#D4AF37] to-[#A8861A] origin-top"
            style={{ boxShadow: "0 0 12px rgba(212,175,55,0.5)" }}
          />

          <div className="flex flex-col gap-16 sm:gap-24">
            {phases.map((p, i) => {
              const leftSide = i % 2 === 0;
              return (
                <div
                  key={p.num}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  className="relative"
                >
                  {/* Nodo en la línea */}
                  <div
                    className="ritual-dot absolute left-[27px] lg:left-1/2 -translate-x-1/2 top-2 z-10 w-3.5 h-3.5 rounded-full bg-[#D4AF37]"
                    style={{ boxShadow: "0 0 0 5px rgba(212,175,55,0.12), 0 0 20px rgba(212,175,55,0.6)" }}
                  />

                  {/* Tarjeta de la fase */}
                  <div
                    className={`ritual-card pl-16 lg:pl-0 ${
                      leftSide
                        ? "lg:pr-[calc(50%+3rem)] lg:text-right"
                        : "lg:pl-[calc(50%+3rem)]"
                    }`}
                  >
                    <div className="group relative inline-block w-full">
                      {/* Número grande */}
                      <div
                        className={`leading-none mb-3 select-none bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/5 bg-clip-text text-transparent ${leftSide ? "lg:text-right" : ""}`}
                        style={{
                          fontFamily: "var(--font-bebas)",
                          fontSize: "clamp(56px,7vw,96px)",
                          WebkitBackgroundClip: "text",
                        }}
                      >
                        {p.num}
                      </div>

                      {/* Título */}
                      <h3
                        className="text-white leading-none mb-1.5 uppercase"
                        style={{
                          fontFamily: "var(--font-bebas)",
                          fontSize: "clamp(34px,4.5vw,58px)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="text-[#D4AF37] text-xs sm:text-sm tracking-[0.3em] uppercase mb-5"
                        style={{ fontFamily: "var(--font-barlow)" }}
                      >
                        {p.subtitle}
                      </p>

                      {/* Descripción */}
                      <p
                        className={`text-[#999] leading-relaxed text-sm sm:text-base mb-6 ${leftSide ? "lg:ml-auto" : ""} max-w-md`}
                        style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}
                      >
                        {p.description}
                      </p>

                      {/* Chips */}
                      <div className={`flex flex-wrap gap-2 ${leftSide ? "lg:justify-end" : ""}`}>
                        {p.detail.split(" · ").map((d) => (
                          <span
                            key={d}
                            className="text-[#D4AF37]/60 text-[10px] tracking-[0.18em] uppercase border border-[#D4AF37]/20 px-3 py-1.5 rounded-full"
                            style={{ fontFamily: "var(--font-barlow)" }}
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
