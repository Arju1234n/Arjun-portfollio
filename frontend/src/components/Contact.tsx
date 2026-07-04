'use client';
// src/components/Contact.tsx
// Split layout: left side has contact info + social links; right has form.
// Magnetic send button and floating-label inputs for a premium feel.

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, FileDown, Github, Linkedin } from 'lucide-react';
import Reveal from './Reveal';
import MagneticButton from './ui/MagneticButton';

const CONTACT_INFO = [
  { icon: Mail,   title: 'Email',    value: 'kumararjun5230@gmail.com', link: 'mailto:kumararjun5230@gmail.com', copy: 'kumararjun5230@gmail.com' },
  { icon: Phone,  title: 'Phone',    value: '+91 6201539833',           link: 'tel:+916201539833',              copy: '+916201539833' },
  { icon: MapPin, title: 'Location', value: 'Arrah, Bihar, India',      link: undefined,                        copy: undefined },
] as const;

const SOCIAL = [
  { name: 'GitHub',   icon: Github,   href: 'https://github.com/Arju1234n' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/arjun-kumar-gond' },
  { name: 'Email',    icon: Mail,     href: 'mailto:kumararjun5230@gmail.com' },
];

const INPUT_CLS = `
  w-full px-4 py-3 rounded-lg border text-sm
  bg-[var(--surface)] text-[var(--text-1)]
  placeholder:text-[var(--text-3)]
  focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40 focus:border-[var(--accent)]
  transition-all duration-150
`;

export default function Contact() {
  const [form, setForm]         = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [copiedKey, setCopied]  = useState<string | null>(null);
  const [submitting, setSub]    = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required.';
    if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(form.email)) e.email = 'Valid email required.';
    if (!form.subject.trim()) e.subject = 'Subject is required.';
    if (form.message.trim().length < 10) e.message = 'At least 10 characters.';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: '' }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSub(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      window.dispatchEvent(new CustomEvent('toast', {
        detail: {
          text: data.success ? "Message sent! I'll reply soon." : (data.error ?? 'Something went wrong.'),
          type: data.success ? 'success' : 'error',
        },
      }));
      if (data.success) setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Network error. Please try again.', type: 'error' } }));
    } finally {
      setSub(false);
    }
  };

  const copy = async (key: string, value: string) => {
    try { await navigator.clipboard.writeText(value); } catch { return; }
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section id="contact" className="section-pad" style={{ background: 'var(--surface-2)' }}>
      <div className="container-lg">

        {/* Section label */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <span className="section-eyebrow">07</span>
            <span className="w-5 h-px" style={{ background: 'var(--border-2)' }} />
            <span className="section-eyebrow">Contact</span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">

          {/* ── Left: info ── */}
          <div className="space-y-8">
            <Reveal>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ color: 'var(--text-1)', lineHeight: '1.1' }}
              >
                Let&apos;s work<br />
                <span style={{ color: 'var(--accent)' }}>together.</span>
              </h2>
            </Reveal>

            <Reveal>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Whether you&apos;re looking for a developer for your next project, have a question,
                or just want to say hello — my inbox is always open.
              </p>
            </Reveal>

            {/* Contact rows */}
            <Reveal>
              <div className="space-y-2">
                {CONTACT_INFO.map((info) => (
                  <div
                    key={info.title}
                    className="surface-sm flex items-center gap-4 px-5 py-3.5 hover-lift"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--accent-subtle)' }}
                    >
                      <info.icon size={14} style={{ color: 'var(--accent)' }} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-3)' }}>
                        {info.title}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-sm font-medium truncate block transition-colors duration-150"
                          style={{ color: 'var(--text-1)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-1)')}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-sm font-medium" style={{ color: 'var(--text-1)' }}>{info.value}</span>
                      )}
                    </div>
                    {info.copy && (
                      <button
                        onClick={() => copy(info.title, info.copy!)}
                        className="p-1.5 rounded-md transition-all duration-150"
                        style={{ color: 'var(--text-3)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-1)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                        aria-label={`Copy ${info.title}`}
                      >
                        {copiedKey === info.title
                          ? <Check size={13} style={{ color: 'var(--green)' }} />
                          : <Copy size={13} />
                        }
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Social + vCard */}
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {SOCIAL.map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-150"
                    style={{ color: 'var(--text-2)', borderColor: 'var(--border)', background: 'var(--surface)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-2)';
                    }}
                    aria-label={name}
                  >
                    <Icon size={14} aria-hidden="true" />
                    {name}
                  </a>
                ))}
                <a
                  href="/arjun-kumar.vcf"
                  download
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-150"
                  style={{ color: 'var(--text-2)', borderColor: 'var(--border)', background: 'var(--surface)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-2)';
                  }}
                >
                  <FileDown size={14} aria-hidden="true" />
                  vCard
                </a>
              </div>
            </Reveal>
          </div>

          {/* ── Right: form ── */}
          <Reveal>
            <div className="surface p-7">
              <h3 className="text-base font-bold mb-5" style={{ color: 'var(--text-1)' }}>
                Send a message
              </h3>

              <form onSubmit={onSubmit} noValidate aria-busy={submitting} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-2)' }}>
                      Name <span style={{ color: 'var(--red)' }}>*</span>
                    </label>
                    <input
                      type="text" id="name" name="name" value={form.name} onChange={onChange}
                      required aria-invalid={!!errors.name}
                      placeholder="Arjun Kumar"
                      className={INPUT_CLS}
                      style={{ borderColor: errors.name ? 'var(--red)' : 'var(--border)' }}
                    />
                    {errors.name && <p role="alert" className="mt-1 text-xs" style={{ color: 'var(--red)' }}>{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-2)' }}>
                      Email <span style={{ color: 'var(--red)' }}>*</span>
                    </label>
                    <input
                      type="email" id="email" name="email" value={form.email} onChange={onChange}
                      required aria-invalid={!!errors.email}
                      placeholder="you@example.com"
                      className={INPUT_CLS}
                      style={{ borderColor: errors.email ? 'var(--red)' : 'var(--border)' }}
                    />
                    {errors.email && <p role="alert" className="mt-1 text-xs" style={{ color: 'var(--red)' }}>{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-2)' }}>
                    Subject <span style={{ color: 'var(--red)' }}>*</span>
                  </label>
                  <input
                    type="text" id="subject" name="subject" value={form.subject} onChange={onChange}
                    required aria-invalid={!!errors.subject}
                    placeholder="Project enquiry / Opportunity / Hello"
                    className={INPUT_CLS}
                    style={{ borderColor: errors.subject ? 'var(--red)' : 'var(--border)' }}
                  />
                  {errors.subject && <p role="alert" className="mt-1 text-xs" style={{ color: 'var(--red)' }}>{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-2)' }}>
                    Message <span style={{ color: 'var(--red)' }}>*</span>
                  </label>
                  <textarea
                    id="message" name="message" value={form.message} onChange={onChange}
                    required rows={5} aria-invalid={!!errors.message}
                    placeholder="Hi Arjun, I'd love to..."
                    className={`${INPUT_CLS} resize-none`}
                    style={{ borderColor: errors.message ? 'var(--red)' : 'var(--border)' }}
                  />
                  {errors.message && <p role="alert" className="mt-1 text-xs" style={{ color: 'var(--red)' }}>{errors.message}</p>}
                </div>

                {/* Submit */}
                <MagneticButton
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-3 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  {submitting ? (
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                  ) : (
                    <Send size={15} aria-hidden="true" />
                  )}
                  {submitting ? 'Sending…' : 'Send Message'}
                </MagneticButton>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
