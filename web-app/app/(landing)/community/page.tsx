/**
 * Purpose: Community & About Us page
 * Route: /community
 */

import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { FaTwitter, FaRedditAlien, FaInstagram } from "react-icons/fa";
import { MdEmail, MdLockOpen, MdLock, MdMoneyOff, MdBolt } from "react-icons/md";

export const metadata: Metadata = {
  title: "Community & About — Open Narrator",
  description:
    "Join the Open Narrator community. Learn about our mission to make AI voice generation free, private, and accessible to every content creator. Connect on Twitter, Reddit, and Instagram.",
  keywords: [
    "Open Narrator community",
    "AI voice generator community",
    "open source TTS community",
    "content creator AI tools",
    "about Open Narrator",
    "free AI voice generator team",
    "AI voice Discord Reddit",
    "open narrator twitter",
  ],
  alternates: { canonical: "https://opennarrator.com/community" },
  openGraph: {
    title: "Community & About — Open Narrator",
    description:
      "Join thousands of creators using Open Narrator. Connect on Twitter, Reddit, and Instagram. Learn about our mission.",
    url: "https://opennarrator.com/community",
    type: "website",
  },
};

const socials = [
  {
    name: "Twitter / X",
    handle: "@opennarrator",
    description: "Updates, tips, and behind-the-scenes development.",
    Icon: FaTwitter,
    href: "https://x.com/opennarrator",
    color: "hover:border-[#1DA1F2]/40 hover:shadow-[0_0_24px_rgba(29,161,242,0.1)]",
    iconColor: "text-[#1DA1F2]",
  },
  {
    name: "Reddit",
    handle: "r/opennarrator",
    description: "Share your creations, ask questions, and give feedback.",
    Icon: FaRedditAlien,
    href: "https://www.reddit.com/user/opennarrator/",
    color: "hover:border-[#FF4500]/40 hover:shadow-[0_0_24px_rgba(255,69,0,0.1)]",
    iconColor: "text-[#FF4500]",
  },
  {
    name: "Instagram",
    handle: "@opennarrator",
    description: "Voice demos, content examples, and creator showcases.",
    Icon: FaInstagram,
    href: "https://www.instagram.com/opennarrator/",
    color: "hover:border-[#E1306C]/40 hover:shadow-[0_0_24px_rgba(225,48,108,0.1)]",
    iconColor: "text-[#E1306C]",
  },
];

const values = [
  {
    Icon: MdLockOpen,
    iconColor: "text-[#16A34A]",
    title: "Open by Default",
    description:
      "Most of Open Narrator is open-source. We believe AI tools should be transparent, auditable, and community-driven.",
  },
  {
    Icon: MdLock,
    iconColor: "text-[#4F46E5]",
    title: "Privacy First",
    description:
      "Your voice, your data. Everything runs locally. We never see what you generate, and we never will.",
  },
  {
    Icon: MdMoneyOff,
    iconColor: "text-[#F59E0B]",
    title: "Free for Creators",
    description:
      "Content creation is hard enough. We're committed to keeping the core tool free so cost is never a barrier.",
  },
  {
    Icon: MdBolt,
    iconColor: "text-[#F59E0B]",
    title: "Built for Speed",
    description:
      "No waiting for cloud queues. Generate audio instantly on your own hardware, as fast as your machine allows.",
  },
];

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">

        {/* ── Hero ── */}
        <section
          className="relative pt-32 pb-20 px-4 sm:px-6 text-center overflow-hidden"
          aria-labelledby="community-hero-heading"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(16,163,74,0.1) 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p
              className="text-[#16A34A] text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Built with the community
            </p>
            <h1
              id="community-hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#FFE8C9] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Join the{" "}
              <span className="text-[#F59E0B]">Open Narrator</span>{" "}
              Community
            </h1>
            <p
              className="text-lg text-[#a1a1aa] max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Connect with thousands of creators, developers, and storytellers who are building
              with AI voice — privately, freely, and without limits.
            </p>
          </div>
        </section>

        {/* ── Social links ── */}
        <section
          className="py-16 max-w-[900px] mx-auto px-4 sm:px-6"
          aria-labelledby="socials-heading"
        >
          <h2
            id="socials-heading"
            className="text-2xl sm:text-3xl font-normal text-[#FFE8C9] mb-10 text-center"
            style={{ fontFamily: "var(--font-rajdhani)" }}
          >
            Find Us Online
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {socials.map(({ name, handle, description, Icon, href, color, iconColor }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Join Open Narrator on ${name}`}
                className={`flex flex-col gap-4 p-6 rounded-2xl bg-[#282828] border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${color}`}
              >
                <Icon size={28} className={iconColor} aria-hidden="true" />
                <div>
                  <p
                    className="font-bold text-[#FFE8C9] text-base"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {name}
                  </p>
                  <p
                    className="text-xs text-[#F59E0B] mb-2"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {handle}
                  </p>
                  <p
                    className="text-sm text-[#a1a1aa] leading-relaxed"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── About / Mission ── */}
        <section
          className="py-16 sm:py-24 bg-[#18181b]"
          aria-labelledby="about-heading"
        >
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p
                  className="text-[#4F46E5] text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Our mission
                </p>
                <h2
                  id="about-heading"
                  className="text-3xl sm:text-4xl font-normal text-[#FFE8C9] mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-rajdhani)" }}
                >
                  AI Voice Should Be Free,{" "}
                  <span className="text-[#F59E0B]">Private, and Powerful</span>
                </h2>
                <p
                  className="text-[#a1a1aa] leading-relaxed mb-4"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Open Narrator was built out of frustration with expensive, cloud-dependent AI
                  voice tools that charge per character, require API keys, and send your content
                  to remote servers.
                </p>
                <p
                  className="text-[#a1a1aa] leading-relaxed"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  We believe every creator — whether a solo YouTuber, an indie author, or a
                  small business — deserves access to professional-quality AI voice without
                  subscriptions, without surveillance, and without limits.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map(({ Icon, iconColor, title, description }) => (
                  <article
                    key={title}
                    className="p-5 rounded-2xl bg-[#282828] border border-white/5"
                  >
                    <div className="mb-3" aria-hidden="true">
                      <Icon size={28} className={iconColor} />
                    </div>
                    <h3
                      className="text-base font-bold text-[#FFE8C9] mb-2"
                      style={{ fontFamily: "var(--font-rajdhani)" }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm text-[#a1a1aa] leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section
          className="py-20 px-4 sm:px-6 text-center"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-xl mx-auto">
            <h2
              id="contact-heading"
              className="text-2xl sm:text-3xl font-normal text-[#FFE8C9] mb-4"
              style={{ fontFamily: "var(--font-rajdhani)" }}
            >
              Get in Touch
            </h2>
            <p
              className="text-[#a1a1aa] mb-8"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Have a question, feature request, or just want to say hello? We read every email.
            </p>
            <a
              href="mailto:opennarrator@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-[#FFE8C9] text-sm hover:border-white/20 hover:bg-white/5 transition-all duration-200"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <MdEmail size={16} aria-hidden="true" />
              opennarrator@gmail.com
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
