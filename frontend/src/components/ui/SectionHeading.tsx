'use client';
// src/components/ui/SectionHeading.tsx
// Linear / Vercel–style section heading: monospace eyebrow + large title + optional subtitle.

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  label?: string;
  number?: string;    // e.g. "01"
  align?: 'left' | 'center';
  className?: string;
  /** @deprecated kept for backward compat */
  gradientClass?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  label,
  number,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const center = align === 'center';

  return (
    <div className={`mb-12 ${center ? 'text-center' : 'text-left'} ${className}`}>
      {/* Eyebrow row */}
      {(label || number) && (
        <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
          {number && (
            <span className="section-eyebrow opacity-40">{number}</span>
          )}
          {number && label && (
            <span className="w-4 h-px bg-[var(--border-2)]" aria-hidden="true" />
          )}
          {label && (
            <span className="section-eyebrow">{label}</span>
          )}
        </div>
      )}

      {/* Title */}
      <h2
        className="text-4xl md:text-5xl font-bold tracking-tight"
        style={{ color: 'var(--text-1)', lineHeight: '1.1' }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="mt-3 text-base leading-relaxed max-w-[52ch]"
          style={{ color: 'var(--text-2)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
