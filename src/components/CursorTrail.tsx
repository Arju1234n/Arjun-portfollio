import { useEffect, useRef, useState } from 'react';

type Dot = { x: number; y: number; id: number };

export default function CursorTrail() {
  const [dots, setDots] = useState<Dot[]>([]);
  const idRef = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => (reduced.current = mq.matches);
    set();
    mq.addEventListener?.('change', set);
    return () => mq.removeEventListener?.('change', set);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (reduced.current) return;
      const id = ++idRef.current;
      setDots((prev) => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id }]);
      // cleanup each dot after 500ms
      setTimeout(() => {
        setDots((prev) => prev.filter((d) => d.id !== id));
      }, 500);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove as any);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {dots.map((d, i) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-40"
          style={{
            left: d.x - 4,
            top: d.y - 4,
            width: 8 + i,
            height: 8 + i,
            filter: 'blur(1px)',
            transition: 'opacity 300ms ease, transform 300ms ease',
            transform: `translateZ(0)`
          }}
        />)
      )}
    </div>
  );
}
