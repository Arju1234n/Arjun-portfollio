// src/hooks/useReducedMotion.ts
// Shared hook that returns a ref indicating whether the user prefers reduced motion.
// Eliminates the duplicated matchMedia logic in Hero.tsx and CursorTrail.tsx.

import { useEffect, useRef } from 'react';

export function useReducedMotion(): React.RefObject<boolean> {
  const ref = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      ref.current = mq.matches;
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return ref;
}
