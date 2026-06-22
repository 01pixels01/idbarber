"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal(options?: {
  translateY?: number;
  opacity?: [number, number];
  duration?: number;
  delay?: number;
  stagger?: number;
  selector?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = options?.selector
      ? el.querySelectorAll(options.selector)
      : [el];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("animejs").then(({ animate, stagger }) => {
              animate(targets, {
                translateY: [options?.translateY ?? 50, 0],
                opacity: options?.opacity ?? [0, 1],
                duration: options?.duration ?? 800,
                delay: options?.stagger
                  ? stagger(options.stagger, { start: options.delay ?? 0 })
                  : options?.delay ?? 0,
                easing: "easeOutExpo",
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useCharReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split text into spans
    const text = el.innerText;
    el.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? '<span style="display:inline-block;width:0.3em"> </span>'
          : `<span class="char-split"><span class="char-inner">${char}</span></span>`
      )
      .join("");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("animejs").then(({ animate, stagger }) => {
              animate(el.querySelectorAll(".char-inner"), {
                translateY: ["110%", "0%"],
                duration: 700,
                delay: stagger(40),
                easing: "easeOutExpo",
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            import("animejs").then(({ animate }) => {
              const obj = { value: 0 };
              animate(obj, {
                value: target,
                duration,
                easing: "easeOutExpo",
                onUpdate: () => {
                  if (el) el.textContent = Math.floor(obj.value).toLocaleString("es-CO");
                },
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
}
