'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, FolderKanban, Briefcase, Cpu, GraduationCap, Award, MessageSquare, Image, FileText, BarChart3, Globe, Settings, BookOpen, Sparkles, User } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

const commands = [
  { id: 'dashboard',      label: 'Dashboard',      href: '/',             icon: LayoutDashboard, category: 'Navigate' },
  { id: 'hero',           label: 'Hero Manager',   href: '/hero',         icon: Sparkles,        category: 'Navigate' },
  { id: 'about',          label: 'About Manager',  href: '/about',        icon: User,            category: 'Navigate' },
  { id: 'projects',       label: 'Projects',        href: '/projects',     icon: FolderKanban,    category: 'Navigate' },
  { id: 'experience',     label: 'Experience',      href: '/experience',   icon: Briefcase,       category: 'Navigate' },
  { id: 'skills',         label: 'Skills',          href: '/skills',       icon: Cpu,             category: 'Navigate' },
  { id: 'education',      label: 'Education',       href: '/education',    icon: GraduationCap,   category: 'Navigate' },
  { id: 'certifications', label: 'Certifications',  href: '/certifications', icon: Award,        category: 'Navigate' },
  { id: 'blog',           label: 'Blog',            href: '/blog',         icon: BookOpen,        category: 'Navigate' },
  { id: 'resume',         label: 'Resume',          href: '/resume',       icon: FileText,        category: 'Navigate' },
  { id: 'media',          label: 'Media Library',   href: '/media',        icon: Image,           category: 'Navigate' },
  { id: 'messages',       label: 'Messages',        href: '/messages',     icon: MessageSquare,   category: 'Navigate' },
  { id: 'analytics',      label: 'Analytics',       href: '/analytics',    icon: BarChart3,       category: 'Navigate' },
  { id: 'seo',            label: 'SEO Settings',    href: '/seo',          icon: Globe,           category: 'Navigate' },
  { id: 'settings',       label: 'Settings',        href: '/settings',     icon: Settings,        category: 'Navigate' },
];

export function CommandPalette() {
  const { commandPaletteOpen, closeCommandPalette } = useUIStore();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query.trim()
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()))
    : commands;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        useUIStore.getState().toggleCommandPalette();
      }
      if (e.key === 'Escape') closeCommandPalette();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeCommandPalette]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelected(0);
    }
  }, [commandPaletteOpen]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter') {
      const cmd = filtered[selected];
      if (cmd) { router.push(cmd.href); closeCommandPalette(); }
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={closeCommandPalette}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
          >
            <div className="mx-4 rounded-2xl overflow-hidden shadow-2xl" style={{ background: 'var(--bg-1)', border: '1px solid var(--border)' }}>
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid var(--border)' }}>
                <Search size={16} style={{ color: 'var(--text-3)' }} />
                <input
                  ref={inputRef}
                  id="cmd-palette-input"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setSelected(0); }}
                  onKeyDown={onKeyDown}
                  placeholder="Search pages, actions…"
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--text-1)' }}
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-3)', color: 'var(--text-3)' }}>ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <p className="text-center text-sm py-6" style={{ color: 'var(--text-3)' }}>No results for &ldquo;{query}&rdquo;</p>
                ) : (
                  filtered.map((cmd, i) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        id={`cmd-${cmd.id}`}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all"
                        style={{
                          background: i === selected ? 'var(--accent-bg)' : 'transparent',
                          color: i === selected ? 'var(--accent-2)' : 'var(--text-2)',
                        }}
                        onMouseEnter={() => setSelected(i)}
                        onClick={() => { router.push(cmd.href); closeCommandPalette(); }}
                      >
                        <Icon size={15} className="flex-shrink-0" />
                        <span className="text-sm font-medium">{cmd.label}</span>
                        <span className="ml-auto text-xs" style={{ color: 'var(--text-3)' }}>{cmd.category}</span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2 flex gap-4" style={{ borderTop: '1px solid var(--border)', color: 'var(--text-3)' }}>
                {[['↑↓', 'Navigate'], ['↵', 'Open'], ['ESC', 'Close']].map(([key, action]) => (
                  <span key={action} className="flex items-center gap-1 text-[10px]">
                    <kbd className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: 'var(--bg-3)' }}>{key}</kbd>
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
