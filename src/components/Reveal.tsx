import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShow(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        `${className} transition-all duration-700 ease-out will-change-transform ` +
        (show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')
      }
    >
      {children}
    </div>
  );
}
