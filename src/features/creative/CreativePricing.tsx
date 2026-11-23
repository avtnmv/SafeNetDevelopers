import { pricingPlans } from '@/features/home/pricing-data';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { CreativeHeading } from './CreativeHeading';
import s from './Creative.module.scss';

export function CreativePricing() {
  return (
    <section className={s.section} id="creative-pricing" tabIndex={-1} data-anchor-target>
      <CreativeHeading
        label="Формати співпраці"
        title="Готові до наступного кроку?"
        description="Оберіть масштаб вашого майбутнього сайту. Погодимо вартість, строки та обсяг до старту — без несподіваних платежів."
      />
      <div className={s.plans}>
        {pricingPlans.map((plan) => {
          const offer = plan.offers[0];
          return (
            <article
              key={plan.id}
              className={`${s.plan} ${plan.id === 'business' ? s.featured : ''}`}
              data-reveal="card"
            >
              <div className={s.planTop}>
                <h3>{plan.name}</h3>
                {plan.id === 'business' && <span>Рекомендуємо</span>}
              </div>
              <p className={s.price}>
                {offer.price ? `$${offer.price}` : 'За оцінкою'}
                {offer.price && <small>/ проєкт</small>}
              </p>
              <p>{offer.description}</p>
              <p className={s.planScope}>
                {offer.delivery}
                <br />
                {offer.scope}
              </p>
              <ul>
                {offer.features.map((feature) => (
                  <li key={feature}>
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <AnchorLink
                href="#contact"
                className={plan.id === 'business' ? s.lightButton : s.darkButton}
              >
                {offer.price ? 'Обрати формат' : 'Обговорити ідею'}
              </AnchorLink>
            </article>
          );
        })}
      </div>
      <p className={s.pricingNote}>
        Оплата 50/50 · Договір і рахунок для ФОП/ТОВ · SEO додатково +$75
      </p>
    </section>
  );
}
