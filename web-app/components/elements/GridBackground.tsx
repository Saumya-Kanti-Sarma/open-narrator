/**
 * Purpose: Animated grid-line background — subtle tech blueprint aesthetic
 * Used in: FeaturesSection
 * Dependencies: None
 */

"use client";

import { useEffect, useRef } from "react";

/**
 * Component: GridBackground
 * Description: Canvas-rendered animated grid with faint intersection dots and a slow pan
 * Props: none
 */

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 52;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000;

      // slow pan offset
      const offset = (elapsed * 8) % CELL;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / CELL) + 2;
      const rows = Math.ceil(canvas.height / CELL) + 2;

      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;

      // vertical lines
      for (let c = -1; c < cols; c++) {
        const x = c * CELL + offset;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // horizontal lines
      for (let r = -1; r < rows; r++) {
        const y = r * CELL + offset;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // intersection dots with pulse
      const pulse = 0.5 + 0.5 * Math.sin(elapsed * 1.2);
      for (let c = -1; c < cols; c++) {
        for (let r = -1; r < rows; r++) {
          const x = c * CELL + offset;
          const y = r * CELL + offset;
          const alpha = 0.06 + 0.06 * pulse;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(79,70,229,${alpha})`;
          ctx.fill();
        }
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
