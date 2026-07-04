'use client';
import { Menu, Search, Sun, Moon, Bell } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useTheme } from 'next-themes';

interface HeaderProps { title?: string; }

export function Header({ title }: HeaderProps) {
  const { toggleSidebar, toggleCommandPalette } = useUIStore();
  const { theme, setTheme } = useTheme();

  return (
    <header
      className="h-14 flex items-center gap-3 px-4 flex-shrink-0"
      style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-1)' }}
    >
      {/* Mobile menu */}
      <button
        id="mobile-menu-btn"
        onClick={toggleSidebar}
        className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-3)] transition-colors"
        style={{ color: 'var(--text-3)' }}
      >
        <Menu size={18} />
      </button>

      {/* Title */}
      {title && (
        <h1 className="text-sm font-semibold hidden md:block" style={{ color: 'var(--text-1)' }}>
          {title}
        </h1>
      )}

      {/* Search pill */}
      <button
        id="cmd-palette-btn"
        onClick={toggleCommandPalette}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ml-auto mr-2 hidden md:flex"
        style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <Search size={13} />
        <span className="text-xs">Search…</span>
        <kbd className="text-[10px] px-1 py-0.5 rounded" style={{ background: 'var(--bg-3)', color: 'var(--text-3)' }}>⌘K</kbd>
      </button>

      {/* Theme toggle */}
      <button
        id="theme-toggle-btn"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-lg hover:bg-[var(--bg-3)] transition-colors"
        style={{ color: 'var(--text-3)' }}
        title="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Notifications */}
      <button
        id="notifications-btn"
        className="relative p-2 rounded-lg hover:bg-[var(--bg-3)] transition-colors"
        style={{ color: 'var(--text-3)' }}
        title="Notifications"
      >
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
      </button>
    </header>
  );
}
