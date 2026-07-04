'use client';
// src/components/Stats.tsx
// Stripe-style dashboard metrics strip with animated counters.
// Data fetched live from GET /stats; falls back to defaults if empty.

import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Code, Clock, GraduationCap, Star } from 'lucide-react';
import { useStats } from '@/hooks/usePortfolioData';

const ICON_MAP: Record<string, React.ElementType> = {
  years:       Clock,
  techs:       Code,
  certs:       GraduationCap,
  achv:        Trophy,
  projects:    Trophy,
  technologies:Code,
  certifications: GraduationCap,
  experience:  Star,
};

function AnimatedNumber({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return <>{val}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { data: apiStats, loading } = useStats();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  /* Prefer API stats; fall back to hardcoded defaults */
  const stats = apiStats.length
    ? apiStats.map((s) => {
        const numericValue = parseInt(s.value, 10) || 0;
        const labelKey = s.label.toLowerCase().replace(/\s+/g, '');
        const Icon = ICON_MAP[labelKey] ?? Star;
        return { id: s._id, icon: Icon, label: s.label, value: numericValue, suffix: s.suffix ?? '' };
      })
    : [
        { id: 'years',   icon: Clock,         label: 'Years coding',    value: 2,  suffix: '+' },
        { id: 'techs',   icon: Code,          label: 'Technologies',    value: 12, suffix: '+' },
        { id: 'certs',   icon: GraduationCap, label: 'Certifications',  value: 4,  suffix: ''  },
        { id: 'achv',    icon: Trophy,        label: 'Projects shipped', value: 3,  suffix: '+' },
      ];

  return (
    <section id="stats" className="py-12 border-y" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
      <div className="container-lg">
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-4"
          style={{ borderColor: 'var(--border)' }}
        >
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center px-8 py-6 gap-3">
                  <div className="w-8 h-8 rounded-lg animate-pulse" style={{ background: 'var(--surface-2)' }} />
                  <div className="w-12 h-8 rounded animate-pulse" style={{ background: 'var(--surface-2)' }} />
                  <div className="w-20 h-3 rounded animate-pulse" style={{ background: 'var(--surface-2)' }} />
                </div>
              ))
            : stats.map(({ id, icon: Icon, label, value, suffix }, i) => (
                <div key={id} className="flex flex-col items-center text-center px-8 py-6"
                  style={{ borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: 'var(--accent-subtle)' }}
                  >
                    <Icon size={15} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                  </div>
                  <div
                    className="text-3xl md:text-4xl font-extrabold tabular-nums tracking-tight"
                    style={{ color: 'var(--text-1)' }}
                    aria-label={`${value}${suffix} ${label}`}
                  >
                    {visible ? <AnimatedNumber target={value} duration={800 + i * 150} /> : 0}
                    <span aria-hidden="true">{suffix}</span>
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
                    {label}
                  </p>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
}
