"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Crown, Zap, Gift, Star, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Zap, text: "Reservas prioritarias 24/7" },
  { icon: Star, text: "15% descuento en todos los servicios" },
  { icon: Gift, text: "Productos exclusivos IDBARBER" },
  { icon: Shield, text: "Atención preferencial garantizada" },
  { icon: Crown, text: "Invitaciones a eventos privados" },
  { icon: Check, text: "Cancelación sin penalidad" },
];

const plans = [
  {
    id: "silver",
    name: "SILVER",
    price: 80000,
    period: "mes",
    color: "#C0C0C0",
    description: "Para el hombre que exige calidad.",
    perks: ["Reservas preferentes", "10% descuento servicios", "Acumulación 2x puntos"],
  },
  {
    id: "black",
    name: "BLACK CARD",
    price: 180000,
    period: "mes",
    color: "#D4AF37",
    description: "Para el hombre que no acepta menos que lo mejor.",
    perks: ["Todo Silver +", "15% descuento servicios", "Productos gratis mensuales", "Eventos VIP exclusivos", "Barbero personal asignado"],
    featured: true,
  },
  {
    id: "elite",
    name: "ELITE",
    price: 350000,
    period: "mes",
    color: "#F5E070",
    description: "Acceso ilimitado. Sin restricciones.",
    perks: ["Todo Black Card +", "Cortes ilimitados", "Servicio a domicilio", "Consultoría de imagen mensual"],
  },
];

function fmt(p: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p);
}

export default function BlackCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 80%" },
        }
      );

      // Plans stagger
      gsap.fromTo(
        ".plan-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9, ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".plans-grid", start: "top 75%" },
        }
      );

      // Physical card tilt on mouse
      const card = cardRef.current;
      if (!card) return;
      const handleMouse = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = (e.clientX - rect.left) / rect.width - 0.5;
        const cy = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: cx * 18,
          rotateX: -cy * 12,
          duration: 0.6,
          ease: "power2.out",
        });
      };
      const resetTilt = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power2.out" });
      };
      card.addEventListener("mousemove", handleMouse);
      card.addEventListener("mouseleave", resetTilt);
      return () => {
        card.removeEventListener("mousemove", handleMouse);
        card.removeEventListener("mouseleave", resetTilt);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="membresia"
      className="relative py-36 px-4 sm:px-6 lg:px-8 bg-[#000] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D4AF37]/3 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
              Membresía Exclusiva
            </span>
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
          </div>
          <h2
            className="text-white leading-none uppercase mb-6"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(52px,8vw,110px)", letterSpacing: "0.02em" }}
          >
            BLACK{" "}
            <span style={{ WebkitTextStroke: "1.5px #D4AF37", color: "transparent" }}>CARD</span>
          </h2>
          <p className="text-[#888] text-lg max-w-lg mx-auto" style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}>
            Acceso al nivel más alto de experiencia en barbería. Porque los hombres que construyen presencia no esperan.
          </p>
        </div>

        {/* Physical card visual */}
        <div className="flex justify-center mb-24">
          <div
            ref={cardRef}
            className="relative w-[340px] h-[200px] rounded-2xl overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #1A1400 0%, #0A0A0A 40%, #2A1E00 100%)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.25)",
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Card shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/12 via-transparent to-transparent" />
            <div className="absolute top-0 left-[-40%] right-0 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/8 to-transparent rotate-[20deg] pointer-events-none" />

            {/* Card content */}
            <div className="absolute inset-0 p-7 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[#D4AF37]/50 text-[9px] tracking-[0.4em] uppercase mb-1" style={{ fontFamily: "var(--font-barlow)" }}>
                    IDBARBER
                  </div>
                  <div className="text-white text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
                    Membresía Premium
                  </div>
                </div>
                <Crown className="w-6 h-6 text-[#D4AF37]" />
              </div>

              {/* Chip */}
              <div className="w-9 h-7 rounded-md border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10" />

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[#888] text-[8px] tracking-[0.3em] uppercase mb-1">Titular</div>
                  <div className="text-white text-sm tracking-[0.2em] font-medium" style={{ fontFamily: "var(--font-barlow)" }}>
                    TU NOMBRE AQUÍ
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#D4AF37]" style={{ fontFamily: "var(--font-bebas)", fontSize: "22px", letterSpacing: "0.1em" }}>
                    BLACK
                  </div>
                  <div className="text-[#D4AF37]/60" style={{ fontFamily: "var(--font-bebas)", fontSize: "14px", letterSpacing: "0.1em" }}>
                    CARD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="plans-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card relative rounded-2xl overflow-hidden border transition-all duration-300 group ${
                plan.featured
                  ? "border-[#D4AF37]/40 shadow-[0_0_60px_rgba(212,175,55,0.12)]"
                  : "border-white/8 hover:border-[#D4AF37]/20"
              }`}
              style={{ background: plan.featured ? "linear-gradient(160deg, #1A1400 0%, #0A0A0A 100%)" : "#111111" }}
            >
              {plan.featured && (
                <>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#D4AF37] text-black text-[9px] font-bold px-3 py-1 tracking-[0.2em] uppercase">
                      Recomendado
                    </span>
                  </div>
                </>
              )}

              <div className="p-8">
                <div className="text-[#D4AF37]/60 text-[9px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "var(--font-barlow)" }}>
                  Plan
                </div>
                <div
                  className="text-white leading-none mb-1"
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "28px",
                    letterSpacing: "0.06em",
                    color: plan.color,
                  }}
                >
                  {plan.name}
                </div>
                <p className="text-[#666] text-xs mb-6" style={{ fontFamily: "var(--font-barlow)" }}>{plan.description}</p>

                <div className="mb-6">
                  <span
                    className="text-white leading-none"
                    style={{ fontFamily: "var(--font-bebas)", fontSize: "42px", letterSpacing: "0.02em" }}
                  >
                    {fmt(plan.price)}
                  </span>
                  <span className="text-[#888] text-sm ml-1">/{plan.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.perks.map((perk) => (
                    <div key={perk} className="flex items-start gap-3">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                      <span className="text-[#888] text-xs" style={{ fontFamily: "var(--font-barlow)" }}>{perk}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard"
                  className={`block text-center py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                    plan.featured
                      ? "bg-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                      : "border border-white/15 text-white hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                  }`}
                  style={{
                    clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
                    fontFamily: "var(--font-barlow)",
                  }}
                >
                  {plan.featured ? "Unirme Ahora" : "Seleccionar"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits strip */}
        <div className="border-t border-white/5 pt-12">
          <p className="text-center text-[#555] text-xs tracking-[0.3em] uppercase mb-8" style={{ fontFamily: "var(--font-barlow)" }}>
            Todos los planes incluyen
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-3 text-center">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-[#D4AF37]/70" />
                </div>
                <span className="text-[#666] text-[10px] tracking-wider leading-snug" style={{ fontFamily: "var(--font-barlow)" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
