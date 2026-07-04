// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--bg)', color: 'var(--text-1)' }}
    >
      <div className="text-center">
        <h1
          className="text-8xl font-bold mb-4"
          style={{ color: 'var(--accent)' }}
        >
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-2)' }}>
          Page Not Found
        </h2>
        <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--text-3)' }}>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back home.
        </p>
        <Link href="/" className="btn-primary">
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
