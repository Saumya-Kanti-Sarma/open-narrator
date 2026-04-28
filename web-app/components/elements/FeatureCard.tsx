/**
 * Purpose: Reusable card for displaying a single feature
 * Used in: FeaturesSection
 * Dependencies: react-icons
 */

import { IconType } from "react-icons";

/**
 * Component: FeatureCard
 * Description: Renders a feature card with icon, title and description bullets
 * Props:
 * - Icon: IconType → react-icons icon component
 * - title: string → feature name
 * - bullets: string[] → list of feature details
 */

interface FeatureCardProps {
  Icon: IconType;
  title: string;
  bullets: string[];
}

export default function FeatureCard({ Icon, title, bullets }: FeatureCardProps) {
  return (
    <article className="w-full max-w-sm sm:max-w-none h-auto min-h-48 group relative p-5 sm:px-6 mx-1 rounded-2xl bg-[#282828] border border-white/5 hover:border-(--warning)/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,70,229,0.1)] flex flex-col">
      <div className="flex justify-center items-center text-(--warning) gap-2 mb-2" aria-hidden="true">
        <Icon size={36} />
        <h3
          className="text-base sm:text-lg font-semibold text-white text-center"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {title}
        </h3>
      </div>
      <hr />
      <br />

      <ul className="space-y-2 flex-1">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-[#a1a1aa]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span className="mt-0.5 text-(--warning) shrink-0 text-xs" aria-hidden="true">
              ✦
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}
