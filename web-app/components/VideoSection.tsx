/**
 * Purpose: Section showcasing the built-in video creation suite
 * Used in: app/page.tsx
 * Dependencies: react-icons
 */

import { FaMobileAlt, FaPhotoVideo, FaBook, FaBullhorn } from "react-icons/fa";
import { IconType } from "react-icons";

/**
 * Component: VideoSection
 * Description: Highlights the video editor feature with use cases
 * Props: none
 */

const useCases: { Icon: IconType; label: string }[] = [
  { Icon: FaMobileAlt, label: "Social media content" },
  { Icon: FaPhotoVideo, label: "Product videos" },
  { Icon: FaBook, label: "Audiobooks" },
  { Icon: FaBullhorn, label: "Marketing creatives" },
];

export default function VideoSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#18181b]" aria-labelledby="video-section-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <p
              className="text-[#4F46E5] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 sm:mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Video Creation Suite
            </p>
            <h2
              id="video-section-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-4 sm:mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              From Script to Content —{" "}
              <span className="bg-gradient-to-r from-[#4F46E5] to-[#818cf8] bg-clip-text text-transparent">
                All in One Place
              </span>
            </h2>
            <p
              className="text-[#a1a1aa] mb-8 sm:mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Built-in video editor designed for creators. Turn your AI-generated voice into
              polished, publish-ready content without leaving the app.
            </p>

            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {useCases.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-[#282828] border border-white/5"
                >
                  <Icon size={16} className="text-[#4F46E5] shrink-0" aria-hidden="true" />
                  <span
                    className="text-xs sm:text-sm text-[#d4d4d4] font-medium"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual placeholder */}
          <div
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#002A86]/30 to-[#4F46E5]/20 border border-[#4F46E5]/20 aspect-video flex items-center justify-center"
            aria-label="Video editor preview"
          >
            <div className="text-center">
              <FaPhotoVideo size={40} className="text-[#4F46E5]/60 mx-auto mb-3 sm:mb-4" aria-hidden="true" />
              <p
                className="text-[#a1a1aa] text-sm"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Video editor preview
              </p>
              <p
                className="text-[#71717a] text-xs mt-1"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Coming soon
              </p>
            </div>
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#002A86]/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
