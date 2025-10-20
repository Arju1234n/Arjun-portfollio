import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const manual = localStorage.getItem('theme_manual') === 'true';
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (manual && savedTheme) return savedTheme as Theme;
    const hour = new Date().getHours();
    return hour >= 19 || hour < 7 ? 'dark' : 'light';
  });
  const [manual, setManual] = useState<boolean>(() => localStorage.getItem('theme_manual') === 'true');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('theme_manual', manual ? 'true' : 'false');
  }, [manual]);

  useEffect(() => {
    if (manual) return;
    const updateByTime = () => {
      const hour = new Date().getHours();
      const target: Theme = hour >= 19 || hour < 7 ? 'dark' : 'light';
      setTheme(prev => (prev === target ? prev : target));
    };
    updateByTime();
    const id = setInterval(updateByTime, 15 * 60 * 1000);
    return () => clearInterval(id);
  }, [manual]);

  const toggleTheme = () => {
    setManual(true);
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

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
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-purple-700" />
      ) : (
        <Sun size={20} className="text-yellow-400" />
      )}
    </button>
  );
};