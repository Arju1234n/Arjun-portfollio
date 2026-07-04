'use client';
// src/components/About.tsx
// Apple-style Bento Grid layout.
// Data fetched live from backend API — bio, timeline, careerGoals, learningJourney.

import React from 'react';
import Reveal from './Reveal';
import SpotlightCard from './ui/SpotlightCard';
import { GraduationCap, Code2, Zap, Heart, Coffee, MapPin, Sparkles } from 'lucide-react';
import { useAbout } from '@/hooks/usePortfolioData';

export default function About() {
  const { data: about } = useAbout();

  /* Parse learningJourney string into array items */
  const learningItems: string[] = about.learningJourney
    ? about.learningJourney.split(',').map((s) => s.trim()).filter(Boolean)
    : ['System Design & Scalability', 'AI Integration with MERN', 'Cloud & DevOps basics', 'TypeScript patterns'];

  /* Timeline — backend stores { year, event }, frontend used { year, title, body } */
  const timeline = about.timeline?.length
    ? about.timeline
    : [
        { year: '2021', event: 'Started with HTML, CSS & JavaScript. Built first static websites.' },
        { year: '2023', event: 'Enrolled in B.Tech CSE. Joined coding clubs, started MERN development.' },
        { year: 'Jun 2025', event: 'Professional MERN training at CDAC Patna. Shipped Hospital Management System.' },
        { year: 'Now', event: 'Crafting production apps, learning system design, AI integration, and cloud patterns.' },
      ];

  const goalText = about.careerGoals || 'Long-term goal: Senior SDE at a top tech company.';

  return (
    <section id="about" className="section-pad bg-[var(--bg)]">
      <div className="container-lg">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="section-eyebrow">01</span>
            <span className="w-5 h-px" style={{ background: 'var(--border-2)' }} />
            <span className="section-eyebrow">About</span>
          </div>
        </Reveal>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

          {/* ─── Cell 1 (large): Bio ─── */}
          <Reveal className="md:col-span-2">
            <SpotlightCard className="bento-cell h-full p-8">
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight mb-5"
                style={{ color: 'var(--text-1)', lineHeight: '1.15' }}
              >
                Building for the web,<br />
                <span style={{ color: 'var(--accent)' }}>one layer at a time.</span>
              </h2>

              <div className="space-y-3 text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {about.bio
                  ? about.bio.split('\n').filter(Boolean).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
                  : (
                    <>
                      <p>
                        Hi, I&apos;m <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>Arjun Kumar</span> — a 2nd-year
                        Computer Science student at Government Engineering College, Bhojpur.
                        I specialise in building modern, full-stack web applications with the{' '}
                        <span style={{ color: 'var(--accent)' }}>MERN stack</span>.
                      </p>
                      <p>
                        I enjoy solving real-world problems through code and regularly sharpen my{' '}
                        <span style={{ color: 'var(--accent)' }}>DSA</span> skills. My work spans from
                        hospital systems to AI-powered shopping carts — always focused on clean architecture
                        and real user value.
                      </p>
                    </>
                  )
                }
              </div>

              {/* Quick facts */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { Icon: GraduationCap, text: 'B.Tech CSE 2023–2027' },
                  { Icon: MapPin,        text: 'Arrah, Bihar' },
                  { Icon: Code2,         text: 'MERN Stack' },
                  { Icon: Heart,         text: 'Gym & Startups' },
                  { Icon: Coffee,        text: 'Best ideas with coffee' },
                ].map(({ Icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                    style={{
                      background: 'var(--surface-2)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-2)',
                    }}
                  >
                    <Icon size={11} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    {text}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* ─── Cell 2: Identity card ─── */}
          <Reveal>
            <SpotlightCard
              className="bento-cell h-full p-6 flex flex-col gap-5"
              style={{ minHeight: '280px' }}
            >
              {/* Avatar */}
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-20 h-20 rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 0 3px var(--surface), 0 0 0 5px var(--border)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/arjun.jpg"
                    alt="Arjun Kumar"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-bold text-base" style={{ color: 'var(--text-1)' }}>
                    Arjun Kumar
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-3)' }}>
                    Full-Stack Developer
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'var(--green-bg)', color: 'var(--green)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--green)' }}
                  />
                  Open to work
                </span>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid var(--border)' }} />

              {/* Links */}
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Contact me', href: '#contact', primary: true },
                  { label: 'View Resume', href: '#resume', primary: false },
                ].map(({ label, href, primary }) => (
                  <a
                    key={label}
                    href={href}
                    className={primary ? 'btn-primary text-sm py-2 justify-center' : 'btn-ghost text-sm py-2 justify-center'}
                    onClick={e => {
                      e.preventDefault();
                      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* ─── Cell 3: Journey timeline ─── */}
          <Reveal className="md:col-span-2">
            <SpotlightCard className="bento-cell p-8">
              <div className="flex items-center gap-2 mb-6">
                <Zap size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>
                  My Journey
                </p>
              </div>

              <div
                className="relative pl-5"
                style={{ borderLeft: '1px solid var(--border)' }}
              >
                <div className="space-y-6">
                  {timeline.map(({ year, event }, idx) => {
                    const isCurrent = idx === timeline.length - 1;
                    return (
                      <div key={year} className="relative">
                        {/* Timeline dot */}
                        <span
                          className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2"
                          style={{
                            background: isCurrent ? 'var(--accent)' : 'var(--surface)',
                            borderColor: isCurrent ? 'var(--accent)' : 'var(--border-2)',
                          }}
                          aria-hidden="true"
                        />

                        <p
                          className="text-[10px] font-mono font-semibold tracking-widest uppercase mb-0.5"
                          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono, monospace)' }}
                        >
                          {year}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-3)' }}>
                          {event}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* ─── Cell 4: Currently learning ─── */}
          <Reveal>
            <SpotlightCard
              className="bento-cell p-6 flex flex-col gap-4"
              style={{ minHeight: '280px' }}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--text-3)' }}>
                  Currently exploring
                </p>
              </div>

              <div className="space-y-2.5 flex-1">
                {learningItems.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg text-sm font-medium"
                    style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: i === 0 ? 'var(--accent)' : 'var(--border-2)',
                        boxShadow: i === 0 ? '0 0 6px var(--accent)' : 'none',
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>

              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                {goalText}
              </p>
            </SpotlightCard>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
