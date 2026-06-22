"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: 3200, suffix: "+", label: "Cortes realizados", prefix: "" },
  { value: 8, suffix: "", label: "Barberos expertos", prefix: "" },
  { value: 4.9, suffix: "", label: "Calificación Google", prefix: "★ " },
  { value: 98, suffix: "%", label: "Clientes que regresan", prefix: "" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Count-up animation
        el.querySelectorAll<HTMLElement>("[data-count]").forEach((num) => {
          const target = parseFloat(num.dataset.count!);
          const isFloat = target % 1 !== 0;
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const current = target * eased;
            num.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toString();
            if (p < 1) requestAnimationFrame(tick);
            else num.textContent = isFloat ? target.toFixed(1) : target.toString();
          };
          requestAnimationFrame(tick);
        });
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-0">
      {/* Full-width dark strip with gold grid */}
      <div className="relative bg-[#060606] border-y border-white/5 overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,1) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Center glow */}
        <div className="absolute inset-x-1/4 top-0 bottom-0 bg-[#D4AF37]/4 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center px-6 py-2 ${
                i < stats.length - 1 ? "border-r border-white/5" : ""
              }`}
            >
              <div
                className="flex items-baseline gap-1 text-[#D4AF37] leading-none mb-3"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px,5vw,72px)", letterSpacing: "0.04em" }}
              >
                {s.prefix && <span>{s.prefix}</span>}
                <span data-count={s.value}>0</span>
                <span>{s.suffix}</span>
              </div>
              <div className="text-[#888888] text-xs tracking-[0.2em] uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
