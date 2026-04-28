/**
 * Purpose: Small inline badge/pill for highlighting features
 * Used in: HeroSection, FeatureCard
 * Dependencies: None
 */

import React from "react";

/**
 * Component: Badge
 * Description: Renders a small pill badge
 * Props:
 * - children: React.ReactNode → badge content
 * - className: string → extra classes (optional)
 */

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-2  text-xl bg-(--bg-light)/10 border border-(--bg-light)/30 text-[#E0E7FF] rounded-md  ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </span>
  );
}
