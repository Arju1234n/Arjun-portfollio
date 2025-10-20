import { useEffect, useState } from 'react';

type ToastMsg = { id: number; text: string };

declare global {
  interface WindowEventMap {
    toast: CustomEvent<{ text: string }>;
  }
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    let id = 0;
    const onToast = (e: CustomEvent<{ text: string }>) => {
      const myId = ++id;
      setToasts((prev) => [...prev, { id: myId, text: e.detail.text }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== myId)), 2200);
    };
    window.addEventListener('toast', onToast as EventListener);
    return () => window.removeEventListener('toast', onToast as EventListener);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-[110] space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="px-4 py-2 rounded-xl shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 text-sm text-gray-800 dark:text-gray-100"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
