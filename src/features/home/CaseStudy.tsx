import { Counter } from '@/components/ui/Counter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './CaseStudy.module.scss';

export function CaseStudy() {
  return (
    <section className={`${s.section} ${s.dark}`}>
      <SectionHeading label="Кейс" title="Ми робимо все." compact />
      <p className={s.intro} data-reveal="fade">
        Від брендингу до веброзробки та маркетингу.
      </p>
      <div className={s.bento}>
        <div data-reveal="card">
          <p>Продуктивність</p>
          <strong>
            <Counter value={100} />
          </strong>
          <h3>Оцінка PageSpeed</h3>
          <p>Ми дбаємо про продуктивність, зберігаючи привабливий вигляд і функціональність.</p>
        </div>
        <div data-reveal="card">
          <p>Зростання продуктивності</p>
          <strong>
            <Counter value={48} prefix="+" suffix="%" />
          </strong>
          <p>Швидкість сторінки</p>
        </div>
        <div data-reveal="card">
          <p>Зростання конверсії</p>
          <strong>
            <Counter value={4.2} decimals={1} suffix="%" /> →{' '}
            <Counter value={5.9} decimals={1} suffix="%" />
          </strong>
          <p>«Після оновлення дизайну кількість звернень стабільно зростає на 60%.»</p>
          <small>Наталія Кравченко</small>
        </div>
      </div>
    </section>
  );
}
