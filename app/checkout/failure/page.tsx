import Link from "next/link";
import { XCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export const metadata = { title: "Pago fallido" };

export default function CheckoutFailure() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-md w-full bg-[#111111] border border-red-500/20 rounded-2xl overflow-hidden text-center">
          <div className="h-1 w-full bg-gradient-to-r from-red-800 via-red-500 to-red-800" />
          <div className="p-12">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-8">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1
              className="text-white leading-none mb-3"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px,6vw,52px)", letterSpacing: "0.04em" }}
            >
              PAGO <span className="text-red-400">FALLIDO</span>
            </h1>
            <p className="text-[#888] mb-10 leading-relaxed">
              No se pudo procesar tu pago. No se realizó ningún cobro. Verifica los datos de tu tarjeta e intenta de nuevo.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/checkout"
                className="block bg-[#D4AF37] text-black py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all duration-300"
                style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))", fontFamily: "var(--font-barlow)" }}
              >
                Intentar de nuevo
              </Link>
              <Link
                href="/tienda"
                className="block py-3 text-[#888] text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Volver a la tienda
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
