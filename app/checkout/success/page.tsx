import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export const metadata = { title: "Pago exitoso" };

export default function CheckoutSuccess() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-md w-full bg-[#111111] border border-[#D4AF37]/20 rounded-2xl overflow-hidden text-center">
          <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#F5E070] to-[#D4AF37]" />
          <div className="p-12">
            <div className="relative inline-flex mb-8">
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <div className="absolute inset-0 rounded-full animate-ping bg-[#D4AF37]/10" />
            </div>
            <h1
              className="text-white leading-none mb-3"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px,6vw,52px)", letterSpacing: "0.04em" }}
            >
              ¡PAGO <span className="text-[#D4AF37]">EXITOSO!</span>
            </h1>
            <p className="text-[#888] mb-2 leading-relaxed">
              Tu pedido fue confirmado. Recibirás un correo con el resumen y el seguimiento de tu envío.
            </p>
            <p className="text-[#555] text-sm mb-10">Tiempo de entrega: <span className="text-white">2-3 días hábiles</span></p>
            <div className="flex flex-col gap-3">
              <Link
                href="/tienda"
                className="block bg-[#D4AF37] text-black py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all duration-300"
                style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))", fontFamily: "var(--font-barlow)" }}
              >
                Seguir comprando
              </Link>
              <Link
                href="/dashboard"
                className="block py-3 text-[#888] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Ver mis pedidos
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
