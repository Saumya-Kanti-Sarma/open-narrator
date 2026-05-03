/**
 * Purpose: Pricing page — dedicated plans and pricing breakdown
 * Route: /pricing
 */

import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import PricingBlock from "@/components/PricingBlock";
import { MdCheck, MdClose } from "react-icons/md";

export const metadata: Metadata = {
  title: "Open Narrator Pricing",
  description:
    "Open Narrator is free during beta with full Pro features. No subscription, no per-token cost, no cloud. One-time lifetime plans available after beta.",
  keywords: [
    "Open Narrator Pricing",
    "Open Narrator Plans",
    "Open Narrator Free Plans",
    "AI voice generator free",
    "free text to speech software",
    "lifetime AI voice tool",
    "no subscription AI voice",
    "free AI voice generator lifetime",
    "ElevenLabs free alternative",
    "offline TTS pricing",
    "one time AI voice purchase",
  ],
  alternates: { canonical: "https://opennarrator.com/pricing" },
  openGraph: {
    title: "Open Narrator Pricing",
    description:
      "Open Narrator is free during beta with full Pro features. No subscription, no per-token cost, no cloud. One-time lifetime plans available after beta.",
    url: "https://opennarrator.com/pricing",
    type: "website",
  },
};

const comparison = [
  { feature: "Unlimited voice generation", base: true, standard: true, pro: true },
  { feature: "20+ AI voices", base: true, standard: true, pro: true },
  { feature: "Multi-speaker scripts", base: true, standard: true, pro: true },
  { feature: "Parallel processing", base: true, standard: true, pro: true },
  { feature: "PDF & document narration", base: true, standard: true, pro: true },
  { feature: "Unlimited audio length", base: true, standard: true, pro: true },
  { feature: "Future updates", base: false, standard: true, pro: true },
];

// { feature: "Built-in video editor", base: true, standard: false, pro: true },
// { feature: "Caption generation", base: true, standard: false, pro: true },
// { feature: "Rephrase & punch up sentences", base: true, standard: false, pro: true },

function CheckCell({ value }: { value: boolean }) {
  return value ? (
    <MdCheck size={18} className="text-[#16A34A] mx-auto" aria-label="Included" />
  ) : (
    <MdClose size={18} className="text-[#52525b] mx-auto" aria-label="Not included" />
  );
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Hero ── */}
        <section
          className="relative pt-32 pb-16 px-4 sm:px-6 text-center overflow-hidden"
          aria-labelledby="pricing-hero-heading"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <p
              className="text-[#F59E0B] text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Simple, honest pricing
            </p>
            <h1
              id="pricing-hero-heading"
              className="text-4xl sm:text-5xl font-normal text-[#FFE8C9] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Free During Beta.{" "}
              <span className="text-[#F59E0B]">Forever Affordable.</span>
            </h1>
            <p
              className="text-lg text-[#a1a1aa] leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              During the beta period, all Pro features are available for free. No credit card,
              no subscription, no per-token billing — ever.
            </p>
          </div>
        </section>

        {/* ── Pricing cards (reuse existing component) ── */}
        <PricingBlock />

        {/* ── Comparison table ── */}
        <section
          className="py-16 sm:py-24 max-w-[900px] mx-auto px-4 sm:px-6"
          aria-labelledby="comparison-heading"
        >
          <h2
            id="comparison-heading"
            className="text-2xl sm:text-3xl font-normal text-[#FFE8C9] mb-10 text-center"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Plan Comparison
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-white/5">
            <table className="w-full text-sm" style={{ fontFamily: "var(--font-sans)" }}>
              <thead>
                <tr className="border-b border-white/5 bg-[#282828]">
                  <th className="text-left px-5 py-4 text-[#a1a1aa] font-semibold w-1/2">Feature</th>
                  <th className="text-center px-5 py-4 text-[#F59E0B] font-bold">Base (Beta)</th>
                  <th className="text-center px-5 py-4 text-[#a1a1aa] font-semibold">Standard</th>
                  <th className="text-center px-5 py-4 text-[#FFE8C9] font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "bg-[#1f1f1e]" : "bg-[#282828]/40"}`}
                  >
                    <td className="px-5 py-3.5 text-[#d4d4d4]">{row.feature}</td>
                    <td className="px-5 py-3.5 text-center"><CheckCell value={row.base} /></td>
                    <td className="px-5 py-3.5 text-center"><CheckCell value={row.standard} /></td>
                    <td className="px-5 py-3.5 text-center"><CheckCell value={row.pro} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          className="py-16 max-w-[800px] mx-auto px-4 sm:px-6"
          aria-labelledby="faq-heading"
        >
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-normal text-[#FFE8C9] mb-10 text-center"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6">
            {[
              {
                q: "Is Open Narrator really free?",
                a: "Yes. During the beta period, the Base plan gives you full access to all features at no cost — including the video editor and captions. No credit card required.",
              },
              {
                q: "What happens after beta?",
                a: "Beta users keep their free access. Paid plans (Standard and Pro) will be available for users who want future updates and priority support.",
              },
              {
                q: "Does it work without internet?",
                a: "Completely. Open Narrator runs 100% locally on your machine. No internet connection is needed after installation.",
              },
              {
                q: "What are the system requirements?",
                a: "Windows, macOS, or Linux with a minimum of 8GB RAM. A dedicated GPU is not required — the engine runs on CPU.",
              },
              {
                q: "Is there a usage limit?",
                a: "No. Generate as much audio as you want. There are no per-token costs, no monthly caps, and no rate limits.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-white/5 pb-6">
                <dt
                  className="text-base font-semibold text-[#FFE8C9] mb-2"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  {q}
                </dt>
                <dd
                  className="text-sm text-[#a1a1aa] leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

      </main>
      <Footer />
    </>
  );
}
