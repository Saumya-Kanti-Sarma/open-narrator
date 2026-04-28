/**
 * Purpose: Community links section
 * Used in: app/page.tsx
 * Dependencies: react-icons
 */

"use client";

import { FaTwitter, FaRedditAlien, FaInstagram } from "react-icons/fa";
import { IconType } from "react-icons";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import ParticleBackground from "./elements/ParticleBackground";

const communities: {
  name: string;
  Icon: IconType;
  color: string;
  iconColor: string;
  href: string;
}[] = [
    {
      name: "Twitter",
      Icon: FaTwitter,
      color: "hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]",
      iconColor: "text-white",
      href: "https://x.com/devloper_saumya",
    },
    {
      name: "Reddit",
      Icon: FaRedditAlien,
      color: "hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]",
      iconColor: "text-white",
      href: "https://www.reddit.com/user/saaauumyaa/",
    },
    {
      name: "Instagram",
      Icon: FaInstagram,
      color: "hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]",
      iconColor: "text-white",
      href: "https://www.instagram.com/open_narrator/",
    },
  ];

export default function CommunitySection() {
  const headingRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useStaggerReveal<HTMLDivElement>();

  return (
    <div className="relative overflow-hidden bg-[#18181b]">
      <ParticleBackground />
      <section
        id="community"
        className="relative z-10 py-16 sm:py-24"
        aria-labelledby="community-heading"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <div ref={headingRef} className="reveal">
            <h2
              id="community-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Join the Open Narrator Community
            </h2>
            <p
              className="text-[#a1a1aa] mb-10 sm:mb-12 max-w-md mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Stay updated, share your work, and connect with other creators.
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto"
          >
            {communities.map(({ name, Icon, color, iconColor, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Join our ${name} community`}
                className={`stagger-item reveal-pop flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl bg-[#282828] border border-white/5 transition-all duration-300 hover:scale-[1.05] hover:-translate-y-1 ${color}`}
              >
                <Icon size={24} className={iconColor} aria-hidden="true" />
                <span
                  className="text-xs sm:text-sm font-medium text-[#d4d4d4]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
