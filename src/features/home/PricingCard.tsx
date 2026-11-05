import { AnchorLink } from '@/components/navigation/AnchorLink';
import { seoPrice, type PricingOffer } from './pricing-data';
import s from './Pricing.module.scss';

export function PricingCard({ offer, seo }: { offer: PricingOffer; seo: boolean }) {
  const total = offer.price === null ? null : offer.price + (seo ? seoPrice : 0);
  return (
    <article className={s.priceCard} aria-label={offer.name}>
      <div className={s.planInfo}>
        <div className={s.planHeading}>
          <h3>{offer.name}</h3>
          {offer.id === 'business' && <span className={s.recommended}>Рекомендовано</span>}
        </div>
        <p className={s.description}>{offer.description}</p>
        <p className={`${s.price} ${total === null ? s.customPrice : ''}`} aria-live="polite">
          {total === null ? 'За оцінкою' : `$${total}`}
          <small>{total === null ? (seo ? `+ $${seoPrice} за SEO` : '') : '/проєкт'}</small>
        </p>
        <p className={s.scope}>{offer.scope}</p>
      </div>
      <ul className={s.features}>
        {offer.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <p className={s.delivery}>
        <span>Термін виконання</span>
        <span>{offer.delivery}</span>
      </p>
      <AnchorLink
        className={s.contact}
        href="/#contact"
        aria-label={`${offer.id === 'custom' ? 'Обговорити' : 'Обрати'}: ${offer.name}`}
      >
        {offer.id === 'custom' ? 'Обговорити завдання' : 'Обрати пакет'}
      </AnchorLink>
    </article>
  );
}
