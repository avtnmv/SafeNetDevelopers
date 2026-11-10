import { Counter } from '@/components/ui/Counter';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/config/site';
import { testimonials } from './data';
import s from './Testimonials.module.scss';

function Stars() {
  return (
    <span className={s.stars} aria-label="5 із 5 зірок">
      ★★★★★
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" tabIndex={-1} data-anchor-target className={s.section}>
      <SectionHeading label="Відгуки" title="Відгуки." />
      <div className={s.reviews}>
        <div className={s.rating} data-reveal="fade">
          <div className={s.ratingIntro}>
            <p>
              Ми реалізували{' '}
              <b>
                <Counter value={50} suffix="+" /> проєктів
              </b>
              , які допомагають компаніям отримувати реальні результати.
            </p>
          </div>
          <div className={s.ratingFooter}>
            <p className={s.brand}>{site.name}</p>
            <div className={s.trust}>
              <div className={s.avatars} aria-hidden="true">
                {[
                  'review-avatar-1',
                  'review-avatar-city',
                  'review-avatar-cafe',
                  'review-avatar-4',
                ].map((name) => (
                  <Image
                    key={name}
                    src={`/media/${name}.webp`}
                    alt=""
                    width={38}
                    height={38}
                    sizes="38px"
                  />
                ))}
                <span>
                  <Counter value={50} suffix="+" />
                </span>
              </div>
              <div>
                <Stars />
                <p>Нам довіряють клієнти з усього світу</p>
              </div>
            </div>
            <AnchorLink className={s.reviewLink} href="/#contact">
              Залишити відгук
            </AnchorLink>
          </div>
        </div>
        {testimonials.map((review, index) => (
          <figure
            key={review.name}
            className={`${s.review} ${index === 0 ? s.joined : index === 1 ? s.reversed : s.split}`}
            data-reveal="card"
            style={{ '--reveal-delay': `${index * 75}ms` } as CSSProperties}
          >
            <figcaption className={s.person}>
              <Image src={review.avatar} alt="" width={46} height={46} sizes="46px" />
              <div>
                {review.name}
                <small>{review.company}</small>
              </div>
            </figcaption>
            <div className={s.quoteCard}>
              <div className={s.quoteMeta}>
                <Stars />
                <span className={s.plus} aria-hidden="true">
                  +
                </span>
              </div>
              <blockquote>{review.quote}</blockquote>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
