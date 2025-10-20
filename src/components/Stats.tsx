import { useEffect, useRef, useState } from 'react';
import { Trophy, Code, Clock, GraduationCap } from 'lucide-react';

const counters = [
  { icon: Clock, label: 'Years Learning', value: 2, color: 'from-purple-500 to-pink-500' },
  { icon: Code, label: 'Technologies', value: 12, color: 'from-blue-500 to-cyan-500' },
  { icon: GraduationCap, label: 'Certifications', value: 4, color: 'from-green-500 to-emerald-500' },
  { icon: Trophy, label: 'Achievements', value: 6, color: 'from-orange-500 to-red-500' },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/30 transition-colors duration-300" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 mx-auto rounded-full animate-shimmer" />
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {counters.map((c, i) => (
            <div key={c.label} className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-800">
              <div className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-r ${c.color} flex items-center justify-center text-white shadow-md`}>
                <c.icon size={22} />
              </div>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                {visible ? (
                  <AnimatedNumber target={c.value} duration={1000 + i * 300} />
                ) : (
                  0
                )}
                <span className="text-xl align-top ml-1">{c.label === 'Years Learning' ? '+' : ''}</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedNumber({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return <span>{value}</span>;
}
