'use client';
// src/components/ui/MagneticButton.tsx
// Subtle magnetic hover effect — the element shifts slightly toward the cursor.
// Keep the magnitude small (max 6px) for a premium, non-gimmicky feel.

import React, { useRef, useCallback } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;  // default 0.3 — percentage of offset to move (0–1)
  as?: keyof React.JSX.IntrinsicElements;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  download?: string | boolean;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  id?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  as: Tag = 'button',
  onClick,
  href,
  download,
  target,
  rel,
  type,
  disabled,
  'aria-label': ariaLabel,
  id,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 400);
  }, []);

  const props = {
    ref,
    className,
    onMouseMove,
    onMouseLeave,
    onClick,
    'aria-label': ariaLabel,
    id,
    style: { display: 'inline-flex', transition: 'transform 0.1s ease' },
    ...(Tag === 'a' ? { href, download, target, rel } : { type: type ?? 'button', disabled }),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Tag {...(props as any)}>{children}</Tag>;
}
