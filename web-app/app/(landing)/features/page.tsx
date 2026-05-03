/**
 * Purpose: Features page — detailed breakdown of all Open Narrator capabilities
 * Route: /features
 */

import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { RiVoiceAiFill } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { PiMonitorPlayFill } from "react-icons/pi";
import { MdLock, MdAllInclusive, MdSubtitles } from "react-icons/md";
import { FaBook, FaFilePdf } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Features of Open Narrator",
  description:
    "Explore all Open Narrator features: 20+ AI voices, multi-speaker scripts, audiobook creation, and offline PDF narration. Free, private, no cloud, no monthly bills.",
  keywords: [
    "Open Narrator",
    "opennarrator",
    "Open Narrator - Text to speech software",
    "AI voice generator features",
    "offline text to speech features",
    "multi speaker AI voice",
    "audiobook creator free",
    "PDF narration software",
    "parallel voice processing",
    "local AI voice features",
    "Open Narrator features",
  ],
  alternates: { canonical: "https://opennarrator.com/features" },
  openGraph: {
    title: "Features of Open Narrator",
    description:
      "Explore all Open Narrator features: 20+ AI voices, multi-speaker scripts, audiobook creation, and offline PDF narration. Free, private, no cloud, no monthly bills.",
    url: "https://opennarrator.com/features",
    type: "website",
  },
};

const features = [
  {
    Icon: RiVoiceAiFill,
    title: "10+ Natural AI Voices",
    description:
      "Choose from over 10 high-quality voices across American English, British English, and Hindi.",
    bullets: [
      "American, British, and Indian English accents",
      "Hindi language support",
      "Consistent, studio-quality output",
    ],
  },
  {
    Icon: BsLightningChargeFill,
    title: "Parallel Processing",
    description:
      "Generate multiple voice outputs simultaneously using multi-threaded processing. Ideal for batch content creation and long-form scripts.",
    bullets: [
      "Simultaneous multi-voice rendering",
      "Optimised for speed on CPU",
      "Faster output for long scripts",
      "Configurable worker threads",
    ],
  },
  {
    Icon: HiUserGroup,
    title: "Multi-Speaker Scripts",
    description:
      "Write dialogue-style scripts with multiple speakers. Perfect for podcasts, audiobooks, explainer videos, and storytelling.",
    bullets: [
      "Assign different voices per speaker",
      "Natural conversation flow",
      "Configurable gap between speakers",
      "Export as a single merged audio file",
    ],
  },
  // {
  //   Icon: PiMonitorPlayFill,
  //   title: "Built-in Video Editor",
  //   description:
  //     "Turn your AI-generated voice into publish-ready video content without leaving the app. Add captions, background visuals, and export for social media.",
  //   bullets: [
  //     "Convert audio to captioned video",
  //     "Export for YouTube, Reels, TikTok",
  //     "Background image and video support",
  //     "One-click social media formats",
  //   ],
  // },
  // {
  //   Icon: MdSubtitles,
  //   title: "Caption Generation",
  //   description:
  //     "Automatically generate word-level captions with precise timestamps. Use them for accessibility, subtitles, or social media overlays.",
  //   bullets: [
  //     "Word-level timestamp accuracy",
  //     "Export as JSON or SRT",
  //     "Works with all voice modes",
  //     "Accessibility-ready output",
  //   ],
  // },
  {
    Icon: FaBook,
    title: "Audiobook Creation",
    description:
      "Convert long-form text, manuscripts, or documents into full audiobooks with consistent narration and chapter structure.",
    bullets: [
      "Unlimited audio length",
      "Chapter-aware narration",
      "Multiple voice styles",
      "Export as WAV or MP3",
    ],
  },
  {
    Icon: FaFilePdf,
    title: "PDF Narration",
    description:
      "Stream audio directly from PDF files. Listen to any document hands-free.",
    bullets: [
      "Unlimited PDF support",
      "Real-time audio streaming",
      "Adjustable reading speed",
      "No file size limits",
    ],
  },
  {
    Icon: MdLock,
    title: "100% Private & Offline",
    description:
      "Everything runs locally on your machine. No data leaves your device, no API keys required, no usage limits.",
    bullets: [
      "No internet connection required",
      "No cloud processing",
      "No API keys or accounts",
      "Your data stays on your device",
    ],
  },
  {
    Icon: MdAllInclusive,
    title: "Unlimited Generation",
    description:
      "Generate as much audio as you need with no per-token costs, no monthly caps, and no subscription required.",
    bullets: [
      "No generation limits",
      "No per-token pricing",
      "Free lifetime beta access",
      "Runs on 8GB RAM minimum",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Hero ── */}
        <section
          className="relative pt-32 pb-20 px-4 sm:px-6 text-center overflow-hidden"
          aria-labelledby="features-hero-heading"
        >
          {/* Background glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p
              className="text-[#4F46E5] text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Everything you need
            </p>
            <h1
              id="features-hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#FFE8C9] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Built for Creators Who{" "}
              <span className="text-[#F59E0B]">Mean Business</span>
            </h1>
            <p
              className="text-lg text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Open Narrator packs professional-grade voice generation into a single offline app — completely free.
            </p>
          </div>
        </section>

        {/* ── Feature grid ── */}
        <section
          className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6"
          aria-label="Feature list"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex flex-col gap-4 p-6 rounded-2xl bg-[#282828] border border-white/5 hover:border-[#F59E0B]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                    <feature.Icon size={20} className="text-[#F59E0B]" aria-hidden="true" />
                  </div>
                  <h2
                    className="text-lg font-bold text-[#FFE8C9]"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {feature.title}
                  </h2>
                </div>
                <p
                  className="text-sm text-[#a1a1aa] leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {feature.description}
                </p>
                <ul className="space-y-2 mt-auto">
                  {feature.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-[#d4d4d4]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <span className="text-[#F59E0B] mt-0.5 text-xs flex-shrink-0" aria-hidden="true">✦</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-20 px-4 sm:px-6 text-center bg-[#18181b]"
          aria-labelledby="features-cta-heading"
        >
          <div className="max-w-2xl mx-auto">
            <h2
              id="features-cta-heading"
              className="text-3xl sm:text-4xl font-normal text-[#FFE8C9] mb-4"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Ready to start creating?
            </h2>
            <p
              className="text-[#a1a1aa] mb-8"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Join the beta and get free lifetime access to all features.
            </p>
            <a
              href="/#beta"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#FFE8C9] text-[#1f1f1e] font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Get Early Access — Free
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
