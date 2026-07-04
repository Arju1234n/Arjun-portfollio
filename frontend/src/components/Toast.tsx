'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';

type ToastMsg = { id: number; text: string; type?: 'success' | 'error' | 'info' };

declare global {
  interface WindowEventMap {
    toast: CustomEvent<{ text: string; type?: 'success' | 'error' | 'info' }>;
  }
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => {
    let id = 0;
    const onToast = (e: CustomEvent<{ text: string; type?: 'success' | 'error' | 'info' }>) => {
      const myId = ++id;
      setToasts((prev) => [...prev, { id: myId, text: e.detail.text, type: e.detail.type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== myId)), 3000);
    };
    window.addEventListener('toast', onToast as EventListener);
    return () => window.removeEventListener('toast', onToast as EventListener);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[110] flex flex-col gap-2 max-w-sm w-full" aria-live="polite">
      {toasts.map((t) => {
        const isError   = t.type === 'error';
        const isSuccess = t.type === 'success' || !t.type;
        const Icon = isError ? XCircle : isSuccess ? CheckCircle : Info;
        const iconColor = isError ? 'var(--red)' : isSuccess ? 'var(--green)' : 'var(--accent)';
        return (
          <div
            key={t.id}
            role="alert"
            className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm animate-fade-up"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-1)',
              boxShadow: 'var(--shadow-lg)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Icon size={15} style={{ color: iconColor, flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
            <span style={{ color: 'var(--text-2)' }}>{t.text}</span>
          </div>
        );
      })}
    </div>
  );
}
