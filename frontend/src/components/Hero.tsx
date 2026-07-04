'use client';
// src/components/Hero.tsx
// Premium split-screen hero: left text content, right animated terminal + stat cards.
// Data fetched live from backend API — falls back to static values while loading.

import React, { useEffect, useState } from 'react';
import {
  Download, Github, Linkedin, Mail, ChevronDown, ExternalLink, MapPin,
} from 'lucide-react';
import HeroTerminal from './HeroTerminal';
import { useHero, useStats, useResume } from '@/hooks/usePortfolioData';

export default function Hero() {
  const { data: hero }  = useHero();
  const { data: stats } = useStats();
  const { data: resumes } = useResume();

  const activeResume = resumes.find((r) => r.isActive) ?? resumes[0];
  const resumeUrl = activeResume?.fileUrl ?? '#contact';

  const [roleIdx, setRoleIdx]   = useState(0);
  const [fading, setFading]     = useState(false);
  const [mounted, setMounted]   = useState(false);

  const roles = hero.roles?.length ? hero.roles : ['Full-Stack Developer'];

  useEffect(() => { setMounted(true); }, []);

  /* Crossfade role switcher */
  useEffect(() => {
    if (roles.length <= 1) return;
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % roles.length);
        setFading(false);
      }, 300);
    }, 2800);
    return () => clearInterval(id);
  }, [roles.length]);

  /* stat cards: prefer live API stats, fall back to hero.stats, then defaults */
  const statCards = stats.length
    ? stats.map((s) => ({ value: `${s.value}${s.suffix ?? ''}`, label: s.label }))
    : (hero.stats?.length
        ? hero.stats
        : [
            { value: '3+', label: 'Projects shipped' },
            { value: '12+', label: 'Technologies' },
            { value: '2+', label: 'Years coding' },
          ]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-[var(--bg)] overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--border) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.5,
        }}
      />

      {/* Accent glow top-center */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, var(--accent-glow), transparent)',
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container-lg w-full pt-28 pb-16 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

            {/* ─── LEFT: Text content ─── */}
            <div
              className={`space-y-7 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              {/* Open to work badge */}
              {hero.openToWork && (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold"
                  style={{
                    background: 'var(--green-bg)',
                    borderColor: 'rgba(22,163,74,0.25)',
                    color: 'var(--green)',
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping-sm absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  Available for opportunities
                </div>
              )}

              {/* Name */}
              <div>
                <p
                  className="font-mono text-[11px] tracking-[0.15em] uppercase mb-3"
                  style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono, monospace)' }}
                >
                  Hi, I&apos;m
                </p>
                <h1
                  className="font-extrabold tracking-tight leading-[0.95]"
                  style={{
                    fontSize: 'clamp(3.25rem, 8vw, 6rem)',
                    color: 'var(--text-1)',
                  }}
                >
                  {(hero.name ?? 'Arjun Kumar').split(' ')[0]}
                  <br />
                  <span style={{ color: 'var(--accent)' }}>
                    {(hero.name ?? 'Arjun Kumar').split(' ').slice(1).join(' ') || 'Kumar'}
                  </span>
                </h1>
              </div>

              {/* Crossfade role */}
              <div className="flex items-center gap-2.5 h-6">
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--accent)' }}
                />
                <span
                  className="text-base font-medium transition-all duration-300"
                  style={{
                    color: 'var(--text-2)',
                    opacity: fading ? 0 : 1,
                    transform: fading ? 'translateY(4px)' : 'translateY(0)',
                  }}
                >
                  {roles[roleIdx]}
                </span>
              </div>

              {/* Bio */}
              <p className="text-base leading-relaxed max-w-[46ch]" style={{ color: 'var(--text-2)' }}>
                {hero.bio || "B.Tech CSE student at GEC Bhojpur (2023–2027), building production-grade web apps with the MERN stack."}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-3)' }}>
                <MapPin size={13} aria-hidden="true" />
                {hero.location || 'Arrah, Bihar, India'}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a href="#projects" className="btn-primary" aria-label="View my projects">
                  View Projects
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
                <a
                  href={resumeUrl}
                  download={activeResume ? (activeResume.fileName ?? 'Arjun-Kumar-Resume.pdf') : undefined}
                  className="btn-ghost"
                  aria-label="Download resume PDF"
                >
                  <Download size={14} aria-hidden="true" />
                  Resume
                </a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-0.5">
                {[
                  { href: 'https://github.com/Arju1234n',            Icon: Github,   label: 'GitHub' },
                  { href: 'https://linkedin.com/in/arjun-kumar-gond', Icon: Linkedin, label: 'LinkedIn' },
                  { href: 'mailto:kumararjun5230@gmail.com',          Icon: Mail,     label: 'Email' },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="p-2 rounded-lg transition-all duration-150"
                    style={{ color: 'var(--text-3)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-1)';
                      (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-3)';
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: Terminal + stat cards ─── */}
            <div
              className={`flex flex-col gap-4 transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            >
              {/* Terminal — hidden on small mobile, shown from sm up */}
              <div className="w-full overflow-hidden hidden sm:block">
                <HeroTerminal />
              </div>

              {/* Stat cards row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {statCards.map(({ value, label }) => (
                  <div
                    key={label}
                    className="surface-sm p-2 sm:p-3 text-center hover-lift"
                    style={{ borderRadius: 'var(--r-lg)' }}
                  >
                    <p
                      className="text-lg sm:text-2xl font-extrabold tracking-tight"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {value}
                    </p>
                    <p
                      className="text-[10px] sm:text-[11px] mt-0.5 leading-snug"
                      style={{ color: 'var(--text-3)' }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={`relative z-10 flex flex-col items-center gap-1.5 pb-8 transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      >
        <span
          className="text-[10px] tracking-[0.18em] uppercase"
          style={{ fontFamily: 'var(--font-mono, monospace)', color: 'var(--text-3)' }}
        >
          Scroll
        </span>
        <ChevronDown size={14} className="animate-bounce" style={{ color: 'var(--text-3)' }} />
      </div>
    </section>
  );
}
