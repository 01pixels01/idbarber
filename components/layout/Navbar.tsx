"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, LayoutDashboard, LogOut } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import Button from "@/components/ui/Button";
import LogoID from "@/components/ui/LogoID";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/store/CartDrawer";

const navLinks = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#barberos", label: "Barberos" },
  { href: "/tienda", label: "Tienda" },
  { href: "/#galeria", label: "Galería" },
  { href: "/#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, dispatch: cartDispatch } = useCart();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <CartDrawer />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <LogoID
                size={48}
                className="group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.7)] transition-all duration-300"
              />
              <span
                className="text-2xl tracking-[0.05em] leading-none"
                style={{ fontFamily: "var(--font-bebas)" }}
              >
                <span className="text-[#D4AF37]">ID</span>
                <span className="text-white">BARBER</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-[#888888] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              {/* Cart */}
              <button
                onClick={() => cartDispatch({ type: "SET_OPEN", open: true })}
                className="relative p-2 text-[#888888] hover:text-white transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              {isSignedIn ? (
                /* User menu */
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-xs font-bold text-[#D4AF37]">
                      {user?.firstName?.[0] ?? user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="text-white text-sm font-medium">
                      {user?.firstName ?? "Mi cuenta"}
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#111111] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#888888] hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Mi cuenta
                      </Link>
                      <button
                        onClick={() => signOut({ redirectUrl: "/" })}
                        className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-400/5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">Iniciar sesión</Button>
                  </Link>
                  <Link href="/registro">
                    <Button variant="dark" size="sm">Crear cuenta</Button>
                  </Link>
                </>
              )}

              <Link href="/reservar">
                <Button variant="gold" size="sm">Reservar cita</Button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-[#888888] hover:text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0A0A0A]/98 backdrop-blur-xl border-t border-white/5 px-4 py-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-[#888888] hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              {isSignedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button variant="dark" size="md" className="w-full">Mi cuenta</Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="md"
                    className="w-full text-red-400"
                    onClick={() => signOut({ redirectUrl: "/" })}
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="dark" size="md" className="w-full">Iniciar sesión</Button>
                  </Link>
                  <Link href="/registro" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" size="md" className="w-full">Crear cuenta</Button>
                  </Link>
                </>
              )}
              <Link href="/reservar" onClick={() => setMobileOpen(false)}>
                <Button variant="gold" size="md" className="w-full">Reservar cita</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
