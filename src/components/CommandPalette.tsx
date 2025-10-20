import { useEffect, useMemo, useState } from 'react';

type Item = { name: string; href: string };

const items: Item[] = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(i => i.name.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const handleSelect = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative mx-auto mt-32 w-full max-w-xl px-4">
        <div className="overflow-hidden rounded-2xl border border-purple-200/40 dark:border-purple-800/40 shadow-2xl">
          <div className="bg-white dark:bg-gray-900">
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search sections..."
              className="w-full px-4 py-3 bg-transparent outline-none text-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="max-h-72 overflow-auto bg-white/90 dark:bg-gray-900/90">
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">No matches</div>
            )}
            {filtered.map(i => (
              <button
                key={i.href}
                onClick={() => handleSelect(i.href)}
                className="w-full text-left px-4 py-3 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-800 dark:text-gray-100"
              >
                {i.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">Press Esc to close</div>
      </div>
    </div>
  );
}
