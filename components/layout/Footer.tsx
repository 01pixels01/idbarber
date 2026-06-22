import Link from "next/link";
import { Phone, MapPin, Mail, Share2, BookOpen } from "lucide-react";
import LogoID from "@/components/ui/LogoID";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoID size={52} />
              <span className="text-2xl tracking-[0.05em] leading-none" style={{ fontFamily: "var(--font-bebas)" }}>
                <span className="text-[#D4AF37]">ID</span>
                <span className="text-white">BARBER</span>
              </span>
            </div>
            <p className="text-[#888888] text-sm leading-relaxed mb-6">
              Más que un corte. Una experiencia premium que transforma tu imagen.
            </p>
            <div className="flex gap-3">
              {[Share2, BookOpen].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#888888] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Servicios</h4>
            <ul className="space-y-2.5">
              {["Corte clásico", "Fade", "Barba premium", "Corte + barba", "Tratamientos"].map((s) => (
                <li key={s}>
                  <Link href="/servicios" className="text-[#888888] hover:text-[#D4AF37] text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Empresa</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/nosotros", label: "Nosotros" },
                { href: "/tienda", label: "Tienda" },
                { href: "/reservar", label: "Reservar cita" },
                { href: "/blog", label: "Blog" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[#888888] hover:text-[#D4AF37] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contacto</h4>
            <ul className="space-y-3">
              {[
                { icon: Phone, text: "+57 300 123 4567" },
                { icon: Mail, text: "hola@barbershoppro.co" },
                { icon: MapPin, text: "Calle 93 #15-20, Bogotá" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[#888888] text-sm">
                  <Icon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#888888] text-xs">
            © {new Date().getFullYear()} Barber Shop Pro. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            {["Privacidad", "Términos", "Cookies"].map((l) => (
              <Link key={l} href="#" className="text-[#888888] hover:text-white text-xs transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
