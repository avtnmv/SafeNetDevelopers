import { HeroVideo } from '@/features/home/HeroVideo';
import { assets } from '@/lib/content';
import { ContactForm } from './ContactForm';
import { ContactFormContent } from './ContactFormContent';
import s from './Contact.module.scss';
export function ContactSection() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      data-anchor-target
      className={s.section}
      aria-labelledby="contact-heading"
    >
      <div className={s.media} aria-hidden="true">
        <HeroVideo src={assets.heroVideo} className={s.background} />
      </div>
      <div className={s.formColumn}>
        <ContactForm>
          <ContactFormContent />
        </ContactForm>
      </div>
      <div className={s.copy} data-reveal="fade">
        <div className={s.copyIntro}>
          <h2 id="contact-heading">Обговоримо ваш проєкт</h2>
          <p>Розкажіть про свою задачу — ми запропонуємо рішення та визначимо наступні кроки.</p>
        </div>
        <div className={s.copyBenefits}>
          <div className={s.copyBenefit}>
            <svg
              className={s.benefitIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <h3>Швидка відповідь</h3>
            <p>Зв’яжемося з вами, щоб уточнити деталі проєкту.</p>
          </div>
          <div className={s.copyBenefit}>
            <svg
              className={s.benefitIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m11 17 2 2a1 1 0 1 0 3-3" />
              <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3L15.6 9.6a3 3 0 0 0-4.2 0l-.9.9a1 1 0 1 1-3-3l2.9-2.9a5.8 5.8 0 0 1 7.1-.9l.5.3a2 2 0 0 0 1.4.3L21 4" />
              <path d="m21 3 1 11h-2M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" />
            </svg>
            <h3>Зрозумілі наступні кроки</h3>
            <p>Обговоримо ваші цілі, обсяг робіт та подальший план.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
