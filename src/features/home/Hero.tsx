import Image from 'next/image';
import { assets, team } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { HeroVideo } from './HeroVideo';
import s from './Hero.module.scss';
export function Hero() {
  return (
    <section className={s.hero} aria-label="SafeNet Developers — цифрова студія">
      <div className={s.media} aria-hidden="true">
        <HeroVideo src={assets.heroVideo} className={s.background} />
      </div>
      <div className={s.top}>
        <h1 className={s.wordmark}>
          Розробка сайту
          <br />
          <span>за 3-5 днів</span>
        </h1>
        <ul className={s.services}>
          <li>Вебдизайн і розробка</li>
          <li>Базова SEO-оптимізація</li>
          <li>Продаючі текста</li>
          <li>Від 300$ за сайт</li>
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
            Структура, тексти та дизайн — і ваш бізнес готовий до продажів.{' '}
            <span>
              Покажемо цінність вашої пропозиції, відповімо на головні запитання клієнтів і зробимо
              шлях до заявки простим.
            </span>
          </p>
          <div className={s.actions}>
            <AnchorLink href="/#contact" className={`${s.action} ${s.primaryAction}`}>
              Отримати заявку{' '}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M8 2v12m-5-5 5 5 5-5" transform="rotate(-135 8 8)" />
              </svg>
            </AnchorLink>
            <AnchorLink href="/#projects" className={`${s.action} ${s.secondaryAction}`}>
              Дивитися кейси{' '}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M8 2v12m-5-5 5 5 5-5" />
              </svg>
            </AnchorLink>
          </div>
        </div>
        <div className={s.person}>
          <Image src={assets.lead!} alt={team[0].name} width={120} height={154} sizes="120px" />
          <div>
            <div className={s.processCopy}>
              <h2>Як ми працюємо</h2>
              <p className={s.processDescription}>
                Детально про процес роботи, формування ціни та реалізацію.
              </p>
            </div>
            <Button href="/contact" showArrow={false}>
              Дивитися відео
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
