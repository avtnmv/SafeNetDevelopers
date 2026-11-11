import { preload } from 'react-dom';
import { assets } from '@/lib/content';
import { IntroVideo } from './IntroVideo';
import { ActionLink } from '@/components/ui/ActionLink';
import { HeroVideo } from './HeroVideo';
import s from './Hero.module.scss';
export function Hero() {
  preload('/media/hero-poster-v2.webp', { as: 'image', fetchPriority: 'high' });
  return (
    <section className={s.hero} aria-label="SafeNet Developers — цифрова студія">
      <div className={s.media} aria-hidden="true">
        <HeroVideo src={assets.heroVideo} className={s.background} priority />
      </div>
      <div className={s.top}>
        <h1 className={s.wordmark}>
          Сайт для бізнесу
          <br />
          <span>за 3 дні</span>
        </h1>
        <ul className={s.services}>
          <li>Фіксована ціна $300 / $500</li>
          <li>Запуск за 3 дні</li>
          <li>Перевірка безпеки + звіт</li>
          <li>Домен, сайт і доступи — ваші</li>
        </ul>
      </div>
      <div className={s.crosses} aria-hidden="true">
        <span>+</span>
        <span>+</span>
        <span>+</span>
        <span>+</span>
      </div>
      <div className={s.bottom}>
        <div className={s.copy}>
          <p className={s.description}>
            Лендінг або сайт, який приймає заявки в Telegram і належить вам.{' '}
            <span>Структура, тексти, дизайн — за 3 дні. $300 або $500. Ціна фіксована.</span>
          </p>
          <div className={s.actions}>
            <ActionLink href="/#contact">Розрахувати сайт за 15 хвилин</ActionLink>
            <ActionLink href="/#projects" secondary>
              Дивитися кейси
            </ActionLink>
          </div>
        </div>
        <IntroVideo />
      </div>
    </section>
  );
}
