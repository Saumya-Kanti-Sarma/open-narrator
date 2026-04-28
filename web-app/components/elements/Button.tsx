/**
 * Purpose: Reusable button element with primary and secondary variants
 * Used in: HeroSection, BetaSection, PricingBlock
 * Dependencies: None
 */

import React from "react";

/**
 * Component: Button
 * Description: Renders a styled CTA button
 * Props:
 * - children: React.ReactNode → button label
 * - variant: "primary" | "secondary" → visual style
 * - onClick: () => void → click handler (optional)
 * - type: "button" | "submit" → html button type (optional)
 * - className: string → extra classes (optional)
 * - ariaLabel: string → accessibility label (optional)
 */

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  ariaLabel,
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1f1f1e] cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--bg-light)] text-[var(--bg-dark)] focus:ring-[#4F46E5] shadow-lg hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:scale-[1.02]",
    secondary:
      "border border-[var(--bg-light)] text-[var(--bg-light)] hover:bg-[var(--gray-300)]/5 focus:ring-[var(--bg-light)] hover:scale-[1.02]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </button>
  );
}
