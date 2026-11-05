import { Counter } from '@/components/ui/Counter';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './Advantages.module.scss';

export function Advantages() {
  return (
    <section className={s.section}>
      <SectionHeading
        label="Чому обирають нас"
        title="Результат у кожному проєкті завдяки дизайну та функціональності."
        compact
      />
      <div className={s.advantages}>
        <div>
          <p>Ваш цифровий шлях починається з розмови. Поговорімо сьогодні.</p>
          <Button href="/contact">Поговорімо</Button>
        </div>
        <div className={s.benefits}>
          <p className={s.statement} data-reveal="fade">
            Без зайвих слів — лише результат. Продуманий дизайн та інструменти, які спрощують
            роботу.
          </p>
          <div className={s.statistics} data-reveal="fade">
            <div>
              <strong>
                <Counter value={50} suffix="+" />
              </strong>
              <h3>Успішно завершених проєктів</h3>
              <p>
                Ми реалізували понад 50 проєктів, які допомагають компаніям отримувати реальні
                результати.
              </p>
            </div>
            <div>
              <strong>
                <Counter value={4.9} decimals={1} suffix="/5" />
              </strong>
              <h3>Оцінка клієнтів</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
