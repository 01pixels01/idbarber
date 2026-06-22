"use client";

interface LogoIDProps {
  size?: number;
  className?: string;
}

export default function LogoID({ size = 40, className = "" }: LogoIDProps) {
  const w = size * 0.8;
  const h = size;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IDBARBER logo"
    >
      <defs>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0D060" />
          <stop offset="35%" stopColor="#D4AF37" />
          <stop offset="65%" stopColor="#A8861A" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter="url(#logoShadow)">
        {/* ── D letter ── */}
        <path
          d="M 52,22 L 52,16 Q 52,12 56,12 L 95,12 Q 138,12 146,52 Q 152,76 146,112 Q 138,152 95,158 L 56,158 Q 52,158 52,154 L 52,148 L 48,148 L 48,154 Q 48,164 58,164 L 95,164 Q 152,164 162,118 Q 170,86 162,54 Q 152,10 95,10 L 56,10 Q 44,10 44,22 L 44,148 L 52,148 Z"
          fill="url(#logoGold)"
        />
        {/* D inner cutout */}
        <path
          d="M 64,26 L 95,26 Q 130,26 138,58 Q 144,80 138,114 Q 130,144 95,144 L 64,144 Z"
          fill="#0A0A0A"
        />
        {/* D inner ring */}
        <path
          d="M 70,34 L 95,34 Q 122,34 128,62 Q 133,80 128,112 Q 122,136 95,136 L 70,136 Z"
          fill="url(#logoGold)"
          opacity={0.9}
        />
        {/* D inner counter */}
        <path
          d="M 76,46 L 95,46 Q 114,46 118,66 Q 122,80 118,108 Q 114,126 95,126 L 76,126 Z"
          fill="#0A0A0A"
        />

        {/* ── I stem ── */}
        <rect x="58" y="18" width="14" height="138" rx="1" fill="url(#logoGold)" />

        {/* Top serif bar */}
        <rect x="38" y="10" width="54" height="13" rx="5" fill="url(#logoGold)" />
        {/* Top flourish left */}
        <path d="M 58,10 C 50,10 38,4 38,10 C 38,16 46,16 58,18 Z" fill="url(#logoGold)" />
        {/* Top flourish right */}
        <path d="M 72,10 C 80,10 92,4 92,10 C 92,16 84,16 72,18 Z" fill="url(#logoGold)" />
        {/* Top spike */}
        <polygon points="65,2 68,10 72,10 75,2 70,-2 65,-2" fill="url(#logoGold)" />

        {/* Bottom serif bar */}
        <rect x="38" y="151" width="54" height="13" rx="5" fill="url(#logoGold)" />
        {/* Bottom flourish left */}
        <path d="M 58,164 C 50,164 38,170 38,164 C 38,158 46,158 58,156 Z" fill="url(#logoGold)" />
        {/* Bottom flourish right */}
        <path d="M 72,164 C 80,164 92,170 92,164 C 92,158 84,158 72,156 Z" fill="url(#logoGold)" />

        {/* Bottom stem + diamond */}
        <rect x="62" y="163" width="6" height="20" rx="1" fill="url(#logoGold)" />
        <polygon points="65,186 60,196 65,200 70,196" fill="url(#logoGold)" />

        {/* Highlights */}
        <rect x="58" y="18" width="3" height="138" rx="1" fill="#FFFFFF" opacity={0.15} />
        <rect x="39" y="11" width="52" height="3" rx="2" fill="#FFFFFF" opacity={0.25} />
      </g>
    </svg>
  );
}
