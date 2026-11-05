import { Counter } from '@/components/ui/Counter';
import s from './Results.module.scss';

export function Results() {
  return (
    <section className={s.section}>
      <div className={s.metrics} data-reveal="fade">
        {[
          ['50+', 'Завершених проєктів'],
          ['56+', 'Реалізованих проєктів'],
          ['4.9/5', 'Оцінка клієнтів'],
          ['2016–25', 'Досвід у цифрових проєктах'],
        ].map(([number, label]) => (
          <div key={label}>
            <strong>
              {number === '2016–25' ? (
                number
              ) : (
                <Counter
                  value={parseFloat(number)}
                  decimals={number.includes('.') ? 1 : 0}
                  suffix={number.includes('/') ? '/5' : '+'}
                />
              )}
            </strong>
            <p>{label}</p>
          </div>
        ))}
      </div>
      <div className={s.manifesto} data-reveal="fade">
        <p>SafeNet Developers</p>
        <h2>Кожен наш проєкт розрахований на довгостроковий успіх.</h2>
        <p>
          Наш підхід простий: функціональність, швидкість і зрозумілість. Кожен проєкт має чітку
          мету та не містить зайвої складності.
        </p>
      </div>
    </section>
  );
}
