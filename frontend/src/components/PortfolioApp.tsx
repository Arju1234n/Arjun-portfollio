'use client';
// src/components/PortfolioApp.tsx
import { useEffect } from 'react';
import Header           from './Header';
import Hero             from './Hero';
import About            from './About';
import Experience       from './Experience';
import Projects         from './Projects';
import Skills           from './Skills';
import Stats            from './Stats';
import Certifications   from './Certifications';
import Resume           from './Resume';
import Contact          from './Contact';
import Footer           from './Footer';
import { ThemeProvider } from './ThemeProvider';
import ThemeScroll      from './ThemeScroll';
import CommandPalette   from './CommandPalette';
import ScrollProgress   from './ScrollProgress';
import CursorTrail      from './CursorTrail';
import SectionDots      from './SectionDots';
import Toast            from './Toast';

export default function PortfolioApp() {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(
      `${apiUrl}/api/v1/analytics/pageview`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: '/', referrer: document.referrer }),
      }
    ).catch(() => {});
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen theme-transition">
        {/* ── Global chrome ── */}
        <ScrollProgress />
        <CursorTrail />
        <SectionDots />
        <Toast />

        {/* ── Navigation ── */}
        <Header />
        <CommandPalette />

        {/* ── Page sections ── */}
        <main id="main-content">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Stats />
          <Certifications />
          <Resume />
          <Contact />
        </main>

        <Footer />
        <ThemeScroll />
      </div>
    </ThemeProvider>
  );
}
