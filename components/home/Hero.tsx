"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { IMAGES } from "@/lib/images";
import LogoID from "@/components/ui/LogoID";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("animejs").then(({ animate, stagger }) => {
      // 1. Líneas decorativas expandiéndose
      animate([lineLeftRef.current, lineRightRef.current], {
        scaleX: [0, 1],
        duration: 1200,
        delay: stagger(100),
        easing: "easeOutExpo",
      });

      // 2. Logo IDBARBER letra por letra
      if (logoRef.current) {
        const chars = logoRef.current.querySelectorAll(".char");
        animate(chars, {
          translateY: ["120%", "0%"],
          opacity: [0, 1],
          duration: 900,
          delay: stagger(60, { start: 300 }),
          easing: "easeOutExpo",
        });
      }

      // 3. Tagline slide in
      if (taglineRef.current) animate(taglineRef.current, {
        translateX: [-40, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 1000,
        easing: "easeOutExpo",
      });

      // 4. Subtítulo fade up
      if (subtitleRef.current) animate(subtitleRef.current, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 1200,
        easing: "easeOutExpo",
      });

      // 5. CTAs
      const ctaBtns = ctaRef.current?.querySelectorAll("a");
      if (ctaBtns) {
        animate(ctaBtns, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 700,
          delay: stagger(120, { start: 1400 }),
          easing: "easeOutExpo",
        });
      }

      // 6. Stats counter
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-num");
        counters.forEach((el) => {
          const target = Number(el.getAttribute("data-target"));
          const isPercent = el.getAttribute("data-suffix") === "%";
          const obj = { v: 0 };
          animate(obj, {
            v: target,
            duration: 2000,
            delay: 1600,
            easing: "easeOutExpo",
            onUpdate: () => {
              (el as HTMLElement).textContent =
                Math.floor(obj.v).toLocaleString("es-CO") + (isPercent ? "%" : "+");
            },
          });
        });

        animate(statsRef.current.querySelectorAll(".stat-item"), {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          delay: stagger(100, { start: 1500 }),
          easing: "easeOutExpo",
        });
      }

      // 7. Scroll indicator bounce
      const scrollEl = document.querySelector(".scroll-indicator");
      if (scrollEl) {
        animate(scrollEl, {
          translateY: [0, 8, 0],
          duration: 1500,
          loop: true,
          easing: "easeInOutSine",
          delay: 2000,
        });
      }
    });
  }, []);

  const logoChars = "IDBARBER".split("");

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background — hero image + grid + orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hero background image */}
        <Image
          src={IMAGES.hero.bg.src}
          alt={IMAGES.hero.bg.alt}
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-[#D4AF37]/4 rounded-full blur-[100px]" />
        <div className="absolute top-20 right-1/4 w-[200px] h-[200px] bg-white/2 rounded-full blur-[80px]" />
      </div>

      {/* Decorative horizontal lines */}
      <div
        ref={lineLeftRef}
        style={{ transformOrigin: "right center", transform: "scaleX(0)" }}
        className="absolute left-0 top-1/2 w-[20%] h-px bg-gradient-to-r from-transparent to-[#D4AF37]/40"
      />
      <div
        ref={lineRightRef}
        style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
        className="absolute right-0 top-1/2 w-[20%] h-px bg-gradient-to-l from-transparent to-[#D4AF37]/40"
      />

      {/* Vertical side text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="h-16 w-px bg-gradient-to-b from-transparent to-[#D4AF37]/50" />
        <span
          className="text-[#D4AF37]/50 text-[10px] tracking-[0.4em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Premium Barber
        </span>
        <div className="h-16 w-px bg-gradient-to-t from-transparent to-[#D4AF37]/50" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="h-16 w-px bg-gradient-to-b from-transparent to-[#D4AF37]/50" />
        <span
          className="text-[#D4AF37]/50 text-[10px] tracking-[0.4em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Est. 2024
        </span>
        <div className="h-16 w-px bg-gradient-to-t from-transparent to-[#D4AF37]/50" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 pt-20">
        {/* Logo monogram */}
        <div className="flex justify-center mb-6">
          <LogoID
            size={120}
            className="drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
          />
        </div>

        {/* Badge */}
        <div
          ref={taglineRef}
          style={{ opacity: 0 }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <div className="h-px w-8 bg-[#D4AF37]" />
          <span
            className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-barlow)" }}
          >
            Barbería de Lujo · Reservas 24/7
          </span>
          <div className="h-px w-8 bg-[#D4AF37]" />
        </div>

        {/* IDBARBER logo — letra por letra */}
        <div ref={logoRef} className="overflow-hidden mb-4">
          <h1
            className="leading-none tracking-[-0.02em] select-none"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(80px, 18vw, 240px)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(212,175,55,0.15)",
            }}
            aria-label="IDBARBER"
          >
            {logoChars.map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{
                  opacity: 0,
                  color: i < 2 ? "#D4AF37" : "#FFFFFF",
                  WebkitTextStroke: i < 2 ? "0px" : "0px",
                  textShadow:
                    i < 2
                      ? "0 0 80px rgba(212,175,55,0.5)"
                      : "0 0 40px rgba(255,255,255,0.1)",
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Tagline under logo */}
        <p
          ref={subtitleRef}
          style={{ opacity: 0, fontFamily: "var(--font-barlow)" }}
          className="text-[#888888] text-base sm:text-xl tracking-[0.2em] uppercase mb-10 font-light"
        >
          Más que un corte.{" "}
          <span className="text-[#D4AF37]">Una experiencia.</span>
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/reservar"
            style={{
              opacity: 0,
              fontFamily: "var(--font-barlow)",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            className="group relative inline-flex items-center gap-3 bg-[#D4AF37] text-[#0A0A0A] px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
          >
            <span className="relative z-10">Reservar cita</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </Link>

          <Link
            href="/#servicios"
            style={{ opacity: 0, fontFamily: "var(--font-barlow)" }}
            className="group inline-flex items-center gap-3 border border-[#D4AF37]/30 text-white px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            Ver servicios
          </Link>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex items-center justify-center gap-12 sm:gap-20"
        >
          {[
            { value: 5000, suffix: "+", label: "Clientes" },
            { value: 98, suffix: "%", label: "Satisfacción", isPercent: true },
            { value: 8, suffix: "+", label: "Barberos expertos" },
          ].map(({ value, suffix, label, isPercent }) => (
            <div key={label} className="stat-item text-center" style={{ opacity: 0 }}>
              <div
                className="stat-num text-3xl sm:text-4xl font-bold text-[#D4AF37]"
                data-target={value}
                data-suffix={isPercent ? "%" : ""}
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}
              >
                0{suffix}
              </div>
              <div
                className="text-[#888888] text-xs tracking-[0.2em] uppercase mt-1"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#888888]">
        <span
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
      </div>
    </section>
  );
}
