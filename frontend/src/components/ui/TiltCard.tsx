'use client';
// src/components/ui/TiltCard.tsx
// 3D tilt-on-hover card wrapper. Extracted from About.tsx.

import React, { useState } from 'react';

interface TiltCardProps {
  className?: string;
  children: React.ReactNode;
}

export default function TiltCard({ className = '', children }: TiltCardProps) {
  const [style, setStyle] = useState<{ transform: string } | undefined>();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 10;
    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
    });
  };

  const handleLeave = () =>
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)',
    });

  return (
    <div
      className={className}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
