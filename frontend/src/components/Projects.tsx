'use client';
// src/components/Projects.tsx
// Premium project showcase fetching live data from GET /projects.

import React from 'react';
import Link from 'next/link';
import { Github, ExternalLink, ArrowRight, Star } from 'lucide-react';
import Reveal from './Reveal';
import { useFeaturedProjects, type ApiProject } from '@/hooks/usePortfolioData';

/* Map backend status ('published','draft','archived') → display label */
const STATUS_MAP: Record<string, { label: string; color: string }> = {
  published: { label: 'Live',        color: 'var(--green)' },
  draft:     { label: 'In Progress', color: 'var(--amber)' },
  archived:  { label: 'Completed',   color: 'var(--accent)' },
  /* legacy front-end values kept for fallback static data */
  live:          { label: 'Live',        color: 'var(--green)' },
  'in-progress': { label: 'In Progress', color: 'var(--amber)' },
  completed:     { label: 'Completed',   color: 'var(--accent)' },
};

/* Deterministic gradient based on project index / category */
const GRADIENTS = [
  'from-blue-500 via-cyan-500 to-teal-500',
  'from-purple-500 via-pink-500 to-rose-500',
  'from-green-500 via-emerald-500 to-cyan-500',
  'from-orange-500 via-amber-500 to-yellow-500',
  'from-indigo-500 via-violet-500 to-purple-500',
];

/* ── Featured project card ── */
function FeaturedCard({ project, index }: { project: ApiProject; index: number }) {
  const reverse = index % 2 !== 0;
  const status  = STATUS_MAP[project.status] ?? { label: project.status, color: 'var(--text-3)' };
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <Reveal>
      <article className="surface overflow-hidden hover-lift" style={{ minHeight: '260px' }}>
        <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} h-full`}>

          {/* Visual panel */}
          <div
            className={`relative flex-shrink-0 md:w-72 lg:w-96 flex items-center justify-center min-h-[180px] bg-gradient-to-br ${gradient}`}
          >
            {/* Cover image if available */}
            {project.coverImage
              ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover absolute inset-0"
                />
              ) : null}

            {/* Shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0" />

            {!project.coverImage && (
              <span className="text-sm font-semibold uppercase tracking-wider text-white/80 relative z-10">
                {project.category}
              </span>
            )}

            {/* Featured badge */}
            {project.featured && (
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-yellow-300 text-xs font-bold">
                <Star size={10} fill="currentColor" />
                Featured
              </div>
            )}

            {/* Status */}
            <div className="absolute bottom-3 right-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.color }} />
                {status.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between flex-1 p-7 md:p-8">
            <div>
              <p
                className="text-xs font-mono font-semibold tracking-widest uppercase mb-2"
                style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono, monospace)' }}
              >
                Project {String(index + 1).padStart(2, '0')}
              </p>
              <h3
                className="text-2xl font-bold tracking-tight mb-3"
                style={{ color: 'var(--text-1)' }}
              >
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-2)' }}>
                {project.shortDescription}
              </p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
                  style={{ color: 'var(--text-3)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                  aria-label={`${project.title} GitHub repository`}
                >
                  <Github size={15} aria-hidden="true" />
                  Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150"
                  style={{ color: 'var(--accent)' }}
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  Live Demo
                </a>
              )}
              {!project.githubUrl && !project.liveUrl && (
                <span className="text-sm italic" style={{ color: 'var(--text-3)' }}>Links coming soon</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ── Other project compact card ── */
function OtherCard({ project, index }: { project: ApiProject; index: number }) {
  const status = STATUS_MAP[project.status] ?? { label: project.status, color: 'var(--text-3)' };
  return (
    <Reveal>
      <article className="surface hover-lift p-5 flex items-start gap-4">
        {/* Number */}
        <span
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ background: 'var(--surface-2)', color: 'var(--text-3)', fontFamily: 'var(--font-mono, monospace)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <h3 className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-1)' }}>
              {project.title}
            </h3>
            <span
              className="flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold"
              style={{ color: status.color }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: status.color }} />
              {status.label}
            </span>
          </div>
          <p className="text-xs leading-relaxed mb-2.5" style={{ color: 'var(--text-3)' }}>
            {project.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 3).map((tech) => (
                <span key={tech} className="tech-chip">{tech}</span>
              ))}
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-3)' }}
                className="transition-colors duration-150"
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                aria-label={`${project.title} GitHub`}
              >
                <Github size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ── Main section ── */
export default function Projects() {
  const { data: projects, loading, error } = useFeaturedProjects();

  const featured = projects.filter((p) => p.featured && p.status === 'published');

  return (
    <section id="projects" className="section-pad bg-[var(--bg)]">
      <div className="container-lg">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="section-eyebrow">03</span>
            <span className="w-5 h-px" style={{ background: 'var(--border-2)' }} />
            <span className="section-eyebrow">Projects</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
            style={{ color: 'var(--text-1)' }}
          >
            What I&apos;ve built
          </h2>
          <p className="text-base mb-12" style={{ color: 'var(--text-3)' }}>
            A selection of things I&apos;ve shipped.
          </p>
        </Reveal>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-5 mb-14">
            {[1, 2, 3].map((i) => (
              <div key={i} className="surface h-64 animate-pulse rounded-xl" />
            ))}
          </div>
        )}

        {/* Featured projects */}
        {!loading && featured.length > 0 && (
          <div className="space-y-5 mb-14">
            {featured.map((p, i) => (
              <FeaturedCard key={p._id} project={p} index={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <Reveal>
            <div className="surface p-6 rounded-xl mb-14">
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--red)' }}>
                Unable to load projects
              </p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-3)' }}>
                {error}
              </p>
            </div>
          </Reveal>
        )}

        {/* Empty state */}
        {!loading && !error && projects.length === 0 && (
          <Reveal>
            <p className="text-base mb-14" style={{ color: 'var(--text-3)' }}>
              Projects are being prepared — check back soon!
            </p>
          </Reveal>
        )}

        {/* GitHub CTA */}
        <Reveal>
          <Link href="/projects" className="btn-ghost group inline-flex">
            <Github size={16} aria-hidden="true" />
            View all projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
