// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arjunkumargond.dev'),
  title: {
    default: 'Arjun Kumar — Full-Stack Developer',
    template: '%s | Arjun Kumar',
  },
  description:
    'Portfolio of Arjun Kumar, B.Tech CSE student at GEC Bhojpur (2023–2027). MERN Stack Developer specialising in React, Node.js, and scalable web applications.',
  keywords: [
    'Arjun Kumar',
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Node.js Developer',
    'SmartCart AI',
    'Hospital Management System',
    'GEC Bhojpur',
    'Bihar',
    'India',
    'Portfolio',
  ],
  authors: [{ name: 'Arjun Kumar', url: 'https://github.com/Arju1234n' }],
  creator: 'Arjun Kumar',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://arjunkumargond.dev',
    title: 'Arjun Kumar — Full-Stack Developer',
    description:
      'B.Tech CSE student building production-grade MERN apps. Check out SmartCart AI, Loan Approval Platform, Hospital Management System, and more.',
    siteName: 'Arjun Kumar — Portfolio',
    images: [{ url: '/arjun.jpg', width: 800, height: 800, alt: 'Arjun Kumar' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arjun Kumar — Full-Stack Developer',
    description: 'MERN Stack Developer & AI enthusiast from Bihar, India.',
    images: ['/arjun.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f9f9' },
    { media: '(prefers-color-scheme: dark)',  color: '#080808' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var manual = localStorage.getItem('theme_manual') === 'true';
                  var saved = localStorage.getItem('theme');
                  var theme;
                  if (manual && (saved === 'light' || saved === 'dark')) {
                    theme = saved;
                  } else {
                    var h = new Date().getHours();
                    theme = (h >= 19 || h < 7) ? 'dark' : 'light';
                  }
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-[var(--bg)] text-[var(--text-1)] scrollbar-thin">
        {children}
      </body>
    </html>
  );
}
