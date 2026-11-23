import { CreativeHeroSurface, CreativeTypedTitle } from './CreativeHeroMotion';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import s from './Creative.module.scss';

export function CreativeHero() {
  return (
    <>
      <CreativeHeroSurface>
        <div className={s.heroMedia}>
          <img
            src="/media/creative-hero-1600.webp"
            srcSet="/media/creative-hero-800.webp 800w, /media/creative-hero-1600.webp 1600w"
            sizes="100vw"
            width={1600}
            height={1000}
            alt=""
            fetchPriority="high"
            className={s.heroPhoto}
          />
        </div>
        <div className={s.heroContent}>
          <p className={s.heroLabel}>SafeNet Developers / Цифрова студія</p>
          <CreativeTypedTitle />
          <div className={s.heroBottom}>
            <p>
              Допомагаємо бізнесу впевнено стартувати, зростати та вирізнятися завдяки дизайну й
              технологіям.
            </p>
            <AnchorLink className={s.lightButton} href="#creative-work">
              Дивитися проєкти
            </AnchorLink>
          </div>
        </div>
        <div className={s.heroMeta}>
          <span>Стратегія. Дизайн. Розробка.</span>
          <span>Україна / Працюємо по всьому світу</span>
        </div>
      </CreativeHeroSurface>
      <section className={s.intro}>
        <p className={s.eyebrow}>Від першої ідеї до запуску</p>
        <h2 data-reveal="fade">Дизайн і розробка для тих, хто рухає бізнес уперед.</h2>
        <div className={s.introBottom}>
          <p>
            Поєднуємо виразну візуальну мову, зрозумілий інтерфейс та надійний код. Для нових ідей і
            брендів із великою історією.
          </p>
          <AnchorLink className={s.darkButton} href="#contact">
            Обговорити проєкт
          </AnchorLink>
        </div>
      </section>
    </>
  );
}
