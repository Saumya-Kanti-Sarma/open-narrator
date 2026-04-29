/**
 * Purpose: Root layout — sets metadata, fonts, structured data and global styles
 */

import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const BASE_URL = "https://opennarrator.vercel.app";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:
      "Open Narrator — Free Offline AI Voice Generator for YouTube, Reels & Audiobooks",
    template: "%s | Open Narrator",
  },

  description:
    "Open Narrator is a free offline AI voice generator for content creators. Generate unlimited realistic voices, create YouTube videos, reels, podcasts, and audiobooks — no cloud, no API, 100% private.",

  keywords: [
    // Core
    "AI voice generator free",
    "best AI voice generator",
    "text to speech offline",
    "offline TTS software",
    "local AI voice generator",
    "private AI voice tool",

    // High intent
    "AI voice generator for YouTube",
    "AI voice generator for reels",
    "faceless YouTube AI voice",
    "AI voice for videos",
    "AI narration tool",

    // Features
    "multi speaker AI voice",
    "AI dialogue generator",
    "voice to video AI",
    "AI audiobook generator free",
    "text to speech for PDFs",

    // Positioning
    "ElevenLabs alternative free",
    "AI voice generator without subscription",
    "unlimited AI voice generator",
    "no API TTS",
    "no cloud AI voice",

    // Technical
    "CPU based TTS",
    "local inference AI",
    "self hosted voice AI",
    "batch audio generation AI",

    // Long-tail (LLM optimized)
    "how to create faceless videos with AI voice",
    "generate AI voice offline unlimited",
    "AI tool for content creators voice",
  ],

  authors: [{ name: "Open Narrator", url: BASE_URL }],
  creator: "Open Narrator",
  publisher: "Open Narrator",
  category: "technology",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    title:
      "Open Narrator — Free Offline AI Voice Generator for Content Creators",
    description:
      "Free offline AI voice generator. Create unlimited AI voices for YouTube, reels, podcasts, and audiobooks. No cloud. No API. 100% private.",
    url: BASE_URL,
    siteName: "Open Narrator",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Open Narrator — AI Voice Generator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Open Narrator — Free Offline AI Voice Generator for Content Creators",
    description:
      "Create unlimited AI voices offline for YouTube, reels, podcasts, and audiobooks. No cloud. No API. 100% private.",
    images: [`${BASE_URL}/og-image.png`],
    creator: "@devloper_saumya",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Open Narrator",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Windows, macOS, Linux",

  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Free beta access with all features",
  },

  description:
    "Open Narrator is a free offline AI voice generator that converts text into realistic voice and transforms it into videos, podcasts, and audiobooks. No cloud, no API, 100% private.",

  url: BASE_URL,

  author: {
    "@type": "Organization",
    name: "Open Narrator",
    url: BASE_URL,
    email: "opennarrator@gmail.com",
    sameAs: [
      "https://x.com/devloper_saumya",
      "https://www.instagram.com/open_narrator/",
      "https://www.reddit.com/user/saaauumyaa/",
    ],
  },

  featureList: [
    "20+ natural AI voices",
    "English and Hindi support",
    "Multi-speaker voice generation",
    "Parallel audio processing",
    "Voice to video generation",
    "Caption generation",
    "Audiobook creation",
    "PDF and document audio streaming",
    "100% offline processing",
    "Unlimited AI voice generation",
    "No cloud, no API usage",
  ],

  screenshot: `${BASE_URL}/og-image.png`,
  softwareVersion: "Beta",
  isAccessibleForFree: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="canonical" href={BASE_URL} />

        <meta name="theme-color" content="#1f1f1e" />
        <meta name="color-scheme" content="dark" />

        {/* Extra SEO Boost */}
        <meta name="application-name" content="Open Narrator" />
        <meta name="apple-mobile-web-app-title" content="Open Narrator" />

        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>

      <body className="min-h-full flex flex-col bg-[#1f1f1e]">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#282828",
              color: "#FFE8C9",
              border: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#16A34A", secondary: "#282828" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#282828" },
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}