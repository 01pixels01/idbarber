"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Upload, Sparkles, ArrowRight, Home, MessageCircle, Loader2, ShieldCheck } from "lucide-react";

// WhatsApp de IDBARBER (formato internacional sin + ni espacios)
const WHATSAPP = "573175324098";

type Shape = "oval" | "square" | "round" | "heart";

interface TrendStyle {
  name: string;
  tag: string;
  desc: string;
}

// 3 estilos en tendencia 2026 por forma facial
const trends: Record<Shape, TrendStyle[]> = {
  oval: [
    { name: "Textured Crop", tag: "Tendencia 2026", desc: "Flequillo texturizado con fade bajo. Moderno y versátil." },
    { name: "Low Taper Fade", tag: "Más pedido", desc: "Degradado suave que respeta tu simetría natural." },
    { name: "Quiff Volumen", tag: "Clásico premium", desc: "Volumen frontal con lados limpios. Elegancia atemporal." },
  ],
  square: [
    { name: "Undercut Texturizado", tag: "Tendencia 2026", desc: "Contraste marcado que potencia tu mandíbula." },
    { name: "Buzz Cut con Diseño", tag: "Urbano", desc: "Minimalista con línea de diseño lateral. Puro carácter." },
    { name: "Slick Back Fade", tag: "Ejecutivo", desc: "Peinado hacia atrás con degradado. Autoridad total." },
  ],
  round: [
    { name: "Pompadour Fade", tag: "Tendencia 2026", desc: "Altura arriba para estilizar y alargar el rostro." },
    { name: "Faux Hawk", tag: "Atrevido", desc: "Volumen central con lados cortos. Alarga visualmente." },
    { name: "Curtain Fringe Alto", tag: "Joven", desc: "Cortina moderna con volumen. Estiliza el contorno." },
  ],
  heart: [
    { name: "Fringe Texturizado", tag: "Tendencia 2026", desc: "Flequillo que equilibra la frente. Suaviza facciones." },
    { name: "Fade + Barba Completa", tag: "Balance", desc: "Barba que compensa el mentón. Armonía perfecta." },
    { name: "Medio Largo con Textura", tag: "Relajado", desc: "Movimiento natural que equilibra proporciones." },
  ],
};

const shapeLabels: Record<Shape, string> = { oval: "Oval", square: "Cuadrado", round: "Redondo", heart: "Corazón" };

type Phase = "intro" | "analyzing" | "result";

