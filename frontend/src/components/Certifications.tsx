'use client';
// src/components/Certifications.tsx
// Credential badge grid — live data from GET /certifications.

import { Award, ExternalLink } from 'lucide-react';
import Reveal from './Reveal';
import { useCertifications } from '@/hooks/usePortfolioData';

const ISSUER_CONFIG: Record<string, { initials: string; bg: string; color: string }> = {
  'Coursera':        { initials: 'CO', bg: '#0056d2', color: '#fff' },
  'Meta / Coursera': { initials: 'ME', bg: '#0866ff', color: '#fff' },
  'Udemy':           { initials: 'UD', bg: '#a435f0', color: '#fff' },
  'Google':          { initials: 'GO', bg: '#4285f4', color: '#fff' },
  'CDAC':            { initials: 'CD', bg: '#e74c3c', color: '#fff' },
};

export default function Certifications() {
  const { data: certifications, loading } = useCertifications();

  return (
    <section id="certifications" className="section-pad" style={{ background: 'var(--surface-2)' }}>
      <div className="container-lg">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="section-eyebrow">05</span>
            <span className="w-5 h-px" style={{ background: 'var(--border-2)' }} />
            <span className="section-eyebrow">Credentials</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
            style={{ color: 'var(--text-1)' }}
          >
            Certifications
          </h2>
          <p className="text-base mb-12" style={{ color: 'var(--text-3)' }}>
            Professional development and online credentials.
          </p>
        </Reveal>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="surface h-40 animate-pulse rounded-xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && certifications.length === 0 && (
          <p className="text-base" style={{ color: 'var(--text-3)' }}>
            Certifications coming soon.
          </p>
        )}

        {!loading && certifications.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {certifications.map((c) => {
              /* organization = issuer name in backend model */
              const cfg = ISSUER_CONFIG[c.organization] ?? {
                initials: c.organization.slice(0, 2).toUpperCase(),
                bg: 'var(--accent)',
                color: '#fff',
              };
              return (
                <Reveal key={c._id}>
                  <div className="surface hover-lift p-5 flex flex-col gap-4 h-full">
                    {/* Issuer avatar */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        {cfg.initials}
                      </div>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-3)' }}>
                        {c.organization}
                      </span>
                    </div>

                    {/* Title — backend uses `name` field */}
                    <h3
                      className="text-sm font-bold leading-snug flex-1"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {c.name}
                    </h3>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between"
                      style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}
                    >
                      <span
                        className="font-mono text-[10px]"
                        style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono, monospace)' }}
                      >
                        {c.year}
                      </span>
                      {c.verifyUrl ? (
                        <a
                          href={c.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold transition-colors duration-150"
                          style={{ color: 'var(--accent)' }}
                          aria-label={`Verify ${c.name}`}
                        >
                          Verify
                          <ExternalLink size={10} aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text-3)' }}>
                          <Award size={11} aria-hidden="true" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
