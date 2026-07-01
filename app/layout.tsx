import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import PremiumCursor from "@/components/ui/PremiumCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas", display: "swap" });
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://idbarber.co";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IDBARBER — No cortamos cabello. Construimos presencia.",
    template: "%s — IDBARBER",
  },
  description:
    "Barbería premium en Bogotá. Reserva tu experiencia online, elige tu maestro barbero y transforma tu imagen con IA.",
  keywords: [
    "barbería premium Bogotá",
    "IDBARBER",
    "corte de cabello Bogotá",
    "barbería de lujo",
    "reserva cita barbero",
    "barbería online Colombia",
    "fade Bogotá",
    "barbero profesional",
  ],
  authors: [{ name: "IDBARBER" }],
  creator: "IDBARBER",
  openGraph: {
    title: "IDBARBER — Construimos Presencia",
    description: "No cortamos cabello. Construimos presencia. Barbería premium en Bogotá.",
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "IDBARBER",
    images: [{ url: "/images/og-image.svg", width: 1200, height: 630, alt: "IDBARBER — Barbería Premium Bogotá" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IDBARBER — Construimos Presencia",
    description: "Barbería premium en Bogotá. Reserva online en 2 minutos.",
    images: ["/images/og-image.svg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/images/idbot.png",
    apple: "/images/idbot.png",
    shortcut: "/images/idbot.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "IDBARBER",
    description: "Barbería premium en Bogotá. No cortamos cabello. Construimos presencia.",
    url: siteUrl,
    telephone: "+57-300-000-0000",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "08:00", closes: "18:00" },
    ],
    priceRange: "$$",
    currenciesAccepted: "COP",
    paymentAccepted: "Cash, Credit Card, Nequi, PSE",
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "320" },
  };

  return (
    <ClerkProvider>
      <html
        lang="es"
        className={`${inter.variable} ${bebas.variable} ${barlow.variable}`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body className="bg-black text-white antialiased min-h-screen overflow-x-hidden">
          <CartProvider>
            <PremiumCursor />
            {children}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
