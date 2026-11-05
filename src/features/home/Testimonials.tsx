import type { CSSProperties } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { testimonials } from './data';
import s from './Testimonials.module.scss';

export function Testimonials() {
  return (
    <section className={s.section}>
      <SectionHeading label="Відгуки" title="Відгуки." count="©2025" />
      <div className={s.reviews}>
        <div className={s.rating} data-reveal="fade">
          <strong>
            4.9<small>/5</small>
          </strong>
          <p>
            Ми реалізували понад 56 проєктів, які допомагають компаніям отримувати реальні
            результати.
          </p>
          <p>Нам довіряють клієнти з усього світу.</p>
        </div>
        {testimonials.map((review, index) => (
          <figure
            key={review.name}
            data-reveal="card"
            style={{ '--reveal-delay': `${(index % 4) * 75}ms` } as CSSProperties}
          >
            <figcaption>
              {review.name}
              <small>{review.company}</small>
            </figcaption>
            <blockquote>{review.quote}</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
