'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './Pricing.module.scss';
const baseFeatures = [
  'Головна та до 4 внутрішніх сторінок',
  'Дизайн і розробка',
  'Адаптивний дизайн для мобільних пристроїв',
];
export function Pricing() {
  const [monthly, setMonthly] = useState(false);
  return (
    <section
      id="pricing"
      tabIndex={-1}
      data-anchor-target
      className={`${s.section} ${s.dark}`}
      aria-label="Вартість послуг"
    >
      <SectionHeading label="Прозорі ціни" title="Вартість." />
      <div className={s.pricingBody}>
        <div className={s.toggle} aria-label="Тип оплати">
          <button type="button" aria-pressed={!monthly} onClick={() => setMonthly(false)}>
            За проєкт
          </button>
          <button type="button" aria-pressed={monthly} onClick={() => setMonthly(true)}>
            Щомісяця
          </button>
        </div>
        <div className={s.priceCard} data-reveal="fade">
          <div>
            <p className={s.price}>
              {monthly ? '$1,990' : '$2,490'}
              <small>/{monthly ? 'місяць' : 'проєкт'}</small>
            </p>
            <p>Термін виконання: {monthly ? 'постійно' : '3–4 тижні'}</p>
          </div>
          <ul>
            {baseFeatures.map((x) => (
              <li key={x}>{x}</li>
            ))}
            {monthly && <li>Щомісячні оновлення та покращення</li>}
          </ul>
          <Button inverse href="/contact">
            Зв’язатися
          </Button>
        </div>
        <p className={s.pricingNote}>
          Додайте маркетинг, SEO або створення контенту — гнучкі інструменти для посилення вашого
          проєкту. Ми підберемо рішення під ваш бізнес.
        </p>
      </div>
    </section>
  );
}
