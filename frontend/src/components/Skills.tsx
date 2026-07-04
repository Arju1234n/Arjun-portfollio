'use client';
// src/components/Skills.tsx
// Interactive Bento Grid with Raycast-style spotlight hover.
// Data fetched live from GET /skills and GET /skills/categories.

import React, { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import SpotlightCard from './ui/SpotlightCard';
import { useSkills, useSkillCategories } from '@/hooks/usePortfolioData';

/* ── Animated proficiency bar ── */
function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => setWidth(level), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level, delay]);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>
          {name}
        </span>
        <span
          className="text-[10px] font-mono font-semibold tabular-nums"
          style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono, monospace)' }}
        >
          {width}%
        </span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--surface-3)' }}>
        <div
          className="h-full rounded-full transition-[width] ease-out"
          style={{ width: `${width}%`, transitionDuration: '1200ms', background: color }}
          role="progressbar"
          aria-valuenow={width}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${name}: ${level}%`}
        />
      </div>
    </div>
  );
}

/* Deterministic bar colors by index */
const BAR_COLORS = ['#fbbf24', '#60a5fa', '#34d399', '#4ade80', '#38bdf8', '#f472b6', '#a78bfa', '#fb923c'];

const CATEGORY_ICONS: Record<string, string> = {
  frontend: '⚛️',
  backend:  '⚙️',
  dsa:      '🧩',
  tools:    '🛠️',
  interests:'🚀',
};

const CELL_SIZES: Record<string, string> = {
  frontend: 'md:col-span-2',
  backend:  'md:col-span-1',
  dsa:      'md:col-span-1',
  tools:    'md:col-span-1',
  interests:'md:col-span-1',
};

export default function Skills() {
  const { data: skills, loading: skillsLoading }       = useSkills();
  const { data: categories, loading: catLoading }       = useSkillCategories();
  const loading = skillsLoading || catLoading;

  /* Bars: use API skills sorted by percentage descending, take top 8 */
  const skillBars = skills.length
    ? [...skills]
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 8)
        .map((s, i) => ({
          name:  s.name,
          level: s.percentage,
          color: BAR_COLORS[i % BAR_COLORS.length],
        }))
    : [
        { name: 'JavaScript / TypeScript', level: 85, color: '#fbbf24' },
        { name: 'React.js / Next.js',      level: 80, color: '#60a5fa' },
        { name: 'Node.js / Express',       level: 75, color: '#34d399' },
        { name: 'MongoDB',                 level: 72, color: '#4ade80' },
        { name: 'Tailwind CSS',            level: 82, color: '#38bdf8' },
        { name: 'Java / C / C++',          level: 70, color: '#f472b6' },
        { name: 'Git & GitHub',            level: 78, color: '#a78bfa' },
      ];

  /* Category bento: group skills by category */
  const categoryCards = categories.length
    ? categories.map((cat) => ({
        id:    cat._id,
        key:   cat.name.toLowerCase().replace(/\s+/g, '-'),
        title: cat.name,
        emoji: cat.emoji,
        items: skills
          .filter((s) => {
            const cid = typeof s.categoryId === 'string' ? s.categoryId : s.categoryId?._id;
            return cid === cat._id;
          })
          .map((s) => s.name),
      }))
    : [];

  return (
    <section id="skills" className="section-pad" style={{ background: 'var(--surface-2)' }}>
      <div className="container-lg">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="section-eyebrow">04</span>
            <span className="w-5 h-px" style={{ background: 'var(--border-2)' }} />
            <span className="section-eyebrow">Skills</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
            style={{ color: 'var(--text-1)' }}
          >
            Technical toolkit
          </h2>
          <p className="text-base mb-12" style={{ color: 'var(--text-3)' }}>
            Technologies I work with day-to-day.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">

          {/* ── Left: Proficiency bars ── */}
          <Reveal>
            <SpotlightCard className="bento-cell p-7">
              <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--text-3)' }}>
                Proficiency
              </p>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-6 rounded animate-pulse" style={{ background: 'var(--surface-2)' }} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {skillBars.map((s, i) => (
                    <SkillBar key={s.name} {...s} delay={i * 80} />
                  ))}
                </div>
              )}
              <p className="text-[10px] mt-5 text-right" style={{ color: 'var(--text-3)' }}>
                * self-assessed · always improving
              </p>
            </SpotlightCard>
          </Reveal>

          {/* ── Right: Category bento grid ── */}
          {categoryCards.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {categoryCards.map((card) => (
                <Reveal key={card.id} className={CELL_SIZES[card.key] ?? ''}>
                  <SpotlightCard className="bento-cell p-5 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg" aria-hidden="true">
                        {CATEGORY_ICONS[card.key] ?? card.emoji}
                      </span>
                      <h3 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>
                        {card.title}
                      </h3>
                    </div>
                    <ul className="space-y-1.5">
                      {card.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs"
                          style={{ color: 'var(--text-3)' }}
                        >
                          <span
                            className="w-1 h-1 rounded-full flex-shrink-0"
                            style={{ background: 'var(--accent)' }}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          ) : loading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bento-cell h-36 animate-pulse rounded-xl" style={{ background: 'var(--surface)' }} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}