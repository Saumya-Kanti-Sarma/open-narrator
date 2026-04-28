/**
 * Purpose: Animated radial halftone dot background — dots are larger at edges, fade to center
 * Used in: HeroSection
 * Dependencies: None
 */

"use client";

import { useEffect, useRef } from "react";

/**
 * Component: HalftoneBackground
 * Description: Canvas-rendered radial halftone pattern with subtle breathing animation
 * Props: none
 */

export default function HalftoneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID = 38;        // spacing between dot centers
    const MAX_RADIUS = 5.5; // max dot radius at edges
    const MIN_RADIUS = 0.4; // min dot radius at center

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;

      if (!startRef.current) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000;

      // subtle breathing: ±8% scale over 4s
      const breathe = 1 + 0.08 * Math.sin((elapsed * Math.PI * 2) / 4);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxDist = Math.sqrt(cx * cx + cy * cy);

      const cols = Math.ceil(canvas.width / GRID) + 2;
      const rows = Math.ceil(canvas.height / GRID) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * GRID;
          const y = row * GRID;

          const dx = x - cx;
          const dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // normalised distance 0 (center) → 1 (corner)
          const t = Math.min(dist / maxDist, 1);

          // dot radius grows toward edges, eased with smoothstep
          const smooth = t * t * (3 - 2 * t);
          const r = (MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * smooth) * breathe;

          // opacity also grows toward edges
          const alpha = 0.05 + 0.08 * smooth;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `#38383863`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    animRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
