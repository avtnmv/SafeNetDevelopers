'use client';
import { useState, type CSSProperties } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './Pricing.module.scss';
import { PricingCard } from './PricingCard';
import { pricingPlans } from './pricing-data';
export function Pricing() {
  const [planIndex, setPlanIndex] = useState(0);
  return (
    <section
      id="pricing"
      tabIndex={-1}
      data-anchor-target
      className={s.section}
      aria-label="Вартість послуг"
    >
      <SectionHeading label="Прозорі ціни" title="Вартість." />
      <div
        className={s.toggle}
        role="group"
        aria-label="Оберіть тариф"
        style={{ '--plan-index': planIndex } as CSSProperties}
      >
        <span aria-hidden="true" className={s.indicator} />
        {pricingPlans.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === planIndex}
            onClick={() => setPlanIndex(index)}
          >
            {item.id === 'business' && <span className={s.tabRecommended}>Рекомендовано</span>}
            {item.name}
          </button>
        ))}
      </div>
      <div className={s.cards}>
        {pricingPlans.map((plan, index) => (
          <div key={plan.id} className={`${s.offers} ${index !== planIndex ? s.inactive : ''}`}>
            {plan.offers.map((offer) => (
              <PricingCard key={offer.id} offer={offer} seo={false} />
            ))}
          </div>
        ))}
      </div>
      <div className={s.note}>
        <p className={s.noteLabel}>Без прихованих платежів</p>
        <p className={s.pricingNote}>
          Оплата 50/50 · Ціна не зміниться під час роботи · Рахунок для ФОП/ТОВ.
        </p>
      </div>
      <p className={s.extras}>
        Додатково: сторінка — $50 · друга мова — $100 · оплата на сайті — $80 · логотип — $100 ·
        перевірка наявного сайту — $99 · SEO — $75. Редизайн лендінгу — $300. Інтернет-магазин —
        окрема оцінка.
      </p>
    </section>
  );
}
