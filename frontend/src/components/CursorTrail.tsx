'use client';
// src/components/CursorTrail.tsx
// Subtle canvas-based cursor trail using the accent color.
// Performance: uses a canvas + RAF, zero React re-renders on mousemove.

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TrailDot {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function CursorTrail() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const dotsRef        = useRef<TrailDot[]>([]);
  const rafRef         = useRef<number>(0);
  const reducedMotion  = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      if (reducedMotion.current) return;
      // Smaller, subtler dots (max 5px) at lower opacity (0.4)
      dotsRef.current.push({ x: e.clientX, y: e.clientY, alpha: 0.4, size: 5 });
      if (dotsRef.current.length > 8) dotsRef.current.shift();
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Resolve accent color from CSS var at runtime
    const getAccentRgb = () => {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim();
      // Parse hex: #rrggbb
      if (val.startsWith('#')) {
        const r = parseInt(val.slice(1, 3), 16);
        const g = parseInt(val.slice(3, 5), 16);
        const b = parseInt(val.slice(5, 7), 16);
        return `${r},${g},${b}`;
      }
      return '91,71,224'; // fallback indigo
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = getAccentRgb();

      dotsRef.current = dotsRef.current
        .map((d) => ({ ...d, alpha: d.alpha - 0.045, size: d.size * 0.92 }))
        .filter((d) => d.alpha > 0);

      dotsRef.current.forEach((d, i) => {
        const intensity = (i + 1) / dotsRef.current.length;
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size);
        grad.addColorStop(0, `rgba(${rgb},${d.alpha * intensity})`);
        grad.addColorStop(1, `rgba(${rgb},0)`);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden lg:block"
    />
  );
}
