"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PremiumCursor() {
  const scissorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const topBladeRef = useRef<SVGGElement>(null);
  const bottomBladeRef = useRef<SVGGElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Solo activar con mouse fino y sin reduced-motion (accesibilidad)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noReduce = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    setEnabled(fine && noReduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const scissor = scissorRef.current;
    const ring = ringRef.current;
    if (!scissor || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(scissor, { x: mouseX - 14, y: mouseY - 14, duration: 0.08, ease: "power2.out" });
    };

    const lerp = () => {
      ringX += (mouseX - ringX - 22) * 0.13;
      ringY += (mouseY - ringY - 22) * 0.13;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(lerp);

    // Snip: cerrar las tijeras al hacer click
    const snip = () => {
      gsap.to(topBladeRef.current, { rotation: -18, transformOrigin: "20px 20px", duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" });
      gsap.to(bottomBladeRef.current, { rotation: 18, transformOrigin: "20px 20px", duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" });
      gsap.to(scissor, { scale: 0.85, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" });
    };

    // Expandir anillo sobre elementos interactivos
    const onEnter = () => gsap.to(ring, { scale: 1.8, borderColor: "rgba(212,175,55,0.7)", duration: 0.25, ease: "power2.out" });
    const onLeave = () => gsap.to(ring, { scale: 1, borderColor: "rgba(212,175,55,0.4)", duration: 0.25, ease: "power2.out" });

    document.querySelectorAll("a, button, [role='button'], input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    window.addEventListener("mousedown", snip);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", snip);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Tijeras de barbero */}
      <div
        ref={scissorRef}
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99999, width: 28, height: 28 }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}
        >
          {/* Tornillo central */}
          <circle cx="20" cy="20" r="2.2" fill="#D4AF37" />
          {/* Hoja superior */}
          <g ref={topBladeRef}>
            <line x1="20" y1="20" x2="36" y2="8" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="9" cy="9" r="5" stroke="#D4AF37" strokeWidth="2.2" fill="none" />
            <line x1="20" y1="20" x2="12.5" y2="12.5" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" />
          </g>
          {/* Hoja inferior */}
          <g ref={bottomBladeRef}>
            <line x1="20" y1="20" x2="36" y2="32" stroke="#F5E070" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="9" cy="31" r="5" stroke="#F5E070" strokeWidth="2.2" fill="none" />
            <line x1="20" y1="20" x2="12.5" y2="27.5" stroke="#F5E070" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Anillo seguidor */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 44,
          height: 44,
          border: "1px solid rgba(212,175,55,0.4)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
        }}
      />
    </>
  );
}
