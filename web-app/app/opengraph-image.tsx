/**
 * Purpose: Generates the Open Graph social preview image at /opengraph-image
 * Used in: Automatically picked up by Next.js metadata for og:image and twitter:image
 * Dependencies: Next.js ImageResponse
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Open Narrator — AI Voice Generator for Content Creators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1f1f1e",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 60% 40%, rgba(245,158,11,0.08) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(79,70,229,0.08) 0%, transparent 50%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(245,158,11,0.15)",
            border: "1px solid rgba(245,158,11,0.4)",
            borderRadius: "999px",
            padding: "6px 20px",
            marginBottom: "32px",
            color: "#F59E0B",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          FREE BETA — All Features Included
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#FFE8C9",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Open Narrator
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            marginBottom: "48px",
          }}
        >
          Free, local AI voice generator. 20+ voices. No cloud. No per-token cost.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          {["100% Private", "20+ Voices", "Unlimited Generation", "Runs Locally"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,232,201,0.08)",
                border: "1px solid rgba(255,232,201,0.2)",
                borderRadius: "12px",
                padding: "10px 20px",
                color: "#FFE8C9",
                fontSize: "18px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            color: "#52525b",
            fontSize: "18px",
          }}
        >
          opennarrator.pages.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
