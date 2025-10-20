import { useEffect, useMemo, useState } from 'react';

const sections = ['about', 'education', 'skills', 'resume', 'contact'];

export default function SectionDots({ position = 'right' }: { position?: 'left' | 'right' }) {
  const [active, setActive] = useState('about');

  const observers = useMemo(() => new Map<string, IntersectionObserver>(), []);

  useEffect(() => {
    const updateActive = (id: string) => setActive(id);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) updateActive(id);
          });
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.set(id, obs);
    });
    return () => {
      observers.forEach((obs) => obs.disconnect());
      observers.clear();
    };
  }, [observers]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 ${position === 'right' ? 'right-4 md:right-6' : 'left-4 md:left-6'} z-30`}
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-3 md:gap-4">
        {sections.map((id) => (
          <li key={id}>
            <button
              aria-label={`Go to ${id}`}
              title={id.charAt(0).toUpperCase() + id.slice(1)}
              onClick={() => handleClick(id)}
              className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full transition-all duration-300 border-2 ${
                active === id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-[0_0_0_4px_rgba(168,85,247,0.15)]'
                  : 'bg-gray-300/70 dark:bg-gray-600/70 border-transparent hover:bg-gray-400/80 dark:hover:bg-gray-500/80'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
