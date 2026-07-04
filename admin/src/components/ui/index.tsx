'use client';
import { cn } from '@/lib/utils';
import { Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

// ── Button ────────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}
export function Button({ variant = 'primary', size = 'md', loading, icon, children, className, disabled, ...props }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm', lg: 'px-5 py-3 text-base' };
  const variants = {
    primary: 'bg-[var(--accent)] hover:opacity-90 text-white',
    ghost:   'bg-[var(--bg-2)] hover:bg-[var(--bg-3)] text-[var(--text-2)] hover:text-[var(--text-1)] border border-[var(--border)]',
    danger:  'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
    outline: 'border border-[var(--accent)] text-[var(--accent-2)] hover:bg-[var(--accent-bg)]',
  };
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}

// ── Input ─────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}
export function Input({ label, error, icon, className, id, ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-3)' }}>{icon}</span>}
        <input
          id={id}
          className={cn(
            'w-full py-2.5 text-sm rounded-lg outline-none transition-all',
            icon ? 'pl-9 pr-4' : 'px-3',
            className
          )}
          style={{
            background: 'var(--bg-2)',
            border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`,
            color: 'var(--text-1)',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = error ? 'var(--red)' : 'var(--accent)'; }}
          onBlur={e  => { e.currentTarget.style.borderColor = error ? 'var(--red)' : 'var(--border)'; }}
          {...props}
        />
      </div>
      {error && <p className="text-xs" style={{ color: 'var(--red)' }}>{error}</p>}
    </div>
  );
}

// ── Textarea ──────────────────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{label}</label>}
      <textarea
        id={id}
        className={cn('w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-all resize-none', className)}
        style={{ background: 'var(--bg-2)', border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`, color: 'var(--text-1)' }}
        onFocus={e => { e.currentTarget.style.borderColor = error ? 'var(--red)' : 'var(--accent)'; }}
        onBlur={e  => { e.currentTarget.style.borderColor = error ? 'var(--red)' : 'var(--border)'; }}
        {...props}
      />
      {error && <p className="text-xs" style={{ color: 'var(--red)' }}>{error}</p>}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
interface BadgeProps { children: React.ReactNode; color?: 'purple' | 'green' | 'red' | 'amber' | 'blue' | 'gray'; }
export function Badge({ children, color = 'purple' }: BadgeProps) {
  const colors = {
    purple: { bg: 'var(--accent-bg)', text: 'var(--accent-2)', border: 'var(--accent-border)' },
    green:  { bg: 'rgba(34,197,94,0.1)', text: '#22c55e', border: 'rgba(34,197,94,0.2)' },
    red:    { bg: 'rgba(239,68,68,0.1)', text: '#ef4444',  border: 'rgba(239,68,68,0.2)' },
    amber:  { bg: 'rgba(245,158,11,0.1)',text: '#f59e0b', border: 'rgba(245,158,11,0.2)' },
    blue:   { bg: 'rgba(59,130,246,0.1)',text: '#3b82f6',  border: 'rgba(59,130,246,0.2)' },
    gray:   { bg: 'var(--bg-3)',         text: 'var(--text-3)', border: 'var(--border)' },
  };
  const c = colors[color];
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {children}
    </span>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
interface ModalProps { open: boolean; onClose: () => void; title: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl'; }
export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={cn('fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full p-4', widths[size])}
          >
            <div className="glass p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-base" style={{ color: 'var(--text-1)' }}>{title}</h2>
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--bg-3)] transition-colors" style={{ color: 'var(--text-3)' }}>
                  <X size={16} />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── ConfirmDialog ─────────────────────────────────────────────────────────────
interface ConfirmProps { open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; loading?: boolean; }
export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }: ConfirmProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm mb-6" style={{ color: 'var(--text-2)' }}>{message}</p>
      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>Delete</Button>
      </div>
    </Modal>
  );
}

// ── EmptyState ────────────────────────────────────────────────────────────────
interface EmptyProps { icon?: React.ReactNode; title: string; description?: string; action?: React.ReactNode; }
export function EmptyState({ icon, title, description, action }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="mb-4 opacity-30">{icon}</div>}
      <p className="font-semibold text-sm" style={{ color: 'var(--text-1)' }}>{title}</p>
      {description && <p className="text-sm mt-1 max-w-xs" style={{ color: 'var(--text-3)' }}>{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ── PageHeader ────────────────────────────────────────────────────────────────
interface PageHeaderProps { title: string; description?: string; action?: React.ReactNode; }
export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-1)' }}>{title}</h1>
        {description && <p className="text-sm mt-0.5" style={{ color: 'var(--text-3)' }}>{description}</p>}
      </div>
      {action}
    </div>
  );
}

// ── TagInput ──────────────────────────────────────────────────────────────────
interface TagInputProps { tags: string[]; onChange: (tags: string[]) => void; placeholder?: string; label?: string; }
export function TagInput({ tags, onChange, placeholder = 'Add item…', label }: TagInputProps) {
  const [val, setVal] = React.useState('');
  const add = () => {
    const t = val.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setVal('');
  };
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-3)' }}>{label}</label>}
      <div className="flex gap-2">
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-sm rounded-lg outline-none"
          style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', color: 'var(--text-1)' }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
          onBlur={e =>  (e.currentTarget.style.borderColor = 'var(--border)')}
        />
        <Button size="sm" variant="outline" onClick={add}>Add</Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map(t => (
            <span key={t} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md"
              style={{ background: 'var(--bg-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}>
              {t}
              <button onClick={() => onChange(tags.filter(x => x !== t))} style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}>
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
