"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Cpu, Sparkles, ArrowRight } from "lucide-react";

type FaceShape = "oval" | "square" | "round" | "heart";

interface AIResult {
  faceShape: FaceShape;
  faceShapeLabel: string;
  cut: string;
  beard: string;
  products: string[];
  reasoning: string;
}

const shapes: { id: FaceShape; label: string }[] = [
  { id: "oval", label: "Oval" },
  { id: "square", label: "Cuadrado" },
  { id: "round", label: "Redondo" },
  { id: "heart", label: "Corazón" },
];

const fallbackRecommendations: Record<FaceShape, AIResult> = {
  oval: {
    faceShape: "oval",
    faceShapeLabel: "Oval",
    cut: "Fade Clásico / Quiff",
    beard: "Barba media definida",
    products: ["Pomada Mate Premium", "Aceite de Barba"],
    reasoning: "Tu forma oval es versátil. Prácticamente cualquier estilo funciona, pero el quiff alto con fade lateral realza tu simetría perfecta.",
  },
  square: {
    faceShape: "square",
    faceShapeLabel: "Cuadrado",
    cut: "Undercut / Texturizado",
    beard: "Barba corta y definida",
    products: ["Cera Texturizante", "Aceite de Barba Premium"],
    reasoning: "La mandíbula cuadrada proyecta autoridad. Un corte texturizado arriba con lados limpios equilibra sin ocultar esa presencia natural.",
  },
  round: {
    faceShape: "round",
    faceShapeLabel: "Redondo",
    cut: "Pompadour / Alto en la parte superior",
    beard: "Barba mediana con líneas verticales",
    products: ["Pomada Brillante", "Aceite Nutritivo Capilar"],
    reasoning: "El volumen vertical alarga y afina visualmente. Evita cortes con volumen lateral que redondeen aún más el contorno.",
  },
  heart: {
    faceShape: "heart",
    faceShapeLabel: "Corazón",
    cut: "Desvanecido en los lados / Fringe",
    beard: "Barba completa para equilibrar el mentón",
    products: ["Pomada Mate Premium", "Shampoo Carbón"],
    reasoning: "La frente más ancha pide equilibrio hacia abajo. La barba llena el área del mentón para crear armonía visual.",
  },
};

