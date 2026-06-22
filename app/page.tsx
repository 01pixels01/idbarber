"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroV2 from "@/components/home/HeroV2";
import Stats from "@/components/home/Stats";
import Services from "@/components/home/Services";
import ElRitual from "@/components/home/ElRitual";
import BeforeAfter from "@/components/home/BeforeAfter";
import Barbers from "@/components/home/Barbers";
import BlackCard from "@/components/home/BlackCard";
import AIStyler from "@/components/home/AIStyler";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

const CinematicIntro = dynamic(() => import("@/components/ui/CinematicIntro"), {
  ssr: false,
});

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <CinematicIntro onComplete={() => setIntroComplete(true)} />
      <div
        className="transition-opacity duration-700"
        style={{ opacity: introComplete ? 1 : 0, pointerEvents: introComplete ? "auto" : "none" }}
      >
        <Navbar />
        <main>
          <HeroV2 />
          <Stats />
          <Services />
          <ElRitual />
          <BeforeAfter />
          <Barbers />
          <AIStyler />
          <BlackCard />
          <Testimonials />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
