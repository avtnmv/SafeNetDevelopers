import s from './Results.module.scss';

export function Results() {
  return (
    <section className={s.section}>
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
