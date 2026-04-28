/**
 * Purpose: Web app manifest for PWA support and mobile browser theming
 * Used in: Next.js app router — served at /manifest.webmanifest
 * Dependencies: Next.js MetadataRoute
 */

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Open Narrator — AI Voice Generator",
    short_name: "Open Narrator",
    description:
      "Free, local AI voice generator for content creators. 20+ voices, no cloud, no per-token cost.",
    start_url: "/",
    display: "standalone",
    background_color: "#1f1f1e",
    theme_color: "#1f1f1e",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
