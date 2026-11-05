'use client';

import { useEffect, useRef } from 'react';

export function HeroVideo({ src, className }: { src: string; className: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    function syncPlayback() {
      if (!video) return;
      if (reducedMotion.matches || document.hidden) {
        video.pause();
      } else {
        void video.play().catch(() => {});
      }
    }
    syncPlayback();
    video.addEventListener('canplay', syncPlayback);
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      video.pause();
      video.removeEventListener('canplay', syncPlayback);
      reducedMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
