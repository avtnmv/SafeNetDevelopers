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
          <strong>100</strong>
          <h3>Оцінка PageSpeed</h3>
          <p>Ми дбаємо про продуктивність, зберігаючи привабливий вигляд і функціональність.</p>
        </div>
        <div data-reveal="card">
          <p>Зростання продуктивності</p>
          <strong>+48%</strong>
          <p>Швидкість сторінки</p>
        </div>
        <div data-reveal="card">
          <p>Зростання конверсії</p>
          <strong>4.2% → 5.9%</strong>
          <p>«Після оновлення дизайну кількість звернень стабільно зростає на 60%.»</p>
          <small>Angela Smith</small>
        </div>
      </div>
    </section>
  );
}
