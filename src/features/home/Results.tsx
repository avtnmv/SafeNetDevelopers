import s from './Results.module.scss';

export function Results() {
  return (
    <section className={s.section}>
      <div className={s.manifesto} data-reveal="fade">
        <p>SafeNet Developers</p>
        <h2>Що буде після запуску?</h2>
        <p>
          «Підтримка і захист» — $50/міс. Хостинг, SSL, резервні копії, моніторинг і щомісячна
          перевірка безпеки. Підключається за бажанням — сайт і всі доступи залишаються вашими.
        </p>
      </div>
    </section>
  );
}
