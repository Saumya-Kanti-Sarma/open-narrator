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
    <footer className=" bg-[#18181b]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Open Narrator logo" width={0} height={0} sizes="100vw" style={{ width: 28, height: "auto" }} />
              <Image
                src="/open-narrator-text.svg"
                alt="Open Narrator"
                width={0}
                height={0}
                sizes="100vw"
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
            {[
              { label: "Features", href: "/features" },
              { label: "Pricing", href: "/pricing" },
              { label: "Community", href: "/community" },
              { label: "Beta Access", href: "/#beta" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="https://opennarrator.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <MdLanguage size={14} aria-hidden="true" />
              opennarrator.com
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
          <p className="text-left">
            <a href="https://opennarrator.com/llm.txt" className="text-xs text-[#52525b]/20">llm.txt</a>
            <a href="https://opennarrator.com/robots.txt" className="text-xs text-[#52525b]/20">robots.txt</a>
          </p>
        </div>
      </div>

    </footer>
  );
}
