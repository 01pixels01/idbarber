import Link from "next/link";
import { Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export const metadata = { title: "Pago en proceso" };

export default function CheckoutPending() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-md w-full bg-[#111111] border border-yellow-500/20 rounded-2xl overflow-hidden text-center">
          <div className="h-1 w-full bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-800" />
          <div className="p-12">
            <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto mb-8">
              <Clock className="w-10 h-10 text-yellow-400 animate-pulse" />
            </div>
            <h1
              className="text-white leading-none mb-3"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px,6vw,52px)", letterSpacing: "0.04em" }}
            >
              PAGO EN <span className="text-yellow-400">PROCESO</span>
            </h1>
            <p className="text-[#888] mb-3 leading-relaxed">
              Tu pago está siendo procesado. Te notificaremos por correo cuando se confirme.
            </p>
            <p className="text-[#555] text-sm mb-10">
              Esto puede tomar hasta <span className="text-white">24 horas</span> con PSE o transferencias.
            </p>
            <Link
              href="/"
              className="block bg-[#D4AF37] text-black py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all duration-300"
              style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))", fontFamily: "var(--font-barlow)" }}
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
