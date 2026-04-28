/**
 * Purpose: Animated concentric ring background — rings expand and fade from center
 * Used in: CommunitySection
 * Dependencies: None
 */

"use client";

import { useEffect, useRef } from "react";

/**
 * Component: RingBackground
 * Description: Canvas-rendered concentric rings that pulse outward from center
 * Props: none
 */

interface Ring {
  r: number;
  maxR: number;
  alpha: number;
  speed: number;
  color: string;
}

const RING_COLORS = [
  "rgba(79,70,229,",
  "rgba(245,158,11,",
  "rgba(255,232,201,",
];

export default function RingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const ringsRef = useRef<Ring[]>([]);
  const lastSpawnRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function spawnRing() {
      if (!canvas) return;
      const maxR = Math.max(canvas.width, canvas.height) * 0.65;
      ringsRef.current.push({
        r: 0,
        maxR,
        alpha: 0.18,
        speed: 0.6 + Math.random() * 0.5,
        color: RING_COLORS[Math.floor(Math.random() * RING_COLORS.length)],
      });
    }

    // seed initial rings at different stages
    for (let i = 0; i < 4; i++) {
      spawnRing();
      const ring = ringsRef.current[ringsRef.current.length - 1];
      ring.r = ring.maxR * (i / 4);
      ring.alpha = 0.18 * (1 - i / 4);
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;

      // spawn a new ring every ~2.2s
      if (timestamp - lastSpawnRef.current > 2200) {
        spawnRing();
        lastSpawnRef.current = timestamp;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ringsRef.current = ringsRef.current.filter((ring) => ring.alpha > 0.002);

      for (const ring of ringsRef.current) {
        ring.r += ring.speed;
        ring.alpha = 0.18 * (1 - ring.r / ring.maxR);

        ctx.beginPath();
        ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `${ring.color}${ring.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
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
