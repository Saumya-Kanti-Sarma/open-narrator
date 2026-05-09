/**
 * Purpose: Landing page hero section with headline, subheadline, CTAs and highlight badges
 * Used in: app/page.tsx
 * Dependencies: Button element, Badge element, HalftoneBackground element, VoiceDemo, react-icons, react-hot-toast
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { BsLightningChargeFill } from "react-icons/bs";
import { MdLock, MdAllInclusive, MdWarningAmber, MdClose } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";
import toast from "react-hot-toast";
import Button from "./elements/Button";
import Badge from "./elements/Badge";
import HalftoneBackground from "./elements/HalftoneBackground";
import VoiceDemo from "./VoiceDemo";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";

const highlights = [
  { icon: <BsLightningChargeFill size={30} color="orange" />, label: "Runs locally (8GB RAM min)" },
  { icon: <MdLock size={30} color="orange" />, label: "100% Private" },
  { icon: <HiMicrophone size={30} color="orange" />, label: "20+ Voices" },
  { icon: <MdAllInclusive size={30} color="orange" />, label: "Unlimited Generation" },
];

// Sunday May 10 2026 midnight IST (UTC+5:30)
const LAUNCH_DATE = new Date("2026-05-10T00:00:00+05:30");

const WINDOWS_DOWNLOAD_URL = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL;

// ── Countdown ──────────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = Math.max(0, LAUNCH_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const launched = LAUNCH_DATE.getTime() <= Date.now();

  useEffect(() => {
    if (launched) return;
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [launched]);

  if (launched) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p
        className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Launching Beta Version
      </p>
      <div
        className="flex items-center gap-2 sm:gap-3"
        aria-label="Countdown to beta launch"
        role="timer"
      >
        {units.map(({ label, value }, i) => (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-[#282828] border border-white/10 flex items-center justify-center">
                <span
                  className="text-2xl sm:text-3xl font-bold text-[#FFE8C9] tabular-nums"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <span
                className="text-[10px] text-[#a1a1aa] mt-1 uppercase tracking-wider"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span
                className="text-2xl font-bold text-[#F59E0B] mb-4 select-none"
                aria-hidden="true"
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Download modal ─────────────────────────────────────────────────────────

function DownloadModal({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on overlay click
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose();
  }

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleMacClick() {
    toast("Mac version coming soon!", {
      icon: <Image
        src="/apple.svg"
        alt=""
        width={28}
        height={28}
      />,
      style: {
        background: "#282828",
        color: "#FFE8C9",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "14px",
      },
    });
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
    >
      <div className="relative w-full max-w-md bg-[#1f1f1e] border border-white/10 rounded-2xl p-7 shadow-2xl">

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close download dialog"
          className="absolute top-4 right-4 text-[#a1a1aa] hover:text-[#FFE8C9] transition-colors"
        >
          <MdClose size={22} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[#16A34A] mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Beta is Live
          </p>
          <h2
            id="download-modal-title"
            className="text-2xl font-bold text-[#FFE8C9]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Download Open Narrator
          </h2>
          <p
            className="text-sm text-[#a1a1aa] mt-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Choose your platform to get started
          </p>
        </div>

        {/* Download buttons */}
        <div className="flex flex-col gap-3 mb-6">

          {/* Windows */}
          <a
            href={WINDOWS_DOWNLOAD_URL}
            download
            className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#282828] border border-white/10 hover:border-[#4F46E5]/50 hover:bg-[#282828]/80 transition-all duration-200 group"
            aria-label="Download for Windows"
          >
            <Image
              src="/windows.svg"
              alt=""
              width={32}
              height={32}
              className="shrink-0"
              aria-hidden="true"
            />
            <div className="text-left">
              <p
                className="text-sm font-semibold text-[#FFE8C9] group-hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Download for Windows
              </p>
              <p
                className="text-xs text-[#a1a1aa]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                v0.1.0 BETA · x64 · .exe installer
              </p>
            </div>
          </a>

          {/* Mac — dimmed, coming soon */}
          <button
            onClick={handleMacClick}
            className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#282828] border border-white/5 opacity-40 cursor-not-allowed transition-all duration-200"
            aria-label="Mac version coming soon"
          >
            <Image
              src="/apple.svg"
              alt=""
              width={32}
              height={32}
              className="shrink-0 opacity-60"
              aria-hidden="true"
            />
            <div className="text-left">
              <p
                className="text-sm font-semibold text-[#a1a1aa]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Download for Mac
              </p>
              <p
                className="text-xs text-[#a1a1aa]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Coming soon
              </p>
            </div>
          </button>
        </div>

        {/* Security note */}
        <div className="flex gap-3 p-4 rounded-xl bg-[#F59E0B]/8 border border-[#F59E0B]/20">
          <MdWarningAmber
            size={20}
            className="text-[#F59E0B] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p
              className="text-xs font-semibold text-[#F59E0B] mb-1"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Windows may show a security alert
            </p>
            <p
              className="text-xs text-[#a1a1aa] leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Since we just launched, Windows SmartScreen may flag the installer as unrecognized — this is normal for new apps with limited download history. Open Narrator is{" "}
              <span className="text-[#FFE8C9]">completely safe to download</span>. We only request your location for beta analytics purposes. Click{" "}
              <span className="text-[#FFE8C9]">"More info → Run anyway"</span> to proceed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function HeroSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const launched = LAUNCH_DATE.getTime() <= Date.now();

  const orb1Ref = useParallax<HTMLDivElement>(-0.18);
  const orb2Ref = useParallax<HTMLDivElement>(0.14);
  const orb3Ref = useParallax<HTMLDivElement>(-0.1);

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        aria-label="Hero"
      >
        <HalftoneBackground />

        {/* Floating parallax orbs */}
        <div
          ref={orb1Ref}
          className="orb orb-1"
          style={{ top: "15%", left: "8%", willChange: "transform" }}
          aria-hidden="true"
        />
        <div
          ref={orb2Ref}
          className="orb orb-2"
          style={{ top: "30%", right: "6%", willChange: "transform" }}
          aria-hidden="true"
        />
        <div
          ref={orb3Ref}
          className="orb orb-3"
          style={{ bottom: "20%", left: "40%", willChange: "transform" }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6 sm:gap-8">

          {/* Logo lockup */}
          <div className="hero-logo flex flex-col items-center gap-2 -mt-4">
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
            className="hero-tag text-base sm:text-xl md:text-2xl font-normal text-[var(--warning)] tracking-wide -mt-2"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            "Free Offline AI Voice Generator for Content Creators"
          </p>

          {/* Countdown timer — hidden once launched */}
          <CountdownTimer />

          {/* Subheadline */}
          <p className="hero-sub text-base sm:text-lg md:text-2xl max-w-3xl">
            Open Narrator is a <b>software</b> built for content creators that allows them to create high quality AI generated voices for free...
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none">
            <Button
              variant="primary"
              ariaLabel={launched ? "Download Open Narrator" : "Get early access"}
              onClick={() => {
                if (launched) {
                  setDownloadOpen(true);
                } else {
                  document.getElementById("beta")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-8 py-3 sm:px-10 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
            >
              {launched ? "Download Now" : "Get Early Access"}
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
          <div className="hero-badges flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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

      {downloadOpen && <DownloadModal onClose={() => setDownloadOpen(false)} />}
    </>
  );
}
