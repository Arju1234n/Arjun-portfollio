'use client';
// src/components/Footer.tsx
// Ultra-minimal single-row footer — Linear / Vercel aesthetic.

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const SOCIAL = [
  { name: 'GitHub',   icon: Github,   href: 'https://github.com/Arju1234n' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/arjun-kumar-gond' },
  { name: 'Email',    icon: Mail,     href: 'mailto:kumararjun5230@gmail.com' },
];

export default function Footer() {
  return (
    <footer
      className="border-t py-6"
      style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}
    >
      <div className="container-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Left: copyright */}
          <p className="text-sm" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()}{' '}
            <span style={{ color: 'var(--text-2)' }}>Arjun Kumar</span>
            {' '}· Built with Next.js &amp; Tailwind CSS
          </p>

          {/* Right: social + back to top */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={name}
                className="p-1.5 rounded-md transition-all duration-150"
                style={{ color: 'var(--text-3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
              >
                <Icon size={15} aria-hidden="true" />
              </a>
            ))}

            <div className="w-px h-4 mx-1" style={{ background: 'var(--border)' }} aria-hidden="true" />

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="p-1.5 rounded-md border transition-all duration-150"
              style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-1)';
                (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-3)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <ArrowUp size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}