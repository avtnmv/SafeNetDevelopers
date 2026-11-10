import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './Offer.module.scss';
const included = [
  ['Індивідуальний дизайн', 'Під ваш бренд і завдання бізнесу.'],
  ['Структура і тексти', 'Пояснюємо вашу пропозицію та ведемо до заявки.'],
  [
    'Мобільна версія',
    'Адаптуємо всі екрани. Орієнтир PageSpeed — 90+; перевіряємо перед запуском.',
  ],
  ['Заявки в Telegram', 'Форма передає звернення у ваш чат.'],
  ['Аналітика', 'Налаштовуємо відстеження звернень і ключових дій.'],
  ['Домен і хостинг — ваші', 'Реєструємо на ваше ім’я та передаємо доступи.'],
  ['Перевірка безпеки + звіт', '10 пунктів перевірки та зрозумілий звіт перед запуском.'],
  ['Договір, рахунок, акт', 'Фіксуємо обсяг, ціну та дату запуску. Працюємо з ФОП і ТОВ.'],
  ['14 днів правок', 'Після запуску допомагаємо уточнити контент у погодженому обсязі.'],
];
export function Services() {
  return (
    <section id="services" tabIndex={-1} data-anchor-target className={s.section}>
      <SectionHeading title="Що ви отримуєте за $300." compact />
      <div className={s.grid}>
        {included.map(([title, description], i) => (
          <article key={title} data-reveal="card">
            <span className={s.index}>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
