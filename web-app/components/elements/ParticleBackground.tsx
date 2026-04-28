/**
 * Purpose: Animated floating particle background — sparse drifting dots
 * Used in: BetaSection
 * Dependencies: None
 */

"use client";

import { useEffect, useRef } from "react";

/**
 * Component: ParticleBackground
 * Description: Canvas-rendered particles that drift slowly and fade in/out
 * Props: none
 */

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  alphaDir: number;
  color: string;
}

const COLORS = [
  "rgba(245,158,11,",   // amber
  "rgba(79,70,229,",    // indigo
  "rgba(255,232,201,",  // cream
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function makeParticle(w: number, h: number): Particle {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1 + Math.random() * 2.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.1 - Math.random() * 0.25,
        alpha: 0.05 + Math.random() * 0.15,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // reinit particles on resize
      particlesRef.current = Array.from({ length: 55 }, () =>
        makeParticle(canvas.width, canvas.height)
      );
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        // drift
        p.x += p.vx;
        p.y += p.vy;

        // alpha breathe
        p.alpha += 0.002 * p.alphaDir;
        if (p.alpha > 0.22 || p.alpha < 0.03) p.alphaDir *= -1;

        // wrap
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(3)})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    animRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
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
