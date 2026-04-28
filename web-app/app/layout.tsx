/**
 * Purpose: Root layout — sets metadata, fonts, structured data and global styles
 * Used in: All pages via Next.js app router
 * Dependencies: globals.css, Google Fonts
 */

import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const BASE_URL = "https://opennarrator.pages.dev";

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
    default: "Open Narrator — AI Voice Generator for Content Creators",
    template: "%s | Open Narrator",
  },
  description:
    "Open Narrator is a free, local AI voice generator for content creators. Generate 20+ natural voices, create short videos, podcasts, and audiobooks — 100% private, no cloud, no per-token cost.",
  keywords: [
    "AI voice generator",
    "text to speech",
    "TTS software",
    "local AI voice",
    "free voice generator",
    "open source TTS",
    "Kokoro TTS",
    "AI audiobook creator",
    "AI podcast generator",
    "voice to video",
    "content creator tools",
    "offline AI voice",
    "private AI",
    "no cloud TTS",
  ],
  authors: [{ name: "Open Narrator", url: BASE_URL }],
  creator: "Open Narrator",
  publisher: "Open Narrator",
  category: "technology",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Open Narrator — AI Voice Generator for Content Creators",
    description:
      "Generate 20+ natural AI voices locally. No cloud, no per-token cost. Turn voice into short videos, podcasts, and audiobooks.",
    url: BASE_URL,
    siteName: "Open Narrator",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Open Narrator — AI Voice Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Narrator — AI Voice Generator for Content Creators",
    description:
      "Free, local, private AI voice generator. 20+ voices. No cloud. No per-token cost.",
    images: ["/og-image.png"],
    creator: "@opennarrator",
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
    priceCurrency: "USD",
    description: "Free lifetime beta access with all features",
  },
  description:
    "Open Narrator is a free, local AI voice generator for content creators. Generate 20+ natural voices, create short videos, podcasts, and audiobooks — 100% private, no cloud, no per-token cost.",
  url: BASE_URL,
  author: {
    "@type": "Organization",
    name: "Open Narrator",
    url: BASE_URL,
    email: "opennarrator@gmail.com",
    sameAs: [
      "https://twitter.com/opennarrator",
      "https://discord.gg/opennarrator",
      "https://reddit.com/r/opennarrator",
      "https://instagram.com/opennarrator",
    ],
  },
  featureList: [
    "20+ natural AI voices",
    "American, British, Indian English and Hindi voices",
    "Emotion-enabled voices",
    "Parallel processing",
    "Group speaking / multi-voice scripts",
    "Built-in video editor",
    "Caption generation",
    "Audiobook creation",
    "PDF and document audio streaming",
    "100% local and private",
    "Unlimited generation",
  ],
  screenshot: `${BASE_URL}/og-image.png`,
  softwareVersion: "Beta",
  isAccessibleForFree: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
