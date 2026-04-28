/**
 * Purpose: "Why Open Narrator" section highlighting key differentiators
 * Used in: app/page.tsx
 * Dependencies: react-icons
 */

import { MdMoneyOff, MdLock, MdBuild } from "react-icons/md";
import { IconType } from "react-icons";

/**
 * Component: WhySection
 * Description: Three-column grid of differentiator cards
 * Props: none
 */

const reasons: { Icon: IconType; title: string; description: string }[] = [
  {
    Icon: MdMoneyOff,
    title: "No Token-Based Pricing",
    description:
      "Pay once, generate forever. No per-word charges, no surprise bills. Your creativity should not have a meter running.",
  },
  {
    Icon: MdLock,
    title: "Privacy-First Architecture",
    description:
      "Your data never leaves your system. No cloud dependency, no tracking, no storage. Fully local processing.",
  },
  {
    Icon: MdBuild,
    title: "Built for Creators",
    description:
      "Not a generic API. Parallel processing, group speaking, emotions, and an integrated TTS to Video workflow.",
  },
];

export default function WhySection() {
  return (
    <section className="py-24 bg-[#18181b]" aria-labelledby="why-heading">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            id="why-heading"
            className="text-3xl md:text-4xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Why Open Narrator is different
          </h2>
          <p
            className="text-[#a1a1aa] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We built this because existing tools are either too expensive, too closed, or not
            designed for real creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map(({ Icon, title, description }) => (
            <article
              key={title}
              className="p-8 rounded-2xl bg-[#282828] border border-white/5 hover:border-[#4F46E5]/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-5 text-[#4F46E5]" aria-hidden="true">
                <Icon size={32} />
              </div>
              <h3
                className="text-lg font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {title}
              </h3>
              <p
                className="text-sm text-[#a1a1aa] leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
