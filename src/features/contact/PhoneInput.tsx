'use client';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import s from './PhoneField.module.scss';
const Field = lazy(() => import('./PhoneField'));
export function PhoneInput() {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  const placeholder = (
    <div className={s.field}>
      <label className={s.label} htmlFor="contact-phone-loading">
        Телефон*
      </label>
      <div className={s.control}>
        <div className={s.country}>
          <img src="/media/flags/ua.svg" width="24" height="18" alt="" />
          <span>+380</span>
        </div>
        <input id="contact-phone-loading" type="tel" placeholder="Завантаження…" disabled />
      </div>
    </div>
  );
  return (
    <div ref={root}>
      <Suspense fallback={placeholder}>{ready ? <Field /> : placeholder}</Suspense>
    </div>
  );
}
