"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { IMAGES } from "@/lib/images";

const services = [
  {
    id: 1,
    name: "Corte Clásico",
    tagline: "Atemporal.",
    description: "El corte que nunca pasa de moda. Tijera + navaja para un acabado perfecto.",
    price: 25000,
    duration: 30,
    image: IMAGES.services.corteClasico,
    popular: false,
    accent: "#D4AF37",
  },
  {
    id: 2,
    name: "Fade Premium",
    tagline: "La técnica.",
    description: "Degradado skin a skin con transiciones invisibles. La más solicitada.",
    price: 35000,
    duration: 45,
    image: IMAGES.services.fade,
    popular: true,
    accent: "#D4AF37",
  },
  {
    id: 3,
    name: "Barba Completa",
    tagline: "Definición total.",
    description: "Perfilado con navaja recta, vapor caliente y aceites de acabado.",
    price: 20000,
    duration: 30,
    image: IMAGES.services.barba,
    popular: false,
    accent: "#D4AF37",
  },
  {
    id: 4,
    name: "Experiencia VIP",
    tagline: "El máximo.",
    description: "Corte + barba + cejas + limpieza facial + bebida de bienvenida. Lujo total.",
    price: 120000,
    duration: 120,
    image: IMAGES.services.vip,
    popular: false,
    accent: "#D4AF37",
  },
];

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(p);
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import("animejs").then(({ animate, stagger }) => {
            animate(el.querySelectorAll(".svc-card"), {
              translateY: [80, 0],
              opacity: [0, 1],
              duration: 900,
              delay: stagger(120),
              easing: "easeOutExpo",
            });
            animate(el.querySelectorAll(".svc-header > *"), {
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 700,
              delay: stagger(100),
              easing: "easeOutExpo",
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-[#080808]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-[#D4AF37]/3 rounded-full blur-[100px] pointer-events-none" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="svc-header flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3 h-3" />
            Nuestros Servicios
          </div>
          <h2
            className="text-white leading-none mb-6"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(56px, 8vw, 100px)",
              letterSpacing: "0.02em",
            }}
          >
            ARTE EN CADA{" "}
            <span
              style={{
                WebkitTextStroke: "1px #D4AF37",
                color: "transparent",
              }}
            >
              CORTE
            </span>
          </h2>
          <p className="text-[#888888] text-lg max-w-lg leading-relaxed">
            Cada servicio es una experiencia diseñada para transformar tu imagen.
          </p>
        </div>

        {/* Featured large cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {services.slice(0, 2).map((s, i) => (
            <ServiceCard key={s.id} service={s} large index={i} active={active === i} onHover={() => setActive(i)} />
          ))}
        </div>

        {/* Smaller cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {services.slice(2).map((s, i) => (
            <ServiceCard key={s.id} service={s} large={false} index={i + 2} active={active === i + 2} onHover={() => setActive(i + 2)} />
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-10">
          <div>
            <p className="text-white font-semibold text-lg mb-1">¿No sabes cuál elegir?</p>
            <p className="text-[#888888] text-sm">Nuestros barberos te asesoran sin costo.</p>
          </div>
          <Link
            href="/reservar"
            className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#0A0A0A] px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
            style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}
          >
            Reservar cita
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: (typeof services)[0];
  large: boolean;
  index: number;
  active: boolean;
  onHover: () => void;
}

function ServiceCard({ service: s, large, onHover }: ServiceCardProps) {
  return (
    <div
      className={`svc-card group relative overflow-hidden cursor-pointer ${large ? "h-[420px]" : "h-[300px]"}`}
      style={{ opacity: 0 }}
      onMouseEnter={onHover}
    >
      {/* Background image */}
      <Image
        src={s.image.src}
        alt={s.image.alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/40 to-transparent" />

      {/* Hover glow border */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37]/40 transition-all duration-500" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 0 60px rgba(212,175,55,0.08)" }} />

      {/* Popular badge */}
      {s.popular && (
        <div className="absolute top-5 right-5 bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-bold px-3 py-1 tracking-[0.15em] uppercase">
          Más popular
        </div>
      )}

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-7">
        {/* Price chip */}
        <div className="inline-flex items-center gap-2 mb-3 self-start">
          <span className="text-[#D4AF37] text-2xl font-bold" style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}>
            {fmt(s.price)}
          </span>
          <span className="flex items-center gap-1 text-white/50 text-xs">
            <Clock className="w-3 h-3" />
            {s.duration} min
          </span>
        </div>

        {/* Name */}
        <h3
          className="text-white leading-none mb-2 group-hover:text-[#D4AF37] transition-colors duration-300"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: large ? "clamp(36px,4vw,52px)" : "clamp(28px,3vw,40px)",
            letterSpacing: "0.03em",
          }}
        >
          {s.name}
        </h3>

        {/* Tagline */}
        <p className="text-[#888888] text-sm leading-relaxed max-w-xs mb-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
          {s.description}
        </p>

        {/* CTA line */}
        <Link
          href={`/reservar?servicio=${s.id}`}
          className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400"
        >
          Reservar este servicio
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Bottom gold line on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-500" />
    </div>
  );
}
