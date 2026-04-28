/**
 * Purpose: Grid section showcasing all core product features
 * Used in: app/page.tsx
 * Dependencies: FeatureCard component, react-icons
 */

"use client";

import { PiMonitorPlayFill } from "react-icons/pi";
import { RiVoiceAiFill } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { IconType } from "react-icons";
import FeatureCard from "./elements/FeatureCard";
import Image from "next/image";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import GridBackground from "./elements/GridBackground";

const features: { Icon: IconType; title: string; bullets: string[] }[] = [
  {
    Icon: RiVoiceAiFill,
    title: "Natural Voice",
    bullets: [
      "20+ high quality voices",
      "American, British, Indian English and Hindi",
      "2 advanced emotion-enabled voices",
    ],
  },
  {
    Icon: BsLightningChargeFill,
    title: "Parallel Processing",
    bullets: [
      "Generate multiple voice outputs simultaneously",
      "Optimized for speed and batch generation",
      "Faster rendering for long scripts",
    ],
  },
  {
    Icon: HiUserGroup,
    title: "Group Speaking",
    bullets: [
      "Multiple voices in a single script",
      "Perfect for dialogues and podcasts",
      "Ideal for storytelling and audiobooks",
    ],
  },
  {
    Icon: PiMonitorPlayFill,
    title: "Inbuild Editor",
    bullets: [
      "Convert Audios into transcripts",
      "Generate Captions",
      "Edit your narrated audios to make postable videos",
    ],
  },
];

export default function FeaturesSection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    /* full-width wrapper holds the canvas */
    <div className="relative overflow-hidden">
      <GridBackground />

      <section
        id="features"
        className="relative z-10 py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6"
        aria-labelledby="features-heading"
      >
        <div ref={headingRef} className="reveal text-center mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="grayscale-100 opacity-70"
              style={{ width: "clamp(60px, 10vw, 100px)", height: "auto" }}
            />
            <div className="max-w-xs sm:max-w-sm text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-1">Core Features</h1>
              <p
                className="text-(--warning) mx-auto sm:mx-0"
                style={{ fontFamily: "var(--font-body)" }}>
                Built for creators who need excellent AI voice
              </p>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto place-items-center"
        >
          {features.map((feature) => (
            <div key={feature.title} className="stagger-item reveal w-full">
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
