'use client';

import { useEffect, useRef } from 'react';

export function HeroVideo({
  src,
  className,
  priority = false,
}: {
  src: string;
  className: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const constrained =
      device.connection?.saveData ||
      /(^|slow-)2g$/.test(device.connection?.effectiveType ?? '') ||
      (device.deviceMemory !== undefined && device.deviceMemory <= 2) ||
      (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2);
    let visible = false;
    let nearby = false;
    let disposed = false;
    const selectedSrc = window.matchMedia('(max-width: 809px)').matches
      ? '/media/hero-mobile-v2.mp4'
      : src;
    function syncPlayback() {
      if (!video || disposed) return;
      if (constrained || motion.matches || document.hidden) {
        video.pause();
        return;
      }
      if (nearby && !video.getAttribute('src')) {
        video.src = selectedSrc;
        video.load();
      }
      if (visible) void video.play().catch(() => {});
      else video.pause();
    }
    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        nearby = entry.isIntersecting;
        syncPlayback();
      },
      { rootMargin: '300px' },
    );
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    preloadObserver.observe(video);
    visibilityObserver.observe(video);
    motion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      disposed = true;
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
      video.pause();
      motion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [src]);

  return (
    <>
      <img
        className={className}
        src="/media/hero-poster-v2.webp"
        alt=""
        width={960}
        height={600}
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        aria-hidden="true"
      />
      <video
        ref={ref}
        className={className}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
    </>
  );
}
