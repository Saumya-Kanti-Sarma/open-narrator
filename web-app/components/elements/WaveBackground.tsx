/**
 * Purpose: Animated sine-wave background — slow drifting waves
 * Used in: PricingBlock
 * Dependencies: None
 */

"use client";

import { useEffect, useRef } from "react";

/**
 * Component: WaveBackground
 * Description: Canvas-rendered layered sine waves that drift upward slowly
 * Props: none
 */

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);

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

    const waves = [
      { amp: 28, freq: 0.008, speed: 0.4, yFrac: 0.25, color: "rgba(245,158,11,0.055)", width: 1.5 },
      { amp: 18, freq: 0.012, speed: 0.6, yFrac: 0.45, color: "rgba(245,158,11,0.04)", width: 1 },
      { amp: 36, freq: 0.006, speed: 0.25, yFrac: 0.65, color: "rgba(79,70,229,0.05)", width: 1.5 },
      { amp: 22, freq: 0.010, speed: 0.5, yFrac: 0.80, color: "rgba(255,232,201,0.03)", width: 1 },
    ];

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const wave of waves) {
        const baseY = canvas.height * wave.yFrac;
        const phase = elapsed * wave.speed * Math.PI * 2;

        ctx.beginPath();
        ctx.moveTo(0, baseY);

        for (let x = 0; x <= canvas.width; x += 3) {
          const y = baseY + Math.sin(x * wave.freq + phase) * wave.amp;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = wave.width;
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
