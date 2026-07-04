// src/components/ui/AnimatedBackground.tsx
// Stripped-down — just a subtle surface tint. No blobs.
export default function AnimatedBackground({
  dark = false,
}: {
  /** If true, use a dark zinc surface instead of white */
  dark?: boolean;
  // Legacy props kept for backwards compat — ignored
  gradientClass?: string;
  overlayClass?: string;
  showBlobs?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${
        dark
          ? 'bg-zinc-900 dark:bg-zinc-950'
          : 'bg-zinc-50 dark:bg-zinc-900/40'
      }`}
    />
  );
}
