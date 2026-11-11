'use client';
import { useEffect, useRef } from 'react';
import s from './Contact.module.scss';

export function ContactSuccess({ onReset }: { onReset: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.parentElement?.scrollIntoView({ block: 'center', behavior: 'instant' });
  }, []);
  return (
    <div className={s.success}>
      <div className={s.successIcon} aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" focusable="false">
          <path
            d="m10 20 7 7 14-14"
            pathLength="1"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className={s.successEyebrow}>Заявку отримано</span>
      <h3 ref={heading} tabIndex={-1}>
        Дякуємо
        <br />
        за довіру.
      </h3>
      <p>
        Ваш проєкт починається тут. Ми зв’яжемося з вами найближчим часом, щоб обговорити деталі.
      </p>
      <div className={s.successNote}>
        <span aria-hidden="true" />
        Зазвичай відповідаємо за 30 хвилин у робочий час
      </div>
      <button type="button" onClick={onReset}>
        Надіслати ще одну заявку
      </button>
    </div>
  );
}
