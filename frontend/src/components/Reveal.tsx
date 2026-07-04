'use client';
// src/components/Reveal.tsx
// Scroll-reveal wrapper using IntersectionObserver.
// Respects prefers-reduced-motion (shows content immediately if motion is reduced).
import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  // Use a ref for reduced-motion so we avoid setState synchronously in the effect
  const reducedMotionRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    // Safe SSR: default false; will be corrected in effect
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;

    if (mq.matches) {
      // Use queueMicrotask to defer the setState out of the synchronous effect body
      queueMicrotask(() => {
        setReducedMotion(true);
        setShow(true);
      });
      return;
    }

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

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
      if (e.matches) {
        setReducedMotion(true);
        setShow(true);
        obs.disconnect();
      }
    };
    mq.addEventListener('change', onMotionChange);

    return () => {
      obs.disconnect();
      mq.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={
        `${className} ` +
        (reducedMotion
          ? ''
          : `transition-all duration-700 ease-out will-change-transform ${
              show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`)
      }
    >
      {children}
    </div>
  );
}
