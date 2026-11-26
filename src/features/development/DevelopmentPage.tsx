import { DeliverablesAnimation } from './DeliverablesAnimation';
import { SecurityOrbit } from './SecurityOrbit';
import { DevelopmentHeroAnimation } from './DevelopmentHeroAnimation';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { CreativeHeading } from '@/features/creative/CreativeHeading';
import c from '@/features/creative/Creative.module.scss';
import s from './Development.module.scss';
import { DevelopmentBuild, DevelopmentCapabilities, DevelopmentProcess } from './ServiceSections';

export function DevelopmentPage() {
  return (
    <>
      <section className={s.hero}>
        <nav className={s.breadcrumbs} aria-label="Навігаційний шлях">
          <AnchorLink href="/#creative-services">Наші послуги</AnchorLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Розробка</span>
        </nav>
        <div className={s.heroGrid}>
          <div>
            <p className={c.eyebrow}>Розробка під ключ</p>
            <h1>
              Від вашої ідеї
              <br />
              до готового
              <br />
              <span>продукту.</span>
            </h1>
            <p className={s.lead}>
              Сайти, вебсервіси та застосунки для iOS і Android. Беремо на себе весь шлях: дизайн,
              розробку, перевірку безпеки й запуск на серверах.
            </p>
            <div className={s.actions}>
              <AnchorLink href="#contact" className={c.lightButton}>
                Обговорити проєкт
              </AnchorLink>
              <AnchorLink href="#development-scope" className={`${c.textLink} ${s.scopeLink}`}>
                Що входить у розробку
              </AnchorLink>
            </div>
            <ul className={s.heroNotes}>
              {[
                'Одна команда на весь цикл',
                'Пентест включено',
                'Наш захищений хостинг — безкоштовно',
              ].map((note) => (
                <li key={note}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="m2 6 2.5 2.5L10 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
          <DevelopmentHeroAnimation />
        </div>
      </section>

      <DevelopmentBuild />
      <DevelopmentCapabilities />

      <section className={s.security}>
        <div className={s.securityIntro}>
          <p className={c.eyebrow}>Безпека та інфраструктура</p>
          <h2>
            Готовий до роботи.
            <br />
            <span>Перевірений до запуску.</span>
          </h2>
          <p>
            Кібербезпека — частина розробки. Наші спеціалісти перевіряють продукт перед запуском, а
            команда готує середовище для його роботи.
          </p>
        </div>
        <div className={s.securityDetails}>
          <article>
            <h3>Пентест нашими фахівцями</h3>
            <p>
              Перевірка на вразливості, звіт про результати та повторна перевірка виправлень входять
              у роботу над проєктом.
            </p>
            <SecurityOrbit />
          </article>
          <article>
            <h3>Захищені сервери та хостинг SafeNet</h3>
            <p>
              Надаємо безкоштовне розміщення на нашій захищеній інфраструктурі. Налаштовуємо
              середовище та розгортаємо ваш продукт.
            </p>
            <SecurityOrbit mirrored />
          </article>
        </div>
      </section>

      <section className={c.section}>
        <p className={c.eyebrow}>Що ви отримуєте</p>
        <div className={s.deliverables}>
          <div className={s.deliverablesIntro}>
            <h2>Усе для старту й подальшого розвитку.</h2>
            <p>
              Готовий продукт, який можна передати клієнтам і команді, та матеріали, потрібні для
              його розвитку.
            </p>
            <ul>
              {[
                'Працюючий сайт, сервіс або застосунок із погодженими функціями.',
                'Вихідний код, дизайн-макети та доступи до проєкту.',
                'Звіт про пентест і результати виправлень.',
                'Налаштоване розміщення на захищеній інфраструктурі.',
                'Документація та інструктаж для вашої команди.',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <DeliverablesAnimation />
        </div>
      </section>

      <section className={s.scope}>
        <CreativeHeading
          label="Наші переваги"
          title="Одна команда. Спільна відповідальність."
          breakBefore="Спільна"
        />
        <div className={s.advantages}>
          {[
            [
              'Експертиза разом',
              'Дизайнери, розробники та спеціалісти з кібербезпеки працюють над одним продуктом і узгоджують рішення між собою.',
            ],
            [
              'Прозорий обсяг робіт',
              'До старту визначаємо функції, етапи, бюджет та очікуваний результат. Додаткові завдання погоджуємо окремо.',
            ],
            [
              'Основа для розвитку',
              'Передаємо матеріали й доступи, щоб ви могли керувати продуктом і розвивати його разом із нами або своєю командою.',
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <DevelopmentProcess />
      <section className={c.section}>
        <div className={c.cta}>
          <p className={c.eyebrow}>Почнімо з вашої ідеї</p>
          <h2>
            Ви знаєте свій бізнес.
            <br />
            <span>Разом створимо ваш продукт.</span>
          </h2>
          <AnchorLink href="#contact" className={c.darkButton}>
            Обговорити розробку
          </AnchorLink>
        </div>
      </section>
    </>
  );
}
