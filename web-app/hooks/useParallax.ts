/**
 * Purpose: Scroll-based parallax transform hook
 * Used in: HeroSection orbs, section backgrounds
 */

"use client";

import { useEffect, useRef } from "react";

/**
 * Applies a CSS translateY parallax based on scroll position.
 * @param speed  — multiplier: 0.1 = subtle, 0.5 = strong. Negative = opposite direction.
 */
export function useParallax<T extends HTMLElement>(speed: number = 0.2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${centerY * speed}px)`;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return ref;
}
