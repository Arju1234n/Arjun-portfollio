'use client';
// src/components/SectionDivider.tsx — slim horizontal rule, no wavy SVG
export default function SectionDivider({ flip: _flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden="true" className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
  );
}
