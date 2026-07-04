'use client';
// src/components/CommandPalette.tsx
// Redesigned to match the new dark glass aesthetic.
// Keyboard: ⌘K opens, Esc closes, ↑↓ navigates, Enter selects.

import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { NAV_ITEMS } from '@/data/navigation';
import { Search } from 'lucide-react';

export default function CommandPalette() {
  const [open, setOpen]     = useState(false);
  const [query, setQuery]   = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef            = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(q)) : [...NAV_ITEMS];
  }, [query]);

  /* Reset cursor when list changes */
  useEffect(() => { setCursor(0); }, [filtered]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setCursor(0);
  }, []);

  const navigate = useCallback((href: string) => {
    close();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, [close]);

  /* Global keyboard: open/close + arrow nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        close();
      } else if (open) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setCursor((c) => Math.min(c + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setCursor((c) => Math.max(c - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filtered[cursor]) navigate(filtered[cursor].href);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, cursor, close, navigate]);

  /* Auto-focus input */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        {/* Search input row */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <Search size={15} style={{ color: 'var(--text-3)' }} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections…"
            aria-label="Search sections"
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--text-1)' }}
          />
          <kbd
            className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
            style={{ color: 'var(--text-3)', borderColor: 'var(--border)', background: 'var(--surface-2)' }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="py-1.5 max-h-72 overflow-auto" role="listbox">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-sm text-center" style={{ color: 'var(--text-3)' }}>
              No sections match &ldquo;{query}&rdquo;
            </p>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.href}
              role="option"
              aria-selected={i === cursor}
              onClick={() => navigate(item.href)}
              onMouseEnter={() => setCursor(i)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors duration-100"
              style={{
                color: i === cursor ? 'var(--text-1)' : 'var(--text-2)',
                background: i === cursor ? 'var(--surface-2)' : 'transparent',
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: i === cursor ? 'var(--accent-subtle)' : 'var(--surface-3)' }}
              >
                <item.icon size={13} style={{ color: i === cursor ? 'var(--accent)' : 'var(--text-3)' }} aria-hidden="true" />
              </div>
              <span className="font-medium">{item.label}</span>
              {i === cursor && (
                <kbd
                  className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded border"
                  style={{ color: 'var(--text-3)', borderColor: 'var(--border)', background: 'var(--surface-3)' }}
                >
                  ↵
                </kbd>
              )}
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div
          className="flex items-center gap-4 px-4 py-2.5 text-[10px]"
          style={{ borderTop: '1px solid var(--border)', color: 'var(--text-3)' }}
        >
          <span className="flex items-center gap-1">
            <kbd className="font-mono px-1 py-0.5 rounded border" style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}>↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="font-mono px-1 py-0.5 rounded border" style={{ borderColor: 'var(--border)', background: 'var(--surface-2)' }}>↵</kbd>
            Select
          </span>
        </div>
      </div>
    </div>
  );
}
