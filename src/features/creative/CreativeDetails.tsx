import { Disclosure } from '@/components/ui/Disclosure';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { faq } from '@/features/home/data';
import { CreativeHeading } from './CreativeHeading';
import s from './Creative.module.scss';

export function CreativeFaq() {
  return (
    <section className={s.faq} id="creative-faq" tabIndex={-1} data-anchor-target>
      <div>
        <p className={s.eyebrow}>Відповідаємо чесно</p>
        <h2 data-reveal="fade">
          Ви запитуєте.
          <br />
          Ми пояснюємо.
        </h2>
        <p>Усе, що варто знати про процес, вартість і роботу разом.</p>
      </div>
      <div>
        {faq.map((item) => (
          <Disclosure key={item.question} title={item.question}>
            <p>{item.answer}</p>
          </Disclosure>
        ))}
      </div>
    </section>
  );
}

export function CreativeApproach() {
  return (
    <section className={s.section}>
      <CreativeHeading
        label="Наш підхід"
        title="Менше шуму. Більше сенсу."
        description="Три принципи, які допомагають нам перетворювати складні завдання на прості й дієві рішення."
      />
      <div className={s.approach}>
        {[
          {
            title: 'Починаємо з вашого бізнесу',
            text: 'З’ясовуємо, хто ваші клієнти, що для них важливо та яку дію має допомогти зробити сайт.',
            kind: 'strategy',
          },
          {
            title: 'Залишаємо тільки потрібне',
            text: 'Будуємо чітку структуру, пишемо зрозумілі тексти та створюємо дизайн, який спрямовує увагу.',
            kind: 'design',
          },
          {
            title: 'Думаємо далі за запуск',
            text: 'Перевіряємо швидкість і безпеку, передаємо доступи та пояснюємо, як працювати із сайтом.',
            kind: 'launch',
          },
        ].map((item) => (
          <article key={item.kind} data-reveal="card">
            <div className={`${s.approachArt} ${s[item.kind]}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className={s.cta} data-reveal="fade">
        <p className={s.eyebrow}>Почнімо з розмови</p>
        <h2>
          Ваша наступна
          <br />
          велика ідея —<br />
          <span>наш спільний старт.</span>
        </h2>
        <AnchorLink href="#contact" className={s.darkButton}>
          Запланувати консультацію
        </AnchorLink>
      </div>
    </section>
  );
}
