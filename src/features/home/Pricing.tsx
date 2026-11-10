'use client';
import { useState, type CSSProperties } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './Pricing.module.scss';
import { PricingCard } from './PricingCard';
import { pricingPlans } from './pricing-data';
export function Pricing() {
  const [planIndex, setPlanIndex] = useState(0);
  const plan = pricingPlans[planIndex];
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
        <div className={s.offers}>
          {plan.offers.map((offer) => (
            <PricingCard key={offer.id} offer={offer} seo={false} />
          ))}
        </div>
      </div>
      <div className={s.note}>
        <p className={s.noteLabel}>Оберіть свій формат</p>
        <p className={s.pricingNote}>
          Оберіть відповідний масштаб. Додаткові роботи узгодимо до старту.
        </p>
      </div>
    </section>
  );
}
