'use client';
// src/components/ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/** Determine the current preferred theme based on time-of-day or saved preference (client only) */
function resolveTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const manual = localStorage.getItem('theme_manual') === 'true';
  const saved = localStorage.getItem('theme') as Theme | null;
  if (manual && (saved === 'light' || saved === 'dark')) return saved;
  const hour = new Date().getHours();
  return hour >= 19 || hour < 7 ? 'dark' : 'light';
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lazy initialisers read localStorage once on first render (client only),
  // avoiding synchronous setState calls inside useEffect.
  const [theme, setTheme] = useState<Theme>(() =>
    typeof window !== 'undefined' ? resolveTheme() : 'light'
  );
  const [manual, setManual] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? localStorage.getItem('theme_manual') === 'true'
      : false
  );
  const [mounted, setMounted] = useState(false);

  // Mark as mounted after first client render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme class to <html> and persist
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme_manual', manual ? 'true' : 'false');
  }, [manual, mounted]);

  // Auto update theme based on time-of-day (unless user manually overrode)
  useEffect(() => {
    if (!mounted || manual) return;
    const updateByTime = () => {
      const hour = new Date().getHours();
      const target: Theme = hour >= 19 || hour < 7 ? 'dark' : 'light';
      setTheme((prev) => (prev === target ? prev : target));
    };
    const id = setInterval(updateByTime, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, [manual, mounted]);

  const toggleTheme = useCallback(() => {
    setManual(true);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-lg transition-all duration-150 focus:outline-none"
      style={{ color: 'var(--text-3)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--text-1)';
        (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = 'var(--text-3)';
        (e.currentTarget as HTMLElement).style.background = 'transparent';
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};