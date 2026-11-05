'use client';
import { useState, type CSSProperties } from 'react';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './Pricing.module.scss';
import { pricingPlans, seoPrice } from './pricing-data';
export function Pricing() {
  const [planIndex, setPlanIndex] = useState(0);
  const [seo, setSeo] = useState(false);
  const plan = pricingPlans[planIndex];
  const total = plan.price === null ? null : plan.price + (seo ? seoPrice : 0);
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
            {item.name}
          </button>
        ))}
      </div>
      <div className={s.cards}>
        <aside className={s.addOn}>
          <div>
            <h3>Більше трафіку та заявок?</h3>
            <p>
              Додайте SEO до обраного тарифу. Базове SEO-налаштування вже входить у «Старт» і
              «Бізнес».
            </p>
          </div>
          <div className={s.addOnControl}>
            <strong>+${seoPrice}</strong>
            <button
              className={s.switch}
              type="button"
              role="switch"
              aria-checked={seo}
              aria-label="Додати SEO за 75 доларів"
              onClick={() => setSeo(!seo)}
            >
              <span />
            </button>
          </div>
        </aside>
        <div className={s.priceCard}>
          <div className={s.planInfo} aria-live="polite">
            <div className={s.planHeading}>
              <h3>{plan.name}</h3>
              {plan.id === 'business' && <span className={s.recommended}>Рекомендовано</span>}
            </div>
            <p className={s.description}>{plan.description}</p>
            <p className={`${s.price} ${total === null ? s.customPrice : ''}`}>
              {total === null ? 'За оцінкою' : `$${total}`}
              <small>{total === null ? (seo ? '+ $75 за SEO' : '') : '/проєкт'}</small>
            </p>
            <p className={s.scope}>{plan.scope}</p>
          </div>
          <ul className={s.features}>
            {plan.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <p className={s.delivery}>
            <span>Термін виконання</span>
            <span>{plan.delivery}</span>
          </p>
          <AnchorLink className={s.contact} href="/#contact">
            {plan.id === 'custom' ? 'Обговорити завдання' : 'Обрати пакет'}
          </AnchorLink>
        </div>
      </div>
      <div className={s.note}>
        <p className={s.noteLabel}>Оберіть свій формат</p>
        <p className={s.pricingNote}>
          Оберіть відповідний масштаб. Додаткові роботи узгодимо до старту.
        </p>
        <p className={s.manager}>
          Олександр Ткаченко<span>Менеджер із роботи з клієнтами</span>
        </p>
      </div>
    </section>
  );
}
