"use client";

interface LogoIDProps {
  /** Altura del logo en px (el ancho se calcula proporcional) */
  size?: number;
  className?: string;
  /** Color del wordmark. Por defecto blanco. */
  color?: string;
}

/**
 * Wordmark "Idbarber" — letras blancas, estilo bold itálico.
 * Inspirado en el logotipo de marca: I mayúscula + resto minúscula, cursiva pesada.
 */
export default function LogoID({ size = 40, className = "", color = "#FFFFFF" }: LogoIDProps) {
  // Relación de aspecto del wordmark ≈ 4.4:1
  const h = size;
  const w = size * 4.4;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 440 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Idbarber"
      role="img"
    >
      <text
        x="0"
        y="78"
        fill={color}
        style={{
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: "92px",
          letterSpacing: "-3px",
        }}
      >
        Idbarber
      </text>
    </svg>
  );
}
