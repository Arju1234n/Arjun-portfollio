'use client';
// src/components/ThemeScroll.tsx
// Animated canvas theme indicator (bottom-right corner).
// Fixed: pauses animation when tab is hidden, fixes variable name shadowing.
import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const ThemeScroll: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 60;
    canvas.height = 60;

    let animationFrame: number;
    let angle = 0;
    let running = true;

    const colors =
      theme === 'dark'
        ? ['#6366f1', '#8b5cf6', '#d946ef', '#f472b6']
        : ['#818cf8', '#a78bfa', '#e879f9', '#f9a8d4'];

    const drawStar = (
      x: number,
      y: number,
      radius: number,
      spikes: number,
      color: string,
      rotation: number
    ) => {
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.fillStyle = color;
      for (let i = 0; i < spikes; i++) {
        const outerX = x + Math.cos(rotation) * radius;
        const outerY = y + Math.sin(rotation) * radius;
        ctx.lineTo(outerX, outerY);
        rotation += step;
        const innerX = x + Math.cos(rotation) * (radius * 0.4);
        const innerY = y + Math.sin(rotation) * (radius * 0.4);
        ctx.lineTo(innerX, innerY);
        rotation += step;
      }
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, 60, 60);

      // Background circle
      ctx.beginPath();
      ctx.arc(30, 30, 25, 0, Math.PI * 2);
      ctx.fillStyle = theme === 'dark' ? '#1f2937' : '#f3f4f6';
      ctx.fill();

      angle += 0.01;

      drawStar(30, 30, 20, 8, colors[0], Math.PI / 2 * 3);

      ctx.save();
      ctx.translate(30, 30);
      ctx.rotate(angle);
      ctx.translate(-30, -30);
      drawStar(30, 30, 15, 5, colors[1], Math.PI / 2 * 3);
      ctx.restore();

      ctx.save();
      ctx.translate(30, 30);
      ctx.rotate(-angle * 1.5);
      ctx.translate(-30, -30);
      drawStar(30, 30, 10, 6, colors[2], Math.PI / 2 * 3);
      ctx.restore();

      ctx.save();
      ctx.translate(30, 30);
      ctx.rotate(angle * 2);
      ctx.translate(-30, -30);
      drawStar(30, 30, 5, 4, colors[3], Math.PI / 2 * 3);
      ctx.restore();

      animationFrame = requestAnimationFrame(animate);
    };

    // Pause animation when tab is hidden — saves CPU
    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(animationFrame);
      } else {
        running = true;
        animate();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    animate();

    return () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [theme]);

  return (
    <div className="fixed bottom-6 right-6 z-50" aria-hidden="true">
      <canvas
        ref={canvasRef}
        width={60}
        height={60}
        className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        title={`Current theme: ${theme}`}
      />
    </div>
  );
};

export default ThemeScroll;