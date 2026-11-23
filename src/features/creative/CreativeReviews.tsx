'use client';
import { useState } from 'react';
import { testimonials } from '@/features/home/data';
import { CreativeHeading } from './CreativeHeading';
import s from './Creative.module.scss';

export function CreativeReviews() {
  const [index, setIndex] = useState(0);
  const review = testimonials[index];
  return (
    <section
      className={s.reviews}
      id="creative-reviews"
      tabIndex={-1}
      data-anchor-target
      aria-roledescription="карусель"
      aria-label="Відгуки клієнтів"
    >
      <CreativeHeading
        label="Співпраця"
        title="Разом створюємо більше."
        description="За кожним проєктом — люди, довіра та спільна робота. Ось як наші клієнти описують цей досвід."
      />
      <div className={s.review} aria-live="polite" aria-atomic="true">
        <div key={index} className={s.reviewContent}>
          <span className={s.quoteMark} aria-hidden="true">
            “
          </span>
          <blockquote>{review.quote}</blockquote>
          <div className={s.reviewAuthor}>
            <img src={review.avatar} width={64} height={64} alt="" loading="lazy" />
            <p>
              <strong>{review.name}</strong>
              <span>{review.company}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={s.reviewControls}>
        <button
          type="button"
          onClick={() => setIndex((index + testimonials.length - 1) % testimonials.length)}
          aria-label="Попередній відгук"
        >
          Назад
        </button>
        <div className={s.dots}>
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Відгук ${i + 1}: ${item.name}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((index + 1) % testimonials.length)}
          aria-label="Наступний відгук"
        >
          Далі
        </button>
      </div>
    </section>
  );
}
