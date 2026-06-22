import Navbar from "@/components/layout/Navbar";
import BookingFlow from "@/components/booking/BookingFlow";
import Image from "next/image";
import { IMAGES } from "@/lib/images";

export const metadata = {
  title: "Reservar cita",
  description: "Reserva tu cita en IDBARBER en menos de 2 minutos. Elige tu servicio, barbero y horario favorito.",
  openGraph: {
    title: "Reservar cita — IDBARBER",
    description: "Agenda tu experiencia premium. Más de 8 barberos expertos disponibles.",
  },
};

export default function ReservarPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen">
        {/* Full-page background */}
        <div className="fixed inset-0 z-0">
          <Image
            src={IMAGES.hero.bg.src}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Heavy dark overlay */}
          <div className="absolute inset-0 bg-[#0A0A0A]/92" />
          {/* Gold ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#D4AF37]/6 rounded-full blur-[160px]" />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* LEFT PANEL — atmospheric info (hidden mobile) */}
          <div className="hidden lg:flex lg:w-[380px] xl:w-[440px] shrink-0 flex-col justify-between p-12 border-r border-white/5">
            {/* Branding */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-8 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
                  Reserva Online
                </span>
              </div>
              <h1
                className="text-white leading-none mb-6"
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(40px, 4vw, 62px)",
                  letterSpacing: "0.04em",
                }}
              >
                AGENDA TU{" "}
                <span className="text-[#D4AF37]">EXPERIENCIA</span>
              </h1>
              <p className="text-[#888888] text-sm leading-relaxed">
                Selecciona tu servicio, elige tu barbero y encuentra el horario perfecto. Todo en menos de 2 minutos.
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-6">
              {[
                { n: "8+", label: "Barberos expertos" },
                { n: "< 2 min", label: "Tiempo de reserva" },
                { n: "24/7", label: "Disponibilidad online" },
              ].map(({ n, label }) => (
                <div key={label} className="flex items-center gap-4 border-b border-white/5 pb-5 last:border-0">
                  <div
                    className="text-[#D4AF37] leading-none"
                    style={{ fontFamily: "var(--font-bebas)", fontSize: "32px", letterSpacing: "0.04em", minWidth: "80px" }}
                  >
                    {n}
                  </div>
                  <div className="text-[#888888] text-sm">{label}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white/3 border border-white/8 rounded-xl p-5">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#D4AF37] text-xs">★</span>
                ))}
              </div>
              <p className="text-white/60 text-xs leading-relaxed italic mb-3">
                &ldquo;Reservé en 2 minutos desde el teléfono. Llegué y me atendieron al instante. El mejor servicio de barbería que he vivido.&rdquo;
              </p>
              <div className="text-[#888] text-[11px] tracking-wider uppercase">Santiago V. · Cliente desde 2022</div>
            </div>
          </div>

          {/* RIGHT PANEL — booking form */}
          <div className="flex-1 flex flex-col">
            {/* Mobile header */}
            <div className="lg:hidden pt-24 pb-6 px-4 text-center">
              <h1
                className="text-white leading-none mb-2"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px,8vw,52px)", letterSpacing: "0.04em" }}
              >
                AGENDA TU <span className="text-[#D4AF37]">CITA</span>
              </h1>
              <p className="text-[#888888] text-sm">Elige servicio, barbero y horario.</p>
            </div>

            {/* Booking widget */}
            <div className="flex-1 flex items-start justify-center px-4 sm:px-8 pt-28 pb-16 lg:pt-16">
              <div className="w-full max-w-2xl">
                <BookingFlow />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
