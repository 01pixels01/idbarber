import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

export default function CTA() {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Full-bleed image */}
      <div className="relative h-[600px] sm:h-[700px]">
        <Image
          src={IMAGES.gallery[2].src}
          alt={IMAGES.gallery[2].alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay — heavier bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40" />
        {/* Gold horizontal glow */}
        <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[#D4AF37]/8 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
            ✓ Cancelación gratuita hasta 24h antes
          </div>

          {/* Headline */}
          <h2
            className="text-white leading-none mb-6 max-w-4xl"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(52px, 9vw, 110px)",
              letterSpacing: "0.02em",
            }}
          >
            TU PRÓXIMA CITA,{" "}
            <span
              style={{
                WebkitTextStroke: "2px #D4AF37",
                color: "transparent",
              }}
            >
              HOY
            </span>
          </h2>

          <p className="text-white/60 text-lg max-w-lg mb-12 leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
            Reserva en 60 segundos, sin llamadas, sin esperas.
            Tu barbero favorito te espera.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/reservar"
              className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#0A0A0A] px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300"
              style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}
            >
              Reservar ahora
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>

            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 text-sm font-bold tracking-[0.2em] uppercase backdrop-blur-sm hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300"
              style={{ clipPath: "polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))" }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
