'use client';
// src/components/Experience.tsx
// Premium full-width featured experience cards.
// Data fetched live from backend API (GET /experience).

import React from 'react';
import Reveal from './Reveal';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { useExperience } from '@/hooks/usePortfolioData';

const ACCENT_COLORS = [
  { bar: 'linear-gradient(180deg, #5b47e0, #06b6d4)', dot: '#5b47e0' },
  { bar: 'linear-gradient(180deg, #f59e0b, #ef4444)', dot: '#f59e0b' },
  { bar: 'linear-gradient(180deg, #10b981, #06b6d4)', dot: '#10b981' },
];

export default function Experience() {
  const { data: experiences, loading } = useExperience();

  /* Build human-readable period string from startDate / endDate / current */
  const getPeriod = (exp: typeof experiences[0]) => {
    if (exp.current) return `${exp.startDate} – Present`;
    if (exp.endDate)  return `${exp.startDate} – ${exp.endDate}`;
    return exp.startDate;
  };

  return (
    <section id="experience" className="section-pad" style={{ background: 'var(--surface-2)' }}>
      <div className="container-lg">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="section-eyebrow">02</span>
            <span className="w-5 h-px" style={{ background: 'var(--border-2)' }} />
            <span className="section-eyebrow">Experience</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
            style={{ color: 'var(--text-1)' }}
          >
            Work &amp; Training
          </h2>
          <p className="text-base mb-12" style={{ color: 'var(--text-3)' }}>
            Hands-on engineering experience.
          </p>
        </Reveal>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-5">
            {[1, 2].map((i) => (
              <div key={i} className="surface h-40 animate-pulse rounded-xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && experiences.length === 0 && (
          <p className="text-base" style={{ color: 'var(--text-3)' }}>
            Currently seeking opportunities to gain hands-on software engineering experience.
          </p>
        )}

        <div className="space-y-5">
          {experiences.map((exp, idx) => {
            const colors = ACCENT_COLORS[idx % ACCENT_COLORS.length];
            /* Generate initials from company name */
            const initials = exp.company
              .split(' ')
              .filter((w) => /^[A-Z]/.test(w))
              .slice(0, 2)
              .map((w) => w[0])
              .join('') || exp.company.slice(0, 2).toUpperCase();

            return (
              <Reveal key={exp._id}>
                <article className="surface hover-lift overflow-hidden" style={{ padding: 0 }}>
                  <div className="flex">
                    {/* Left accent bar */}
                    <div
                      className="w-1.5 flex-shrink-0"
                      style={{ background: colors.bar }}
                      aria-hidden="true"
                    />

                    {/* Content */}
                    <div className="flex-1 p-7 md:p-8">
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                        <div className="flex items-start gap-4">
                          {/* Institution monogram */}
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ background: colors.dot }}
                          >
                            {initials}
                          </div>
                          <div>
                            <h3
                              className="text-xl font-bold tracking-tight"
                              style={{ color: 'var(--text-1)' }}
                            >
                              {exp.position}
                            </h3>
                            <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent)' }}>
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: 'var(--text-3)' }}>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} aria-hidden="true" />
                            {getPeriod(exp)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} aria-hidden="true" />
                            {exp.location}
                          </span>
                          {exp.companyUrl && (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 transition-colors duration-150"
                              style={{ color: 'var(--accent)' }}
                            >
                              <ExternalLink size={12} aria-hidden="true" />
                              Website
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {exp.description && (
                        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
                          {exp.description}
                        </p>
                      )}

                      {/* Achievements */}
                      {exp.achievements.length > 0 && (
                        <div className="mb-6">
                          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>
                            Key contributions
                          </p>
                          <ul className="space-y-2">
                            {exp.achievements.map((a) => (
                              <li
                                key={a}
                                className="flex items-start gap-2.5 text-sm"
                                style={{ color: 'var(--text-2)' }}
                              >
                                <span
                                  className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: colors.dot }}
                                  aria-hidden="true"
                                />
                                {a}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech stack chips */}
                      {exp.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <span key={tech} className="tech-chip">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
