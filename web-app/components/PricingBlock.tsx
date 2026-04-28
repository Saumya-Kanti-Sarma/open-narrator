/**
 * Purpose: Pricing section showing three lifetime plans: Base, Standard, and Pro
 * Used in: app/page.tsx
 * Dependencies: Button element, react-icons
 */

"use client";

import { MdCheck } from "react-icons/md";
import Button from "./elements/Button";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import WaveBackground from "./elements/WaveBackground";

type PlanTier = "base" | "standard" | "pro";

interface Plan {
  name: string;
  badge: string | null;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  tier: PlanTier;
  disabled: boolean;
}

const plans: Plan[] = [
  {
    name: "Base",
    badge: "Beta",
    price: "Free",
    priceNote: "Lifetime, no updates",
    description: "Get started with no cost. Core voice generation, forever.",
    features: [
      "Unlimited single speaker voice generation",
      "Unlimited multi speaker voice generation",
      "Parallel processing",
      "Audio streaming from PDFs, docs, text files",
      "Unlimited audio length",
      "Video editing toolkit",
      "Full length captions",
      "Rephrase and punch up sentences",
    ],
    cta: "Get Started Free",
    tier: "base",
    disabled: false,
  },
  {
    name: "Standard",
    badge: "Most Popular",
    price: "₹299",
    priceNote: "One-time lifetime access",
    description: "Everything you need for serious audio production.",
    features: [
      "Unlimited single speaker voice generation",
      "Unlimited multi speaker voice generation",
      "Parallel processing",
      "Audio streaming from PDFs, docs, text files",
      "Unlimited audio length",
    ],
    cta: "Get Lifetime Access",
    tier: "standard",
    disabled: true,
  },
  {
    name: "Pro",
    badge: "Best Value",
    price: "₹399",
    priceNote: "One-time lifetime access",
    description: "Full power for creators who need video tools too.",
    features: [
      "Unlimited single speaker voice generation",
      "Unlimited multi speaker voice generation",
      "Parallel processing",
      "Audio streaming from PDFs, docs, text files",
      "Unlimited audio length",
      "Video editing toolkit",
      "Full length captions",
      "Rephrase and punch up sentences",
    ],
    cta: "Get Pro Access",
    tier: "pro",
    disabled: true,
  },
];

const tierStyles: Record<PlanTier, {
  card: string;
  badge: string;
  price: string;
  checkIcon: string;
  button: "primary" | "secondary";
}> = {
  base: {
    card: "bg-[var(--bg-dark)] border-white/5",
    badge: "bg-[var(--warning)] text-[var(--bg-dark)]",
    price: "text-[var(--gray-300)]",
    checkIcon: "text-[var(--success)]",
    button: "secondary",
  },
  standard: {
    card: [
      "border border-[var(--warning)]/40",
      "bg-gradient-to-b from-[var(--warning)]/10 to-[var(--bg-dark)]",
      "shadow-[0_0_48px_rgba(245,158,11,0.12)]",
    ].join(" "),
    badge: "bg-[var(--warning)] text-[var(--bg-dark)]",
    price: "text-[var(--warning)]",
    checkIcon: "text-[var(--warning)]",
    button: "primary",
  },
  pro: {
    card: [
      "border border-[var(--bg-light)]/30",
      "bg-gradient-to-b from-[var(--bg-light)]/8 to-[var(--bg-dark)]",
      "shadow-[0_0_48px_rgba(255,232,201,0.08)]",
    ].join(" "),
    badge: "bg-[var(--bg-light)] text-[var(--text-primary)]",
    price: "text-[var(--bg-light)]",
    checkIcon: "text-[var(--bg-light)]",
    button: "secondary",
  },
};

export default function PricingBlock() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <div className="relative overflow-hidden">
      <WaveBackground />
      <section
        id="pricing"
        className="relative z-10 py-24 max-w-[1200px] mx-auto px-6"
        aria-labelledby="pricing-heading"
      >
        <div ref={headingRef} className="reveal text-center mb-16">
          <h2
            id="pricing-heading"
            className="text-3xl md:text-4xl font-normal text-[var(--bg-light)] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Plans and Pricing
          </h2>
          <p
            className="text-[var(--gray-300)] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Currently we are launching the beta state which has all the features of our pro plan
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => {
            const styles = tierStyles[plan.tier];
            return (
              <article
                key={plan.name}
                aria-disabled={plan.disabled}
                className={`stagger-item reveal-pop relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${plan.disabled
                  ? `bg-[var(--bg-dark)] border-white/5 opacity-20 grayscale pointer-events-none select-none${plan.tier !== "base" ? " max-[448px]:hidden" : ""}`
                  : styles.card
                  } h-full`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${styles.badge}`}
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <h3
                  className={`text-xl font-bold text-[var(--bg-light)] mb-1 ${plan.disabled ? "opacity-20" : ''}`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {plan.name}
                </h3>

                <div className={`mb-1 ${plan.disabled ? "opacity-20" : ''}`}>
                  <p
                    className={`text-3xl font-bold ${plan.disabled ? "text-[var(--gray-700)] opacity-20" : styles.price}`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {plan.price}
                  </p>
                  <p
                    className={`text-xs text-[var(--gray-700)] mt-0.5 ${plan.disabled ? "opacity-20" : ''}`}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {plan.priceNote}
                  </p>
                </div>

                <p
                  className={`text-sm text-[var(--gray-300)] mb-6 mt-3 ${plan.disabled ? "opacity-20" : ''}`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {plan.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-start gap-2 text-sm text-[var(--gray-300)] ${plan.disabled ? "opacity-20" : ''}`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <MdCheck
                        size={16}
                        className={`${plan.disabled ? "text-[var(--gray-700)]" : styles.checkIcon} shrink-0 mt-0.5`}
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={styles.button}
                  className={`w-full justify-center ${plan.disabled ? "opacity-20" : ''}`}
                  ariaLabel={plan.cta}
                  onClick={() =>
                    document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  {plan.cta}
                </Button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
