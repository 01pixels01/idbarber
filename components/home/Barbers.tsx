"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { IMAGES } from "@/lib/images";

const barbers = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Master Barber",
    experience: "12 años",
    rating: 4.9,
    reviews: 247,
    specialties: ["Fade", "Corte clásico", "Diseño"],
    image: IMAGES.barbers[0],
  },
  {
    id: 2,
    name: "Andrés García",
    role: "Senior Barber",
    experience: "8 años",
    rating: 4.8,
    reviews: 189,
    specialties: ["Barba premium", "Corte + barba", "Cejas"],
    image: IMAGES.barbers[1],
  },
  {
    id: 3,
    name: "Miguel Torres",
    role: "Style Artist",
    experience: "6 años",
    rating: 4.9,
    reviews: 312,
    specialties: ["Fade", "Diseños", "Tratamientos"],
    image: IMAGES.barbers[2],
  },
  {
    id: 4,
    name: "David Ruiz",
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
    <section id="barberos" className="py-28 px-4 sm:px-6 lg:px-8 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium px-4 py-1.5 rounded-full mb-4">
            Nuestro Equipo
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
            Los mejores{" "}
            <span className="text-gold-shimmer">artistas</span>
          </h2>
          <p className="text-[#888888] text-lg max-w-xl mx-auto">
            Expertos apasionados por su oficio. Cada uno con su propio estilo, todos con el mismo compromiso de excelencia.
          </p>
        </div>

        {/* Barbers grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className="group bg-[#111111] border border-white/5 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_0_32px_rgba(212,175,55,0.08)] transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative h-64 bg-[#1A1A1A] overflow-hidden">
                <Image
                  src={barber.image.src}
                  alt={barber.image.alt}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-5">
                {/* Info */}
                <h3 className="font-semibold text-white text-lg mb-0.5">{barber.name}</h3>
                <p className="text-[#D4AF37] text-sm mb-1">{barber.role}</p>
                <p className="text-[#888888] text-xs mb-4">{barber.experience} de experiencia</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(barber.rating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-white/20"}`}
                      />
                    ))}
                  </div>
                  <span className="text-white text-sm font-medium">{barber.rating}</span>
                  <span className="text-[#888888] text-xs">({barber.reviews})</span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {barber.specialties.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 bg-white/5 text-[#888888] text-xs rounded-full border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Link href={`/reservar?barbero=${barber.id}`}>
                  <Button variant="dark" size="sm" className="w-full group-hover:border-[#D4AF37]/40">
                    Reservar con {barber.name.split(" ")[0]}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