export default function IdbotWidget() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [consent, setConsent] = useState(false);
  const [shape, setShape] = useState<Shape>("oval");
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => { setPhase("intro"); setConsent(false); setError(null); };

  const handleFile = async (file: File) => {
    if (!consent) { setError("Primero autoriza el uso de tu imagen."); return; }
    if (!file.type.startsWith("image/")) return;
    setError(null);
    setPhase("analyzing");

    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((res, rej) => {
        reader.onload = () => res((reader.result as string).split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

      const r = await fetch("/api/ai/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mediaType: file.type }),
      });

      const ct = r.headers.get("content-type") ?? "";
      if (r.ok && ct.includes("application/json")) {
        const data = await r.json();
        if (data.faceShape && trends[data.faceShape as Shape]) setShape(data.faceShape as Shape);
      }
      // Si la IA no está disponible, igual mostramos tendencias (forma oval por defecto)
      setPhase("result");
    } catch {
      setPhase("result");
    }
  };

  const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

  return (
    <>
      {/* Botón flotante */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir IDBOT, asesor de imagen"
          className="fixed bottom-5 right-5 z-[9990] flex items-center gap-2 pl-2 pr-4 py-2 rounded-full bg-[#0A0A0A] border border-[#D4AF37]/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#D4AF37] transition-all duration-300 group"
        >
          <span className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative w-9 h-9 rounded-full overflow-hidden bg-[#111] flex items-center justify-center">
            <Image src="/images/idbot.png" alt="IDBOT" width={36} height={36} className="object-contain" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0A0A0A]" />
          </span>
          <span className="relative text-white text-xs font-semibold" style={{ fontFamily: "var(--font-barlow)", letterSpacing: "0.05em" }}>
            Asesor IDBOT
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-5 right-5 z-[9990] w-[92vw] max-w-[380px] rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(16px)" }}>
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/8" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.12), transparent)" }}>
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#111] shrink-0">
              <Image src="/images/idbot.png" alt="IDBOT" width={40} height={40} className="object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold leading-none">IDBOT</p>
              <p className="text-[#D4AF37] text-[11px] mt-0.5" style={{ fontFamily: "var(--font-barlow)" }}>Asesor de imagen · En línea</p>
            </div>
            <button onClick={() => { setOpen(false); reset(); }} className="text-[#888] hover:text-white p-1" aria-label="Cerrar">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {/* INTRO */}
            {phase === "intro" && (
              <div className="space-y-4">
                <div className="bg-white/4 rounded-xl rounded-tl-none p-3">
                  <p className="text-white/90 text-sm leading-relaxed">
                    ¡Hola! 👋 Soy <span className="text-[#D4AF37] font-semibold">IDBOT</span>. Sube tu foto y te muestro <span className="text-white font-semibold">3 estilos en tendencia</span> que van con tu rostro.
                  </p>
                </div>

                {/* Consentimiento */}
                <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white/3 border border-white/8 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => { setConsent(e.target.checked); setError(null); }}
                    className="mt-0.5 accent-[#D4AF37] w-4 h-4 shrink-0"
                  />
                  <span className="text-[#aaa] text-[11px] leading-relaxed flex items-start gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-px" />
                    Autorizo a IDBARBER a usar mi foto <b className="text-white/80">únicamente</b> para generar recomendaciones de estilo. No se comparte con terceros.
                  </span>
                </label>

                <button
                  onClick={() => (consent ? fileRef.current?.click() : setError("Primero autoriza el uso de tu imagen."))}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-[0.15em] uppercase transition-all ${
                    consent ? "bg-[#D4AF37] text-black hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]" : "bg-white/5 text-[#666] cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  <Upload className="w-4 h-4" /> Subir mi foto
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

                {error && <p className="text-red-400 text-xs text-center">{error}</p>}

                {/* Domicilio */}
                <a href={waLink("Hola IDBARBER, quiero información sobre corte a domicilio 🏠✂️")} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 transition-colors">
                  <Home className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <div className="flex-1">
                    <p className="text-white text-xs font-semibold">También vamos a tu casa 🏠</p>
                    <p className="text-[#888] text-[11px]">Corte a domicilio · pídelo por WhatsApp</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </a>
              </div>
            )}

            {/* ANALYZING */}
            {phase === "analyzing" && (
              <div className="py-12 flex flex-col items-center text-center">
                <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin mb-4" />
                <p className="text-white text-sm font-medium">Analizando tu rostro…</p>
                <p className="text-[#888] text-xs mt-1">IDBOT está buscando tus mejores estilos</p>
              </div>
            )}

            {/* RESULT */}
            {phase === "result" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
                    Forma {shapeLabels[shape]} · 3 en tendencia
                  </span>
                </div>

                <div className="space-y-2.5">
                  {trends[shape].map((s, i) => (
                    <div key={s.name} className="p-3 rounded-xl bg-white/4 border border-white/8">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white font-semibold text-sm">{i + 1}. {s.name}</p>
                        <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded-full">{s.tag}</span>
                      </div>
                      <p className="text-[#999] text-[11px] leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="text-[#888] text-[11px] text-center italic">
                  ¿No te convence? Cuéntanos qué buscas y te asesoramos.
                </p>

                <div className="grid grid-cols-1 gap-2">
                  <Link href="/reservar?servicio=2" onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] text-black text-xs font-bold tracking-[0.15em] uppercase hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all"
                    style={{ fontFamily: "var(--font-barlow)" }}>
                    Reservar este corte <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a href={waLink("Hola IDBARBER, vi mis estilos con IDBOT y quiero un corte a domicilio 🏠✂️")} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#D4AF37]/5 transition-all"
                    style={{ fontFamily: "var(--font-barlow)" }}>
                    <Home className="w-3.5 h-3.5" /> Corte a domicilio
                  </a>
                  <button onClick={reset}
                    className="flex items-center justify-center gap-2 py-2.5 text-[#888] text-xs tracking-[0.15em] uppercase hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-barlow)" }}>
                    <MessageCircle className="w-3.5 h-3.5" /> Probar otra foto
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
