import React, { useEffect, useRef, useState } from 'react';
import { Download, Briefcase, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const titles = ['Aspiring Software Engineer', 'Full-Stack Developer', 'Tech Explorer'];
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [parallax, setParallax] = useState<React.CSSProperties>({ transform: 'translate3d(0,0,0)' });
  const reducedRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => (reducedRef.current = mq.matches);
    set();
    mq.addEventListener?.('change', set);
    return () => mq.removeEventListener?.('change', set);
  }, []);
  useEffect(() => {
    const full = titles[targetIndex()];
    const speed = deleting ? 50 : 90;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === full) {
          setTimeout(() => setDeleting(true), 1000);
        }
      } else {
        const next = full.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next.length === 0) {
          setDeleting(false);
          setTitleIndex((i) => (i + 1) % titles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, deleting]);
  const targetIndex = () => titleIndex % titles.length;
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0..1
    const y = (e.clientY - rect.top) / rect.height; // 0..1
    const tx = (x - 0.5) * 20; // max 10px each side scaled up slightly
    const ty = (y - 0.5) * 20;
    setParallax({ transform: `translate3d(${tx}px, ${ty}px, 0)` });
  };
  const handleMouseLeave = () => {
    if (reducedRef.current) return;
    setParallax({ transform: 'translate3d(0,0,0)' });
  };
  const [ctaStyle, setCtaStyle] = useState<React.CSSProperties | undefined>();
  const onCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setCtaStyle({ transform: `translate(${x * 6}px, ${y * 6}px)` });
  };
  const onCtaLeave = () => setCtaStyle({ transform: 'translate(0,0)' });
  const [imgTilt, setImgTilt] = useState<React.CSSProperties | undefined>({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)' });
  const onImgMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; // 0..1
    const y = (e.clientY - r.top) / r.height; // 0..1
    const rx = (0.5 - y) * 10; // -5..5
    const ry = (x - 0.5) * 10; // -5..5
    setImgTilt({ transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)` });
  };
  const onImgLeave = () => setImgTilt({ transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)' });
  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300" id="home">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/30 transition-colors duration-300">
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 transition-colors duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/30 to-purple-100/30 dark:via-purple-500/10 dark:to-pink-500/10 animate-gradient transition-colors duration-300"></div>
      </div>

      {/* Floating Elements - Modern Style with Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={parallax}>
        {/* Larger primary blob */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-purple-300/30 to-pink-300/30 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full filter blur-3xl opacity-60 animate-blob transition-colors duration-300"></div>
        
        {/* Secondary blob with different animation */}
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-tr from-blue-300/30 to-cyan-300/30 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full filter blur-3xl opacity-60 animate-blob-slow transition-colors duration-300" style={{ animationDelay: '2s' }}></div>
        
        {/* Tertiary blob */}
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gradient-to-bl from-pink-300/30 to-purple-300/30 dark:from-pink-500/20 dark:to-purple-500/20 rounded-full filter blur-3xl opacity-60 animate-blob transition-colors duration-300" style={{ animationDelay: '4s' }}></div>
        
        {/* Small accent blobs */}
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 dark:from-yellow-500/20 dark:to-orange-500/20 rounded-full filter blur-xl opacity-70 animate-float transition-colors duration-300" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-green-300/30 to-emerald-300/30 dark:from-green-500/20 dark:to-emerald-500/20 rounded-full filter blur-xl opacity-70 animate-float-slow transition-colors duration-300" style={{ animationDelay: '3s' }}></div>
        
        {/* Decorative geometric shapes */}
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-purple-400/30 dark:border-purple-500/30 rounded-lg transform rotate-45 animate-float-slow transition-colors duration-300"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 border-2 border-pink-400/30 dark:border-pink-500/30 rounded-lg transform -rotate-12 animate-float transition-colors duration-300" style={{ animationDelay: '2.5s' }}></div>
        
        {/* Code brackets */}
        <div className="absolute top-1/4 right-16 text-5xl font-mono text-blue-400/20 dark:text-blue-500/20 transform -rotate-12 animate-float-slow transition-colors duration-300" style={{ animationDelay: '1.5s' }}>{ '{' }</div>
        <div className="absolute bottom-1/4 left-16 text-5xl font-mono text-blue-400/20 dark:text-blue-500/20 transform rotate-12 animate-float transition-colors duration-300" style={{ animationDelay: '3.5s' }}>{ '}' }</div>
        
        {/* Circles with dots pattern */}
        <div className="absolute top-40 left-16 w-20 h-20 rounded-full border border-dashed border-cyan-400/20 dark:border-cyan-500/20 animate-spin-slow transition-colors duration-300" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-40 right-16 w-24 h-24 rounded-full border border-dashed border-purple-400/20 dark:border-purple-500/20 animate-spin-slow transition-colors duration-300" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image - Modern Conic Ring + Glass Frame */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative inline-block" onMouseMove={onImgMove} onMouseLeave={onImgLeave} style={imgTilt}>
              {/* Outer conic gradient ring */}
              <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto">
                <div className="absolute -inset-1 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-purple-500 via-pink-500 to-blue-500 animate-spin-slow blur-[2px] opacity-80"></div>
                {/* Inner glass frame */}
                <div className="relative w-full h-full rounded-full p-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-white/40 dark:border-gray-700/50 shadow-xl">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <img
                      src="/arjun.jpg"
                      alt="Portrait of Arjun Kumar"
                      loading="eager"
                      className="w-full h-full object-cover rounded-full"
                    />
                    {/* subtle vignette */}
                    <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/10 via-transparent to-black/0"></div>
                  </div>
                </div>
                {/* Online/status dot */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center shadow-md">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Title - Modern Typography */}

          {/* Hero Title - Modern Typography */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent transition-colors duration-300 relative">
              Arjun Kumar
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 rounded-full opacity-70 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
            </span>
          </h1>

          {/* Modern Subheadline with Enhanced Typography */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 transition-colors duration-300 tracking-wide">
              <span className="font-semibold">Aspiring Software Engineer</span> | <span className="font-semibold">Full-Stack Developer</span> | <span className="font-semibold">Tech Explorer</span>
            </p>
            <div className="mt-3 flex justify-center items-center space-x-3">
              <span className="h-1 w-16 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500 rounded-full"></span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">MERN Specialist & UI/UX Enthusiast</span>
              <span className="h-1 w-16 bg-gradient-to-r from-pink-400 to-blue-400 dark:from-pink-500 dark:to-blue-500 rounded-full"></span>
            </div>
          </div>

          <div className="mb-10">
            <div className="text-2xl md:text-3xl font-bold text-center">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                {displayed}
                <span className="animate-pulse">▌</span>
              </span>
            </div>
          </div>

          {/* Modern Professional Quote with Enhanced Styling */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <blockquote className="relative text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-10 py-6 transition-colors duration-300 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <span className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-purple-400 dark:text-purple-500 opacity-80 font-serif">❝</span>
              <p className="font-light leading-relaxed tracking-wide">Passionate student developer crafting digital experiences with code. Building tomorrow's solutions with innovative thinking and modern technologies.</p>
              <span className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 text-5xl text-purple-400 dark:text-purple-500 opacity-80 font-serif">❞</span>
              <div className="mt-4 flex items-center justify-end">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-400 dark:to-purple-500 mr-3"></div>
                <footer className="text-right text-sm font-medium text-gray-600 dark:text-gray-400">Arjun Kumar</footer>
              </div>
            </blockquote>
          </div>

          {/* Stats removed per request */}
          
          {/* Tech Stack Icons */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-4 font-medium">Tech Stack</p>
            <div className="flex flex-wrap justify-center gap-5">
              {/* React */}
              <div className="group relative w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-500 dark:text-blue-400 transition-transform duration-300 group-hover:rotate-12">
                  <path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85-1.03 0-1.87-.85-1.87-1.85 0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.36-.82 1.82-.31 3.96a22.7 22.7 0 002.4-.36c.48-.67.99-1.31 1.51-1.9z" />
                </svg>
              </div>
              
              {/* Node.js */}
              <div className="group relative w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-green-600 dark:text-green-500 transition-transform duration-300 group-hover:rotate-12">
                  <path fill="currentColor" d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.23 0L10 19.65c-.08-.03-.16-.04-.21-.01-.53.3-.63.36-1.12.51-.12.04-.31.11.07.32l2.48 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14 8c-2.12 0-3.39.89-3.39 2.39 0 1.61 1.26 2.08 3.3 2.28 2.43.24 2.62.6 2.62 1.08 0 .83-.67 1.18-2.23 1.18-1.98 0-2.4-.49-2.55-1.47a.226.226 0 00-.22-.18h-.96c-.12 0-.21.09-.21.22 0 1.24.68 2.74 3.94 2.74 2.35 0 3.7-.93 3.7-2.55 0-1.61-1.08-2.03-3.37-2.34-2.31-.3-2.54-.46-2.54-1 0-.45.2-1.05 1.91-1.05 1.5 0 2.09.33 2.32 1.36.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07.04-.04.07-.1.05-.16C19.25 8.57 17.89 8 14 8z" />
                </svg>
              </div>
              
              {/* MongoDB */}
              <div className="group relative w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-green-600 dark:text-green-500 transition-transform duration-300 group-hover:rotate-12">
                  <path fill="currentColor" d="M17.18 9.518c-1.263-5.56-4.242-7.387-4.562-8.086C12.266.939 11.885 0 11.885 0c-.002.019-.004.031-.005.049v.013h-.001c-.002.015-.003.025-.004.039v.015h-.002c0 .01-.002.018-.002.026v.026h-.003c-.001.008-.001.018-.003.025v.021h-.002c0 .007 0 .015-.002.021v.02h-.002c0 .01-.001.022-.002.032v.002c-.003.017-.006.034-.009.05v.008h-.002c-.001.004-.003.008-.003.012v.017h-.003v.022h-.005v.018h-.005v.021h-.004v.019h-.004v.017h-.006v.014h-.004v.018h-.004v.014h-.005v.013H11.8v.015h-.004c-.001.001-.001.003-.001.004v.01h-.003c-.001.002-.001.004-.001.006v.006h-.002c-.001.003-.002.008-.002.01-.003.007-.007.014-.01.021v.002c-.002.002-.004.005-.005.007v.008h-.004v.008h-.005v.008h-.003v.01h-.006v.014h-.004v.004h-.004v.008h-.004v.011h-.004v.008h-.006v.011h-.004v.008h-.005v.008h-.003v.01h-.005v.008h-.004v.006h-.004v.008h-.006V.76h-.004v.006h-.005v.008h-.004v.011h-.005v.004h-.003v.008h-.006v.004h-.004v.01h-.004v.004h-.004v.008h-.005v.006h-.003l-.002.004v.004h-.002c-.001.002-.002.002-.002.004v.001h-.001c-.001.003-.002.005-.004.007v.003h-.001c-.005.006-.008.012-.012.018v.001c-.002.002-.007.006-.009.01v.002h-.001c-.001.001-.003.002-.003.003v.003h-.002l-.003.003v.001h-.001c0 .001-.002.002-.003.004v.004h-.003l-.002.002v.002h-.002c0 .002-.002.002-.002.003v.003h-.004c0 .001-.001.002-.002.003V.92h-.003v.004h-.004V.93h-.004v.008h-.005V.93h-.005v.004h-.004V.94h-.005v.008h-.005v.004h-.004v.006h-.004v.004h-.004V.97h-.006v.004h-.004V.98h-.005v.004h-.004v.005h-.005v.01h-.002v.004h-.006v.005h-.004v.002h-.004v.004h-.005v.01h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.005v.004h-.004v.004h-.004v.01h-.004v.005h-.006v.004h-.004v.004h-.005v.006h-.004v.004h-.005v.007h-.004v.004h-.004v.006h-.006V1.1h-.002v.004h-.004v.004h-.005v.004h-.004v.006h-.005v.004h-.003c-.001.001-.001.002-.001.002v.002h-.002l-.004.004s-.002.002-.004.003v.006h-.004v.005h-.004v.004h-.004v.004h-.003l-.003.003v.003h-.002l-.002.002v.003h-.002c-.005.006-.007.01-.014.016-.002.002-.008.007-.012.01-.012.008-.027.021-.039.032-.008.005-.016.012-.022.017v.001h-.001c-.016.013-.031.025-.049.039v.001c-.024.02-.047.039-.074.062V1.34h-.002c-.057.047-.117.1-.186.159V1.5h-.001c-.169.148-.37.338-.595.568l-.015.015-.004.004C9 3.494 6.857 6.426 6.631 11.164c-.02.392-.016.773.006 1.144v.009c.109 1.867.695 3.461 1.428 4.756v.001c.292.516.607.985.926 1.405v.001c1.102 1.455 2.227 2.317 2.514 2.526.441 1.023.4 2.779.4 2.779l.644.215s-.131-1.701.053-2.522c.057-.257.192-.476.349-.662.106-.075.42-.301.797-.645.018-.019.028-.036.044-.054 1.521-1.418 4.362-4.91 3.388-10.599z" />
                </svg>
              </div>
              
              {/* Express.js */}
              <div className="group relative w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-600/10 dark:from-gray-400/20 dark:to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-12">
                  <path fill="currentColor" d="M24 18.588a1.529 1.529 0 01-1.543 1.5c-1.105 0-1.19-.91-1.24-1.366l.004-.165c-.004-1.187-.061-2.048-.124-2.67a5.19 5.19 0 00-.086-.592c-.667-3.297-3.033-3.97-4.149-4.064-.05-.004-.097-.007-.145-.007h-8.14v2.839h4.427c.875 0 1.687.177 1.687 1.214 0 .575-.224 1.175-.56 1.562-.431.487-.96.66-1.674.66H8.673v2.839h1.233c.09 0 .182.003.276.009 1.044.061 3.055.393 3.674 2.356.213.671.224 1.293.224 1.864 0 .263-.004.516-.004.778-.004 1.367.447 2.677 1.732 3.133.395.138.815.21 1.225.21 1.065 0 2.033-.57 2.562-1.494.478-.827.716-1.892.716-3.173 0-2.75-.7-5.155-2.562-7.073-.782-.803-1.732-1.436-2.774-1.926 1.027-.386 3.57-1.426 3.57-4.885 0-2.048-1.377-4.322-3.716-5.256a7.945 7.945 0 00-3.058-.62H0v17.616h7.125v-2.839H2.839V3.384h7.125c.798 0 1.491.108 2.052.32.844.32 2.058 1.213 2.058 2.856 0 .753-.179 1.487-.537 2.056-.503.802-1.341 1.213-2.498 1.213H5.268v2.839h4.427c.313 0 .648.04.998.112a6.97 6.97 0 012.497.942c.906.575 1.659 1.344 2.24 2.282.636 1.02.956 2.168.956 3.416 0 .753-.112 1.538-.34 2.324-.066.224-.14.435-.224.642 1.629-1.878 2.18-4.289 2.18-6.294V18.588z" />
                </svg>
              </div>
              
              {/* TypeScript */}
              <div className="group relative w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-600 dark:text-blue-500 transition-transform duration-300 group-hover:rotate-12">
                  <path fill="currentColor" d="M3 3h18v18H3V3m10.71 14.86c.5.98 1.51 1.73 3.09 1.73 1.6 0 2.8-.83 2.8-2.36 0-1.41-.81-2.04-2.25-2.66l-.42-.18c-.73-.31-1.04-.52-1.04-1.02 0-.41.31-.73.81-.73.48 0 .8.21 1.09.73l1.31-.87c-.55-.96-1.33-1.33-2.4-1.33-1.51 0-2.48.96-2.48 2.23 0 1.38.81 2.03 2.03 2.55l.42.18c.78.34 1.24.55 1.24 1.13 0 .48-.45.83-1.15.83-.83 0-1.31-.43-1.67-1.03l-1.38.8M13 11.25H8v1.5h1.5V20h1.75v-7.25H13v-1.5z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Modern Call to Action Buttons */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a
              href="#resume" // Link updated: projects section removed
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-300"
              style={ctaStyle}
              onMouseMove={onCtaMove}
              onMouseLeave={onCtaLeave}
              aria-label="View resume section"
            >
              {/* Button shine effect */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent transform -skew-x-45 translate-x-full group-hover:translate-x-[-180%] transition-transform duration-1000 ease-in-out"></div>
              <span className="relative flex items-center gap-2">
                <Briefcase size={20} />
                View Resume
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
            <button
              disabled
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-gray-600 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg transition-all duration-500 ease-in-out cursor-not-allowed"
              onClick={(e) => e.preventDefault()}
            >
              {/* Coming soon badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                Coming Soon
              </div>
              <span className="relative flex items-center gap-2">
                <Download size={20} />
                Download CV
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;

