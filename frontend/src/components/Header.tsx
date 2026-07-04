'use client';
// src/components/Header.tsx
// Linear / Vercel–style floating navigation.
// Transparent at top → glass pill on scroll.

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Command } from 'lucide-react';
import { ThemeToggle } from './ThemeProvider';
import { NAV_ITEMS } from '@/data/navigation';

const VISIBLE_ITEMS = NAV_ITEMS.filter(
  (i) => !['home', 'stats', 'certifications', 'resume'].includes(i.id)
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const [activeId, setActiveId]  = useState('home');

  /* ── Scroll state ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section tracking ── */
  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.id);
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Close menu on outside click ── */
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('header')) setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openCmd = useCallback(() => {
    const mac = /mac/i.test(navigator.userAgent);
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'k', metaKey: mac, ctrlKey: !mac, bubbles: true })
    );
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:pointer-events-auto"
        style={{ background: 'var(--accent)', color: '#fff' }}
      >
        Skip to main content
      </a>

      {/* Nav pill */}
      <nav
        aria-label="Main navigation"
        className={`
          pointer-events-auto w-full max-w-3xl flex items-center justify-between
          px-4 h-12 rounded-full border
          transition-all duration-300
          ${scrolled
            ? 'bg-[var(--surface)]/85 dark:bg-[var(--surface)]/85 backdrop-blur-xl border-[var(--border)] shadow-[var(--shadow)]'
            : 'bg-[var(--surface)]/60 backdrop-blur-md border-[var(--border)]/60'
          }
        `}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-2.5 flex-shrink-0 focus:outline-none"
          aria-label="Go to top"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'var(--accent)' }}
          >
            AK
          </div>
          <span
            className="hidden sm:block text-sm font-semibold tracking-tight"
            style={{ color: 'var(--text-1)' }}
          >
            Arjun Kumar
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {VISIBLE_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className={`
                  relative px-3 py-1.5 rounded-full text-sm font-medium
                  transition-all duration-200 focus:outline-none focus-visible:ring-2
                  ${isActive
                    ? 'text-[var(--text-1)]'
                    : 'text-[var(--text-3)] hover:text-[var(--text-2)]'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          {/* ⌘K */}
          <button
            onClick={openCmd}
            className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium border transition-all duration-150 focus:outline-none"
            style={{
              color: 'var(--text-3)',
              borderColor: 'var(--border)',
              background: 'transparent',
            }}
            title="Open command palette"
            aria-label="Open Command Palette"
          >
            <Command size={11} />
            <span>K</span>
          </button>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1.5 rounded-lg transition-all duration-150 focus:outline-none"
            style={{ color: 'var(--text-2)' }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="pointer-events-auto absolute top-[68px] left-4 right-4 rounded-2xl border shadow-xl overflow-hidden animate-scale-in"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="p-3 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.href)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors duration-150"
                style={{ color: activeId === item.id ? 'var(--accent)' : 'var(--text-2)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <item.icon size={15} aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}