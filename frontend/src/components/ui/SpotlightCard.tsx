'use client';
// src/components/ui/SpotlightCard.tsx
// Raycast-inspired spotlight hover effect.
// Tracks the mouse position within the card and renders a radial gradient glow.

import React, { useRef, useCallback } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function SpotlightCard({
  children,
  className = '',
  style,
  as: _Tag = 'div',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mouse-x', '-200px');
    el.style.setProperty('--mouse-y', '-200px');
  }, []);

  return (
    <div
      ref={ref}
      className={`spotlight-wrapper ${className}`}
      style={{ '--mouse-x': '-200px', '--mouse-y': '-200px', ...style } as React.CSSProperties}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
