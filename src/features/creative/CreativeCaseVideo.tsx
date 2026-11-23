'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import s from './Creative.module.scss';

export function CreativeCaseVideo({
  media,
  name,
  width,
  height,
}: {
  media: string;
  name: string;
  width: number;
  height: number;
}) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;

    function syncPlayback() {
      if (!element) return;
      if (!visible || document.hidden || motion.matches) {
        element.pause();
        return;
      }
      if (!element.getAttribute('src')) {
        element.src = window.matchMedia('(max-width: 809px)').matches
          ? `/media/${media}-mobile.mp4`
          : `/media/${media}-desktop.mp4`;
      }
      void element.play().catch(() => {});
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.35;
        syncPlayback();
      },
      { threshold: [0, 0.35] },
    );
    observer.observe(element);
    document.addEventListener('visibilitychange', syncPlayback);
    motion.addEventListener('change', syncPlayback);
    return () => {
      observer.disconnect();
      element.pause();
      document.removeEventListener('visibilitychange', syncPlayback);
      motion.removeEventListener('change', syncPlayback);
    };
  }, [media]);

  return (
    <div className={s.caseVideo} style={{ aspectRatio: `${width} / ${height}` } as CSSProperties}>
      <video
        ref={video}
        poster={`/media/${media}-poster.webp`}
        preload="none"
        muted
        loop
        playsInline
        width={width}
        height={height}
        aria-label={`Анімована демонстрація сайту ${name}`}
      />
    </div>
  );
}
