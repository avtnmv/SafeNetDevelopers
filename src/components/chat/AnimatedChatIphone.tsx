'use client';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import s from './AnimatedChatIphone.module.scss';
const Chat = lazy(() => import('./ChatPlayback'));
export function AnimatedChatIphone() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={s.stage}>
      {loaded ? (
        <Suspense fallback={<div className={s.placeholder} />}>
          <Chat visible={visible} />
        </Suspense>
      ) : (
        <div className={s.placeholder} aria-label="Демонстрація переписки завантажується" />
      )}
    </div>
  );
}
