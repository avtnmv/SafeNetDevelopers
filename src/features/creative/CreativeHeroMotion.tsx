'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import s from './Creative.module.scss';

const lines = ['Створюємо', 'наступне покоління', 'цифрових брендів.'];
const total = lines.join('').length;

export function CreativeTypedTitle() {
  const [count, setCount] = useState(total);
  const [phase, setPhase] = useState<'pending' | 'typing' | 'done'>('pending');
  useEffect(() => {
    const key = 'safenet:creative-title-seen';
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let seen = false;
    try {
      seen = sessionStorage.getItem(key) === '1';
    } catch {
      /* Storage may be disabled. */
    }
    if (motion.matches || seen) {
      setCount(total);
      setPhase('done');
      return;
    }
    setCount(0);
    setPhase('typing');
    const started = performance.now();
    const timer = window.setInterval(() => {
      try {
        sessionStorage.setItem(key, '1');
      } catch {
        /* Animation still works without storage. */
      }
      const current = Math.min(total, Math.floor((performance.now() - started) / 55));
      setCount(current);
      if (current >= total) {
        window.clearInterval(timer);
        setPhase('done');
      }
    }, 55);
    const stop = () => {
      if (motion.matches) {
        window.clearInterval(timer);
        setCount(total);
        setPhase('done');
      }
    };
    motion.addEventListener('change', stop);
    return () => {
      window.clearInterval(timer);
      motion.removeEventListener('change', stop);
    };
  }, []);
  let offset = 0;
  return (
    <h1
      id="creative-title"
      className={s.typedTitle}
      data-typing={phase}
      aria-label={lines.join(' ')}
    >
      <noscript>
        <style>{`.${s.typedTitle}[data-typing='pending'] .${s.typeInk} { visibility: visible !important; }`}</style>
      </noscript>
      {lines.map((line) => {
        const visible = Math.max(0, Math.min(line.length, count - offset));
        const cursor =
          phase === 'typing' && count < total && count >= offset && count < offset + line.length;
        offset += line.length;
        return (
          <span className={s.typedLine} aria-hidden="true" key={line}>
            <span className={s.typeReserve}>{line}</span>
            <span className={s.typeInk}>
              {line.slice(0, visible)}
              {cursor && <i className={s.typeCursor} />}
            </span>
          </span>
        );
      })}
    </h1>
  );
}

export function CreativeHeroSurface({ children }: { children: ReactNode }) {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return (
    <section
      className={s.hero}
      aria-labelledby="creative-title"
      onPointerMove={(event) => {
        if (
          event.pointerType !== 'mouse' ||
          !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
        )
          return;
        const element = event.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          element.style.setProperty('--hero-x', `${x * 22}px`);
          element.style.setProperty('--hero-y', `${y * 16}px`);
        });
      }}
      onPointerLeave={(event) => {
        cancelAnimationFrame(frame.current);
        event.currentTarget.style.setProperty('--hero-x', '0px');
        event.currentTarget.style.setProperty('--hero-y', '0px');
      }}
    >
      {children}
    </section>
  );
}
