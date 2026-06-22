"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PremiumCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX - 3, y: mouseY - 3, duration: 0.05, ease: "none" });
    };

    const lerp = () => {
      ringX += (mouseX - ringX - 18) * 0.12;
      ringY += (mouseY - ringY - 18) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", onMove);
    const raf = requestAnimationFrame(lerp);

    // Expand on interactive elements
    const onEnter = () => gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.25, ease: "power2.out" });
    const onLeave = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.25, ease: "power2.out" });
    const onDown = () => gsap.to(dot, { scale: 2.5, duration: 0.15, ease: "power2.out" });
    const onUp = () => gsap.to(dot, { scale: 1, duration: 0.15, ease: "power2.out" });

    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99999 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99998 }}
      />
    </>
  );
}
