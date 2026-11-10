'use client';
import { useEffect, useRef, useState } from 'react';
import s from './PlanSelect.module.scss';
const options = [
  { value: 'start', title: 'Старт', detail: 'Лендінг для вашого бізнесу', price: '$300' },
  { value: 'business', title: 'Бізнес', detail: 'Більше сторінок і можливостей', price: '$500' },
  {
    value: 'custom',
    title: 'Допоможіть обрати',
    detail: 'Підберемо рішення під вашу задачу',
    price: '↗',
  },
];
export function PlanSelect() {
  const [value, setValue] = useState('custom');
  const details = useRef<HTMLDetailsElement>(null);
  const selected = options.find((option) => option.value === value)!;
  useEffect(() => {
    function select(event: Event) {
      const next = (event as CustomEvent<string>).detail;
      if (options.some((option) => option.value === next)) setValue(next);
    }
    function outside(event: PointerEvent) {
      if (details.current && !details.current.contains(event.target as Node))
        details.current.open = false;
    }
    document.addEventListener('site:plan', select);
    document.addEventListener('pointerdown', outside);
    return () => {
      document.removeEventListener('site:plan', select);
      document.removeEventListener('pointerdown', outside);
    };
  }, []);
  return (
    <div className={s.field}>
      <span id="contact-plan-label">Формат вашого сайту</span>
      <details
        ref={details}
        className={s.select}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && details.current) {
            details.current.open = false;
            details.current.querySelector('summary')?.focus();
          }
        }}
      >
        <summary aria-labelledby="contact-plan-label contact-plan-value">
          <span id="contact-plan-value">
            {selected.title}
            <small>{selected.detail}</small>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </summary>
        <fieldset className={s.options}>
          <legend>Оберіть формат сайту</legend>
          {options.map((option) => (
            <label key={option.value} className={s.option}>
              <input
                type="radio"
                name="plan"
                value={option.value}
                checked={value === option.value}
                onChange={() => {
                  setValue(option.value);
                  if (details.current) {
                    details.current.open = false;
                    details.current.querySelector('summary')?.focus();
                  }
                }}
              />
              <span>
                {option.title}
                <small>{option.detail}</small>
              </span>
              <b>{option.price}</b>
            </label>
          ))}
        </fieldset>
      </details>
    </div>
  );
}
