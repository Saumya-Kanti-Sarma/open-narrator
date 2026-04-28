/**
 * Purpose: Landing page hero section with headline, subheadline, CTAs and highlight badges
 * Used in: app/page.tsx
 * Dependencies: Button element, Badge element, HalftoneBackground element, react-icons
 */

"use client";

import { BsLightningChargeFill } from "react-icons/bs";
import { MdLock, MdAllInclusive } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";
import Button from "./elements/Button";
import Badge from "./elements/Badge";
import HalftoneBackground from "./elements/HalftoneBackground";
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
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      <HalftoneBackground />

      <div className="relative z-10 max-w-300 mx-auto px-6 text-center flex flex-col items-center gap-8">

        {/* Pre-headline badge */}
        <div className="flex justify-between items-center">

          {/* Logo lockup — plane + wordmark stacked tightly */}
          <div className="flex flex-col items-center gap-2 -mt-4">
            <Image
              src="/open-narrator-full.svg"
              width={420}
              height={160}
              alt="Open Narrator logo"
            />
          </div>
        </div>

        {/* Tagline — sits just below logo as part of headline flow */}
        <p
          className="text-xl md:text-2xl font-normal text-[var(--warning)] tracking-wide -mt-2"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
        >
          "Text-To-Voice and Voice-To-Content"
        </p>

        {/* Subheadline */}
        <p className="text-2xl">
          Open Narrator is a <b >software</b> build for content creators that allows them to create AI generated voices and turn that voice into diffrent content formats like <b >short videos </b> for Instagram, YouTube or TikTok. <b >Long videos </b>  like podcasts, bedtime stories, movie explanation. <b >Audiobooks</b>  and many more...
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button
            variant="primary"
            ariaLabel="Get early access"
            onClick={() =>
              document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 text-base w-full sm:w-auto"
          >
            Get Early Access
          </Button>
          <Button
            variant="secondary"
            ariaLabel="Get a demo"
            onClick={() =>
              document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 text-base w-full sm:w-auto"
          >
            Get A Demo
          </Button>
        </div>

        {/* Highlight badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {highlights.map((h) => (
            <Badge key={h.label}>
              {h.icon}
              {h.label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}