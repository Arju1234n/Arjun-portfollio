'use client';
// src/components/Resume.tsx
// Premium CTA card — fetches active resume URL from GET /resume.

import { Download, Mail, Linkedin, FileText } from 'lucide-react';
import Reveal from './Reveal';
import MagneticButton from './ui/MagneticButton';
import { useResume } from '@/hooks/usePortfolioData';

const RESUME_FALLBACK = '/arjun-kumar-resume.pdf';

export default function Resume() {
  const { data: resumes } = useResume();

  /* Backend returns an array; first item (sorted by version desc) is the active/latest */
  const activeResume = resumes.find((r) => r.isActive) ?? resumes[0];
  const resumeUrl    = activeResume?.fileUrl ?? RESUME_FALLBACK;
  const resumeName   = activeResume?.fileName ?? 'Arjun-Kumar-Resume.pdf';

  return (
    <section id="resume" className="section-pad bg-[var(--bg)]">
      <div className="container-lg">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="section-eyebrow">06</span>
            <span className="w-5 h-px" style={{ background: 'var(--border-2)' }} />
            <span className="section-eyebrow">Resume</span>
          </div>
        </Reveal>

        <Reveal>
          <div className="surface overflow-hidden">
            <div className="flex flex-col md:flex-row">

              {/* Content */}
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-between gap-8">
                <div>
                  <h2
                    className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                    style={{ color: 'var(--text-1)' }}
                  >
                    Full professional<br />background
                  </h2>
                  <p className="text-base leading-relaxed max-w-[40ch]" style={{ color: 'var(--text-2)' }}>
                    A complete overview of my skills, projects, education, and experience.
                    Available to download as a PDF.
                  </p>
                </div>

                <div>
                  {/* Meta row */}
                  <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8">
                    {[
                      { label: 'Version', value: activeResume ? `v${activeResume.version}` : 'Latest' },
                      { label: 'Format',  value: 'PDF' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                          {label}
                        </p>
                        <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--text-1)' }}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <MagneticButton
                      as="a"
                      href={resumeUrl}
                      download={resumeName}
                      className="btn-primary"
                      aria-label="Download resume PDF"
                    >
                      <Download size={15} aria-hidden="true" />
                      Download PDF
                    </MagneticButton>
                    <MagneticButton
                      as="a"
                      href="https://linkedin.com/in/arjun-kumar-gond"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      aria-label="View LinkedIn profile"
                    >
                      <Linkedin size={15} aria-hidden="true" />
                      LinkedIn
                    </MagneticButton>
                    <MagneticButton
                      as="a"
                      href="#contact"
                      className="btn-ghost"
                      aria-label="Request resume via email"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <Mail size={15} aria-hidden="true" />
                      Request via email
                    </MagneticButton>
                  </div>
                </div>
              </div>

              {/* Document mockup */}
              <div
                className="hidden md:flex flex-shrink-0 w-64 lg:w-80 items-center justify-center p-8"
                style={{ background: 'var(--surface-2)', borderLeft: '1px solid var(--border)' }}
                aria-hidden="true"
              >
                <div
                  className="w-full rounded-xl p-5 shadow-lg"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  {/* Mock header */}
                  <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    >
                      AK
                    </div>
                    <div>
                      <div className="h-2.5 rounded w-20 mb-1.5" style={{ background: 'var(--surface-3)' }} />
                      <div className="h-2 rounded w-28" style={{ background: 'var(--surface-3)' }} />
                    </div>
                  </div>
                  {/* Mock content lines */}
                  {[7, 5, 6, 4, 7, 5, 6].map((w, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded mb-2"
                      style={{
                        background: 'var(--surface-3)',
                        width: `${w * 13}%`,
                        opacity: 0.6 + i * 0.05,
                      }}
                    />
                  ))}
                  <div className="flex items-center gap-2 mt-4">
                    <FileText size={12} style={{ color: 'var(--accent)' }} />
                    <span className="text-[10px] font-mono" style={{ color: 'var(--text-3)' }}>
                      {resumeName}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
