import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-[width] duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
