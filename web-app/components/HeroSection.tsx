/**
 * Purpose: Landing page hero section with headline, subheadline, CTAs and highlight badges
 * Used in: app/page.tsx
 * Dependencies: Button element, Badge element, HalftoneBackground element, VoiceDemo, react-icons
 */

"use client";

import { useState } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { MdLock, MdAllInclusive } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";
import Button from "./elements/Button";
import Badge from "./elements/Badge";
import HalftoneBackground from "./elements/HalftoneBackground";
import VoiceDemo from "./VoiceDemo";
import Image from "next/image";

/**
 * Component: HeroSection
 * Description: Full-width hero with gradient glow, headline, subtext, CTAs and feature badges
 * Props: none
 */

const highlights = [
  { icon: <BsLightningChargeFill size={30} color="orange" />, label: "Runs locally (8GB RAM min)" },
  { icon: <MdLock size={30} color="orange" />, label: "100% Private" },
  { icon: <HiMicrophone size={30} color="orange" />, label: "20+ Voices" },
  { icon: <MdAllInclusive size={30} color="orange" />, label: "Unlimited Generation" },
];

export default function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        aria-label="Hero"
      >
        <HalftoneBackground />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6 sm:gap-8">

          {/* Logo lockup */}
          <div className="flex flex-col items-center gap-2 -mt-4">
            <Image
              src="/open-narrator-full.svg"
              width={420}
              height={160}
              alt="Open Narrator logo"
              style={{ width: "min(320px, 75vw)", height: "auto" }}
            />
          </div>

          {/* Tagline */}
          <p
            className="text-base sm:text-xl md:text-2xl font-normal text-[var(--warning)] tracking-wide -mt-2"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            "Text-To-Voice and Voice-To-Content"
          </p>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-2xl max-w-3xl">
            Open Narrator is a <b>software</b> built for content creators that allows them to create AI generated voices and turn that voice into different content formats like <b>short videos</b> for Instagram, YouTube or TikTok. <b>Long videos</b> like podcasts, bedtime stories, movie explanations. <b>Audiobooks</b> and many more...
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none">
            <Button
              variant="primary"
              ariaLabel="Get early access"
              onClick={() =>
                document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 sm:px-10 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
            >
              Get Early Access
            </Button>
            <Button
              variant="secondary"
              ariaLabel="Get a demo"
              onClick={() => setDemoOpen(true)}
              className="px-8 py-3 sm:px-10 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
            >
              Get A Demo
            </Button>
          </div>

          {/* Highlight badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {highlights.map((h) => (
              <Badge key={h.label} className="text-sm sm:text-base px-2 sm:px-3 py-1.5 sm:py-2">
                {h.icon}
                {h.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <VoiceDemo isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
