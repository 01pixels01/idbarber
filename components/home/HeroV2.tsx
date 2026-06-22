"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoID from "@/components/ui/LogoID";

gsap.registerPlugin(ScrollTrigger);

export default function HeroV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0, duration: 1.4, ease: "power2.out" })
        .fromTo(tagRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(headRef.current, { opacity: 0, y: 60, skewY: 2 }, { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power3.out" }, "-=0.5")
        .fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");

      // Mouse parallax
      const section = sectionRef.current;
      if (!section) return;
      const handleMouse = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const cx = (clientX / window.innerWidth - 0.5) * 2;
        const cy = (clientY / window.innerHeight - 0.5) * 2;
        gsap.to(".hero-bg-layer", { x: cx * -18, y: cy * -12, duration: 1.8, ease: "power2.out" });
        gsap.to(".hero-particle", { x: cx * 30, y: cy * 20, duration: 2.5, ease: "power2.out" });
        gsap.to(headRef.current, { x: cx * 6, y: cy * 4, duration: 1.4, ease: "power2.out" });
      };
      window.addEventListener("mousemove", handleMouse);

      // Scroll fade-out
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (headRef.current) {
            gsap.set(headRef.current, { opacity: 1 - p * 2, y: p * -80 });
          }
          if (subRef.current) gsap.set(subRef.current, { opacity: 1 - p * 2.5 });
          if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 - p * 2.5 });
        },
      });

      return () => window.removeEventListener("mousemove", handleMouse);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Entrance overlay */}
      <div ref={overlayRef} className="absolute inset-0 z-20 bg-black pointer-events-none" />

      {/* BG video placeholder — replace src with real 4K video */}
      <div className="hero-bg-layer absolute inset-[-4%]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero/hero-bg.svg"
        >
          {/* <source src="/videos/hero.mp4" type="video/mp4" /> */}
        </video>
        {/* Fallback static bg */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 60% 40%, #1a1200 0%, #0A0A0A 50%, #000 100%)",
          }}
        />
      </div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-[1]" />

      {/* Scan-line texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full bg-[#D4AF37]"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random() * 0.4 + 0.05,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Gold ambient orbs */}
      <div className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-[#D4AF37]/6 rounded-full blur-[120px] z-[2] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[350px] h-[350px] bg-[#D4AF37]/4 rounded-full blur-[100px] z-[2] pointer-events-none" />

      {/* Vertical accent lines */}
      <div className="absolute left-8 top-0 bottom-0 z-[4] hidden lg:flex flex-col items-center justify-center gap-5 pointer-events-none">
        <div className="h-24 w-px bg-gradient-to-b from-transparent to-[#D4AF37]/40" />
        <span className="text-[#D4AF37]/40 text-[9px] tracking-[0.5em] uppercase" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Est. 2024 · Bogotá
        </span>
        <div className="h-24 w-px bg-gradient-to-t from-transparent to-[#D4AF37]/40" />
      </div>
      <div className="absolute right-8 top-0 bottom-0 z-[4] hidden lg:flex flex-col items-center justify-center gap-5 pointer-events-none">
        <div className="h-24 w-px bg-gradient-to-b from-transparent to-[#D4AF37]/40" />
        <span className="text-[#D4AF37]/40 text-[9px] tracking-[0.5em] uppercase" style={{ writingMode: "vertical-rl" }}>
          Premium Barber
        </span>
        <div className="h-24 w-px bg-gradient-to-t from-transparent to-[#D4AF37]/40" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-[10] text-center px-4 max-w-6xl w-full">
        {/* Logo monogram */}
        <div className="flex justify-center mb-8">
          <LogoID size={90} className="drop-shadow-[0_0_40px_rgba(212,175,55,0.5)]" />
        </div>

        {/* Tag */}
        <div
          ref={tagRef}
          className="inline-flex items-center gap-3 mb-8"
        >
          <div className="h-px w-10 bg-[#D4AF37]/60" />
          <span
            className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Barbería de Lujo · Bogotá
          </span>
          <div className="h-px w-10 bg-[#D4AF37]/60" />
        </div>

        {/* Headline */}
        <h1
          ref={headRef}
          className="text-white leading-[0.92] mb-6 uppercase"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(52px, 11vw, 160px)",
            letterSpacing: "0.02em",
            textShadow: "0 0 80px rgba(212,175,55,0.12)",
          }}
        >
          TU IMAGEN ES TU
          <br />
          <span
            style={{
              WebkitTextStroke: "1.5px #D4AF37",
              color: "transparent",
            }}
          >
            PRIMER NEGOCIO
          </span>
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          className="text-white/55 text-base sm:text-xl max-w-xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}
        >
          Transformamos hombres comunes en hombres memorables.
          <br />
          <span className="text-[#D4AF37]/70">Cada corte. Cada detalle. Cada visita.</span>
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reservar"
            className="group relative inline-flex items-center gap-3 bg-[#D4AF37] text-[#000] px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_60px_rgba(212,175,55,0.6)]"
            style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}
          >
            {/* Shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <span className="relative">Reservar Experiencia</span>
            <span className="relative group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          <Link
            href="#transformaciones"
            className="group inline-flex items-center gap-3 border border-white/15 text-white/80 px-10 py-5 text-xs font-bold tracking-[0.3em] uppercase backdrop-blur-sm hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300"
            style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}
          >
            Ver Transformaciones
            <span className="w-4 h-px bg-current group-hover:w-8 transition-all duration-300" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-3"
      >
        <div className="w-[1px] h-14 overflow-hidden relative">
          <div
            className="absolute inset-x-0 bg-[#D4AF37]"
            style={{
              animation: "scrollLine 1.8s ease-in-out infinite",
              top: "-100%",
              height: "100%",
            }}
          />
        </div>
        <span className="text-[#D4AF37]/40 text-[9px] tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
          Scroll
        </span>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { top: -100%; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
