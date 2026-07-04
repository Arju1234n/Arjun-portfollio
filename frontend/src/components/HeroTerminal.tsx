'use client';
// src/components/HeroTerminal.tsx
// macOS-style animated terminal panel for the Hero section right column.
// Shows a typing sequence of dev commands — pure React / CSS, zero dependencies.

import React, { useEffect, useState } from 'react';

interface Line {
  type: 'prompt' | 'output' | 'blank';
  prompt?: string;
  path?: string;
  cmd?: string;
  content?: string;
  contentClass?: string;
  delay: number; // ms from start before this line appears
}

const LINES: Line[] = [
  { type: 'prompt', path: '~/portfolio', cmd: 'npm run dev', delay: 400 },
  { type: 'output', content: '▲ Next.js 15 — ready in 1.2s', contentClass: 't-success', delay: 1000 },
  { type: 'blank', delay: 1400 },
  { type: 'prompt', path: '~/portfolio', cmd: 'git log --oneline -3', delay: 1800 },
  { type: 'output', content: 'a3f1c9b feat: hero redesign done', contentClass: 't-output', delay: 2200 },
  { type: 'output', content: 'e82d041 fix: mobile nav animation', contentClass: 't-output', delay: 2400 },
  { type: 'output', content: '9c7b3e2 chore: upgrade deps', contentClass: 't-output', delay: 2600 },
  { type: 'blank', delay: 2900 },
  { type: 'prompt', path: '~/portfolio', cmd: 'whoami', delay: 3200 },
  { type: 'output', content: 'arjun-kumar  •  full-stack developer', contentClass: 't-string', delay: 3600 },
];

export default function HeroTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1);
        if (line.type === 'prompt') setTyping(true);
        if (line.type === 'output' || line.type === 'blank') setTyping(false);
      }, line.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal-window w-full shadow-2xl" role="presentation" aria-hidden="true">
      {/* Title bar */}
      <div className="terminal-titlebar">
        <span className="terminal-dot-r" />
        <span className="terminal-dot-y" />
        <span className="terminal-dot-g" />
        <span className="terminal-title ml-3">arjun@portfolio — zsh</span>
      </div>

      {/* Body */}
      <div className="terminal-body min-h-[200px]">
        {LINES.slice(0, visibleCount).map((line, i) => {
          const isLast = i === visibleCount - 1;

          if (line.type === 'blank') {
            return <div key={i} className="h-[0.5em]" />;
          }

          if (line.type === 'prompt') {
            return (
              <div key={i} className="flex items-center gap-1 whitespace-pre-wrap">
                <span className="t-prompt font-semibold">❯</span>
                <span className="t-path mr-1">{line.path}</span>
                <span className="t-cmd">{line.cmd}</span>
                {isLast && typing && <span className="t-cursor" />}
              </div>
            );
          }

          return (
            <div key={i} className={`${line.contentClass ?? 't-output'} pl-2`}>
              {line.content}
            </div>
          );
        })}

        {/* Idle cursor at end when all done */}
        {visibleCount >= LINES.length && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className="t-prompt font-semibold">❯</span>
            <span className="t-cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
