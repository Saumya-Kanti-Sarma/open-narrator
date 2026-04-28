/**
 * Purpose: Grid section showcasing all core product features
 * Used in: app/page.tsx
 * Dependencies: FeatureCard component, react-icons
 */

import { PiMonitorPlayFill, PiTagFill } from "react-icons/pi";
import { SiAudioboom } from "react-icons/si";
import { RiEqualizerFill, RiVoiceAiFill } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { MdTheaterComedy } from "react-icons/md";
import { IconType } from "react-icons";
import FeatureCard from "./elements/FeatureCard";
import Image from "next/image";

/**
 * Component: FeaturesSection
 * Description: Renders a 4-column grid of feature cards
 * Props: none
 */

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
      "Edit your narrated audios to make postable videos ",
    ],
  }
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 max-w-300 mx-auto px-6"
      aria-labelledby="features-heading"
    >
      <div className="text-center mb-16">
        <div className="flex justify-center items-center gap-5">
          <Image src={"/logo.svg"} alt="logo" width={100} height={100} className="grayscale-100 opacity-70" />
          <div className="max-w-100">
            <h1 className="text-left text-5xl mb-1">Core Features</h1>
            <p
              className="text-(--warning) max-w-xl mx-auto text-left"
              style={{ fontFamily: "var(--font-body)" }}>
              Built for creators who need excellent AI voice
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-300 mx-auto place-items-center lg:place-items-start">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
