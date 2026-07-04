'use client';
// src/components/SectionDots.tsx
// Refined vertical dot navigation — small, elegant, with tooltip on hover.

import { useEffect, useState, useCallback } from 'react';
import { SECTION_IDS, NAV_ITEMS } from '@/data/navigation';

export default function SectionDots({ position = 'right' }: { position?: 'left' | 'right' }) {
  const [active, setActive] = useState(SECTION_IDS[0]);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const getLabel = (id: string) =>
    NAV_ITEMS.find((n) => n.id === id)?.label ?? id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3 ${
        position === 'right' ? 'right-5' : 'left-5'
      }`}
    >
      {SECTION_IDS.map((id) => {
        const isActive = active === id;
        return (
          <div key={id} className="relative flex items-center group">
            {/* Tooltip */}
            {position === 'right' && (
              <span
                className="absolute right-5 text-[11px] font-medium px-2 py-1 rounded-md whitespace-nowrap pointer-events-none transition-all duration-150"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-2)',
                  opacity: tooltip === id ? 1 : 0,
                  transform: tooltip === id ? 'translateX(-2px)' : 'translateX(4px)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {getLabel(id)}
              </span>
            )}

            <button
              aria-label={`Go to ${getLabel(id)}`}
              aria-current={isActive ? 'true' : undefined}
              title={getLabel(id)}
              onClick={() => handleClick(id)}
              onMouseEnter={() => setTooltip(id)}
              onMouseLeave={() => setTooltip(null)}
              className="transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2"
              style={{
                width: isActive ? '6px' : '4px',
                height: isActive ? '18px' : '4px',
                background: isActive ? 'var(--accent)' : 'var(--border-2)',
                boxShadow: isActive ? '0 0 6px var(--accent)' : 'none',
              }}
            />
          </div>
        );
      })}
    </nav>
  );
}