export default function AIStyler() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<"idle" | "analyzing" | "result">("idle");
  const [selected, setSelected] = useState<FaceShape>("oval");
  const [progress, setProgress] = useState(0);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAIAnalysis, setIsAIAnalysis] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPhase("analyzing");
    setProgress(0);
    setError(null);
    setIsAIAnalysis(true);

    // Animate progress while waiting for API
    let fakeProgress = 0;
    const interval = setInterval(() => {
      fakeProgress += Math.random() * 6 + 2;
      if (fakeProgress >= 90) {
        clearInterval(interval);
        fakeProgress = 90;
      }
      setProgress(fakeProgress);
    }, 180);

    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const mediaType = file.type as "image/jpeg" | "image/png" | "image/gif" | "image/webp";

      const res = await fetch("/api/ai/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mediaType }),
      });

      clearInterval(interval);

      // Lectura robusta: si la respuesta no es JSON válido, no crashea
      const contentType = res.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");

      if (!res.ok || !isJson) {
        const data = isJson ? await res.json().catch(() => null) : null;
        throw new Error(
          data?.error ?? "El análisis con IA no está disponible. Elige tu forma facial manualmente abajo."
        );
      }

      const result: AIResult = await res.json();
      setProgress(100);
      setAiResult(result);
      setSelected(result.faceShape);
      setTimeout(() => setPhase("result"), 400);
    } catch (err) {
      clearInterval(interval);
      setError(
        err instanceof Error
          ? err.message
          : "El análisis con IA no está disponible. Elige tu forma facial manualmente abajo."
      );
      setPhase("idle");
      setIsAIAnalysis(false);
    }
  };

  const currentResult = aiResult ?? fallbackRecommendations[selected];

  return (
    <section
      id="ia-styler"
      className="relative py-36 px-4 sm:px-6 lg:px-8 bg-[#060606] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-medium px-4 py-2 rounded-full mb-6">
            <Image src="/images/idbot.png" alt="IDBOT" width={16} height={16} className="rounded-full" />
            IDBOT · Inteligencia Artificial
          </div>
          <h2
            className="text-white leading-none uppercase mb-4"
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px,7vw,96px)", letterSpacing: "0.02em" }}
          >
            TU ESTILO{" "}
            <span style={{ WebkitTextStroke: "1.5px #D4AF37", color: "transparent" }}>PERFECTO</span>
          </h2>
          <p className="text-[#888] max-w-md mx-auto" style={{ fontFamily: "var(--font-barlow)", fontWeight: 300 }}>
            Nuestra IA analiza tu forma facial y recomienda el corte, barba y productos ideales para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — uploader */}
          <div>
            {phase === "idle" && (
              <div className="space-y-6">
                {/* Drop zone */}
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) handleFile(file);
                  }}
                  className="relative border border-dashed border-[#D4AF37]/25 rounded-2xl p-16 text-center cursor-pointer hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/3 transition-all duration-300 group"
                >
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: "inset 0 0 40px rgba(212,175,55,0.05)" }} />
                  <Upload className="w-10 h-10 text-[#D4AF37]/40 mx-auto mb-4 group-hover:text-[#D4AF37]/70 transition-colors" />
                  <p className="text-white/60 text-sm mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
                    Sube tu foto o arrastra aquí
                  </p>
                  <p className="text-[#555] text-xs" style={{ fontFamily: "var(--font-barlow)" }}>
                    JPG, PNG · Máximo 10MB
                  </p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                  />
                </div>

                {/* OR manual selection */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-[#555] text-xs" style={{ fontFamily: "var(--font-barlow)" }}>o elige tu forma</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center py-2">{error}</p>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {shapes.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelected(s.id); setAiResult(null); setIsAIAnalysis(false); setPhase("result"); }}
                      className={`py-4 rounded-xl border text-sm font-medium tracking-wider uppercase transition-all duration-200 ${
                        selected === s.id
                          ? "border-[#D4AF37] bg-[#D4AF37]/8 text-[#D4AF37]"
                          : "border-white/8 text-[#888] hover:border-[#D4AF37]/30 hover:text-[#D4AF37]"
                      }`}
                      style={{ fontFamily: "var(--font-barlow)" }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {phase === "analyzing" && (
              <div className="border border-[#D4AF37]/20 rounded-2xl p-12 text-center">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/20" />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-t-[#D4AF37] animate-spin"
                    style={{ borderColor: "transparent transparent transparent #D4AF37" }}
                  />
                  <Cpu className="absolute inset-0 m-auto w-8 h-8 text-[#D4AF37]" />
                </div>
                <p className="text-white font-medium mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
                  Analizando tu imagen
                </p>
                <p className="text-[#888] text-sm mb-6">Detectando forma facial, características...</p>

                {/* Progress bar */}
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F5E070] transition-all duration-200 rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-[#D4AF37] text-xs mt-2">{Math.min(Math.round(progress), 100)}%</p>
              </div>
            )}
          </div>

          {/* Right — result */}
          {phase === "result" ? (
            <div className="relative bg-[#111111] border border-[#D4AF37]/20 rounded-2xl overflow-hidden">
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              <div className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
                    Análisis completado · Forma {currentResult.faceShapeLabel}
                  </span>
                  {isAIAnalysis && (
                    <span className="ml-auto text-[10px] bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] px-2 py-0.5 rounded-full" style={{ fontFamily: "var(--font-barlow)" }}>
                      IA Real
                    </span>
                  )}
                </div>

                {/* Recommendations */}
                <div className="space-y-5 mb-7">
                  <div className="p-5 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/15">
                    <p className="text-[#D4AF37] text-[10px] tracking-[0.3em] uppercase mb-2">Corte ideal</p>
                    <p className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}>
                      {currentResult.cut}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/3 border border-white/8">
                    <p className="text-[#888] text-[10px] tracking-[0.3em] uppercase mb-2">Barba recomendada</p>
                    <p className="text-white font-medium">{currentResult.beard}</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/3 border border-white/8">
                    <p className="text-[#888] text-[10px] tracking-[0.3em] uppercase mb-2">Productos ideales</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {currentResult.products.map((p) => (
                        <span key={p} className="text-[#D4AF37]/80 text-xs border border-[#D4AF37]/20 px-3 py-1 rounded-full">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[#666] text-xs leading-relaxed mb-7 italic" style={{ fontFamily: "var(--font-barlow)" }}>
                  &ldquo;{currentResult.reasoning}&rdquo;
                </p>

                <div className="flex gap-3">
                  <a
                    href={`/reservar?servicio=2`}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] text-black py-4 text-xs font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_24px_rgba(212,175,55,0.4)] transition-all duration-300"
                    style={{ clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))", fontFamily: "var(--font-barlow)" }}
                  >
                    Reservar este estilo <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => { setPhase("idle"); setAiResult(null); setIsAIAnalysis(false); }}
                    className="px-5 py-4 border border-white/10 text-[#888] text-xs tracking-[0.2em] uppercase hover:border-white/25 transition-all rounded"
                    style={{ fontFamily: "var(--font-barlow)" }}
                  >
                    Nueva
                  </button>
                </div>
              </div>
            </div>
          ) : phase === "idle" ? (
            <div className="hidden lg:block">
              {/* IDBOT — asistente de IA */}
              <div className="relative h-full min-h-[420px] border border-[#D4AF37]/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#060606]" />
                {/* Glow detrás de IDBOT */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px]" />
                {/* Scan lines */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 h-px bg-[#D4AF37]/8"
                    style={{ top: `${15 + i * 14}%` }}
                  />
                ))}
                {/* IDBOT flotando */}
                <div className="relative z-10 animate-float">
                  <Image
                    src="/images/idbot.png"
                    alt="IDBOT — Asistente de IA de IDBARBER"
                    width={220}
                    height={330}
                    className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </div>
                <div className="relative z-10 text-center mt-4">
                  <p className="text-white text-sm font-semibold tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
                    Hola, soy IDBOT
                  </p>
                  <p className="text-[#888] text-xs mt-1" style={{ fontFamily: "var(--font-barlow)" }}>
                    Sube tu foto y encuentro tu estilo perfecto
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
