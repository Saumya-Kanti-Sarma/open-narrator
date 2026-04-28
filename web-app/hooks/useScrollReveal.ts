/**
 * Purpose: Intersection Observer hook that adds "visible" class when element enters viewport
 * Used in: All section components for scroll-triggered animations
 */

"use client";

import { useEffect, useRef } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: Options = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove("visible");
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * Observes multiple children of a container and staggers their reveal
 */
export function useStaggerReveal<T extends HTMLElement>(
  options: Options & { selector?: string } = {}
) {
  const ref = useRef<T>(null);
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -40px 0px",
    once = true,
    selector = ".stagger-item",
  } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(selector));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add("visible"), i * 110);
          });
          if (once) observer.unobserve(container);
        } else if (!once) {
          items.forEach((item) => item.classList.remove("visible"));
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, selector]);

  return ref;
}
