export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className="relative -mt-1">
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-[80px] md:h-[120px] ${flip ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M0,64 C240,128 480,0 720,48 C960,96 1200,80 1440,16 L1440,120 L0,120 Z"
          fill="url(#grad)"
        />
      </svg>
    </div>
  );
}
