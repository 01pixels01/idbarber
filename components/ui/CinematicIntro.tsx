"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const LINE_1 = "CADA HOMBRE TIENE UNA VERSIÓN";
const LINE_2 = "SUPERIOR DE SÍ MISMO.";
const LINE_3 = "NOSOTROS LA REVELAMOS.";

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Skip if already seen this session
    if (sessionStorage.getItem("intro_seen")) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("intro_seen", "1");
          // Swipe up exit
          gsap.to(containerRef.current, {
            y: "-100%",
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => {
              setVisible(false);
              onComplete();
            },
          });
        },
      });

      // Start invisible
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, logoRef.current], {
        opacity: 0,
        y: 40,
      });

      // Line 1 in
      tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, 0.6)
        // Line 2 in
        .to(line2Ref.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 1.4)
        // Dramatic pause
        .to({}, { duration: 0.8 })
        // Lines fade, line3 in
        .to([line1Ref.current, line2Ref.current], { opacity: 0.15, duration: 0.6, ease: "power2.out" })
        .to(line3Ref.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.3")
        // Pause
        .to({}, { duration: 1.2 })
        // Logo reveal
        .to(logoRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        // Final pause before exit
        .to({}, { duration: 0.9 });
    });

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)"
      }} />

      {/* Thin gold horizontal lines — decorative */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-[#D4AF37]/8 pointer-events-none" />

      {/* Content */}
      <div className="relative text-center px-6 max-w-5xl w-full">
        {/* Line 1 */}
        <div
          ref={line1Ref}
          className="text-white/90 mb-2 leading-none tracking-[0.12em]"
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(24px,4.5vw,58px)" }}
        >
          {LINE_1}
        </div>

        {/* Line 2 */}
        <div
          ref={line2Ref}
          className="mb-12 leading-none tracking-[0.12em]"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(24px,4.5vw,58px)",
            color: "#D4AF37",
          }}
        >
          {LINE_2}
        </div>

        {/* Separator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
          <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
        </div>

        {/* Line 3 */}
        <div
          ref={line3Ref}
          className="text-white leading-none tracking-[0.25em] mb-16"
          style={{ fontFamily: "var(--font-barlow)", fontSize: "clamp(13px,1.8vw,22px)", fontWeight: 300 }}
        >
          {LINE_3}
        </div>

        {/* Logo */}
        <div
          ref={logoRef}
          className="flex flex-col items-center gap-2"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <span
            className="tracking-[0.35em] text-[#D4AF37]/70"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(14px,1.5vw,18px)" }}
          >
            IDBARBER
          </span>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={() => {
          sessionStorage.setItem("intro_seen", "1");
          gsap.to(containerRef.current, {
            y: "-100%",
            duration: 0.7,
            ease: "power4.inOut",
            onComplete: () => { setVisible(false); onComplete(); },
          });
        }}
        className="absolute bottom-8 right-8 text-white/20 hover:text-white/60 text-xs tracking-[0.3em] uppercase transition-colors duration-300"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        Saltar →
      </button>
    </div>
  );
}
