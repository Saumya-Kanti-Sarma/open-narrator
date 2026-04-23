/**
 * Purpose: Root layout — sets metadata, fonts, and global styles
 * Used in: All pages via Next.js app router
 * Dependencies: globals.css, Google Fonts
 */

import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

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
  title: "Open Narrator — Studio-Quality AI Voices, Locally",
  description:
    "Create studio-quality AI voices locally, privately, and with unlimited generation. No per-token pricing. Powered by Kokoro-TTS.",
  keywords: ["AI voice", "text to speech", "TTS", "local AI", "privacy", "open source"],
  openGraph: {
    title: "Open Narrator — Studio-Quality AI Voices, Locally",
    description:
      "Generate natural, emotional AI voices on your own machine. No cloud. No per-token cost.",
    url: "https://opennarrator.sh",
    siteName: "Open Narrator",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col bg-[#1f1f1e]">{children}</body>
    </html>
  );
}
