/**
 * Purpose: Site footer with logo, links and tagline
 * Used in: app/page.tsx
 * Dependencies: Next.js Image, react-icons
 */

import Image from "next/image";
import { MdEmail, MdLanguage } from "react-icons/md";

/**
 * Component: Footer
 * Description: Renders the site footer with branding, nav links and contact info
 * Props: none
 */

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#1f1f1e]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Open Narrator logo" width={28} height={28} style={{ width: 28, height: "auto" }} />
              <Image
                src="/open-narrator-text.svg"
                alt="Open Narrator"
                width={120}
                height={20}
                style={{ width: 120, height: "auto" }}
              />
            </div>
            <p
              className="text-xs text-[#71717a] italic"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Built for creators. Powered by openness.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {["Features", "Pricing", "Community", "Beta Access"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="https://opennarrator.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <MdLanguage size={14} aria-hidden="true" />
              opennarrator.pages.dev
            </a>
            <a
              href="mailto:opennarrator@gmail.com"
              className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <MdEmail size={14} aria-hidden="true" />
              opennarrator@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 border-t border-white/5 text-center">
          <p
            className="text-xs text-[#52525b]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            © {new Date().getFullYear()} Open Narrator. Most of the project is open-source.
          </p>
        </div>
      </div>
    </footer>
  );
}
