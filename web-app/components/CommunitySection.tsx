/**
 * Purpose: Community links section
 * Used in: app/page.tsx
 * Dependencies: react-icons
 */

import { FaTwitter, FaDiscord, FaRedditAlien, FaInstagram } from "react-icons/fa";
import { IconType } from "react-icons";

/**
 * Component: CommunitySection
 * Description: Renders community platform links in a card grid
 * Props: none
 */

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
      color: "hover:border-[#1DA1F2]/40 hover:shadow-[0_0_20px_rgba(29,161,242,0.1)]",
      iconColor: "text-[#1DA1F2]",
      href: "#",
    },
    {
      name: "Discord",
      Icon: FaDiscord,
      color: "hover:border-[#5865F2]/40 hover:shadow-[0_0_20px_rgba(88,101,242,0.1)]",
      iconColor: "text-[#5865F2]",
      href: "#",
    },
    {
      name: "Reddit",
      Icon: FaRedditAlien,
      color: "hover:border-[#FF4500]/40 hover:shadow-[0_0_20px_rgba(255,69,0,0.1)]",
      iconColor: "text-[#FF4500]",
      href: "#",
    },
    {
      name: "Instagram",
      Icon: FaInstagram,
      color: "hover:border-[#E1306C]/40 hover:shadow-[0_0_20px_rgba(225,48,108,0.1)]",
      iconColor: "text-[#E1306C]",
      href: "#",
    },
  ];

export default function CommunitySection() {
  return (
    <section id="community" className="py-16 sm:py-24 bg-[#18181b]" aria-labelledby="community-heading">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {communities.map(({ name, Icon, color, iconColor, href }) => (
            <a
              key={name}
              href={href}
              aria-label={`Join our ${name} community`}
              className={`flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl bg-[#282828] border border-white/5 transition-all duration-300 hover:scale-[1.02] ${color}`}
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
  );
}
