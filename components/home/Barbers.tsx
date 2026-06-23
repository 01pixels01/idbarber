"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/images";

const barbers = [
  {
    id: 1,
    name: "Jair Cortes",
    role: "Master Barber",
    experience: "12 años",
    rating: 4.9,
    reviews: 247,
    specialties: ["Fade", "Corte clásico", "Diseño"],
    image: IMAGES.barbers[0],
  },
  {
    id: 2,
    name: "Ricardo Cortes",
    role: "Senior Barber",
    experience: "12 años",
    rating: 4.8,
    reviews: 189,
    specialties: ["Barba premium", "Corte + barba", "Cejas"],
    image: IMAGES.barbers[1],
  },
  {
    id: 3,
    name: "Alberto Cortes",
    role: "Master Barber",
    experience: "30 años",
    rating: 4.9,
    reviews: 312,
    specialties: ["Fade", "Diseños", "Tratamientos"],
    image: IMAGES.barbers[2],
  },
  {
    id: 4,
    name: "Miguel Rodriguez",
    role: "Barber Pro",
    experience: "10 años",
    rating: 4.7,
    reviews: 156,
    specialties: ["Clásico", "Barba", "VIP Experience"],
    image: IMAGES.barbers[3],
  },
];

export default function Barbers() {
  return (
    <section
      id="barberos"
      className="relative py-32 sm:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Glow de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: "rgba(212,175,55,0.05)" }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)" }}>
            <span style={{ color: "#D4AF37", fontFamily: "var(--font-barlow)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Nuestro Equipo
            </span>
          </div>
          <h2
            className="uppercase leading-none mb-5"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px,8vw,110px)", letterSpacing: "0.02em", color: "#FFFFFF" }}
          >
            LOS MEJORES{" "}
            <span style={{ WebkitTextStroke: "1.5px #D4AF37", color: "transparent" }}>MAESTROS</span>
          </h2>
          <p
            className="max-w-xl mx-auto"
            style={{ color: "#999999", fontFamily: "var(--font-barlow)", fontWeight: 300, fontSize: "clamp(15px,1.6vw,19px)", lineHeight: 1.7 }}
          >
            Expertos apasionados por su oficio. Cada uno con su propio estilo, todos con el mismo compromiso de excelencia.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className="group flex flex-col overflow-hidden rounded-2xl transition-all duration-500"
              style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Foto */}
              <div className="relative h-72 overflow-hidden" style={{ backgroundColor: "#1A1A1A" }}>
                <Image
                  src={barber.image.src}
                  alt={barber.image.alt}
                  fill
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #111111 0%, transparent 55%)" }} />
              </div>

              {/* Info — TODO centrado */}
              <div className="flex flex-col items-center text-center p-6">
                <h3
                  className="leading-none mb-1"
                  style={{ fontFamily: "var(--font-bebas)", fontSize: "26px", letterSpacing: "0.03em", color: "#FFFFFF" }}
                >
                  {barber.name}
                </h3>
                <p style={{ color: "#D4AF37", fontFamily: "var(--font-barlow)", fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "2px" }}>
                  {barber.role}
                </p>
                <p style={{ color: "#777777", fontFamily: "var(--font-barlow)", fontSize: "12px", marginBottom: "14px" }}>
                  {barber.experience} de experiencia
                </p>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5"
                        style={{
                          color: "#D4AF37",
                          fill: i < Math.floor(barber.rating) ? "#D4AF37" : "transparent",
                          opacity: i < Math.floor(barber.rating) ? 1 : 0.3,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 600 }}>{barber.rating}</span>
                  <span style={{ color: "#777777", fontSize: "12px" }}>({barber.reviews})</span>
                </div>

                {/* Especialidades */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {barber.specialties.map((s) => (
                    <span
                      key={s}
                      className="rounded-full"
                      style={{
                        padding: "3px 10px",
                        fontSize: "10px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(212,175,55,0.75)",
                        border: "1px solid rgba(212,175,55,0.2)",
                        fontFamily: "var(--font-barlow)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/reservar?barbero=${barber.id}`}
                  className="inline-flex items-center justify-center gap-2 w-full transition-all duration-300"
                  style={{
                    padding: "12px 0",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-barlow)",
                    fontWeight: 600,
                    color: "#D4AF37",
                    border: "1px solid rgba(212,175,55,0.3)",
                    borderRadius: "8px",
                  }}
                >
                  Reservar con {barber.name.split(" ")[0]}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
