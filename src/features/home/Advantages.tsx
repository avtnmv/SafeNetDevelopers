import { AnimatedChatIphone } from '@/components/chat/AnimatedChatIphone';
import { Counter } from '@/components/ui/Counter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './Advantages.module.scss';

export function Advantages() {
  return (
    <section className={s.section}>
      <SectionHeading
        label="Чому обирають нас"
        title="Результат у кожному проєкті завдяки дизайну та функціональності."
        mutedSuffix="дизайну та функціональності."
        compact
      />
      <div className={s.advantages}>
        <div className={s.chat}>
          <AnimatedChatIphone />
        </div>
        <div className={s.benefits}>
          <p className={s.statement} data-reveal="fade">
            <span>Без зайвих слів — лише результат.</span> Продуманий дизайн та інструменти, які
            спрощують роботу.
          </p>
          <div className={s.statistics} data-reveal="fade">
            <article className={s.statistic} aria-labelledby="completed-projects-label">
              <div className={s.metric}>
                <strong>
                  <Counter value={50} suffix="+" />
                </strong>
                <span className={s.index} aria-hidden="true">
                  01
                </span>
              </div>
              <div className={s.details}>
                <h3 id="completed-projects-label">Успішно завершених проєктів</h3>
                <p>
                  Ми реалізували понад 50 проєктів, які допомагають компаніям отримувати реальні
                  результати.
                </p>
              </div>
            </article>
            <article className={s.statistic} aria-labelledby="launch-time-label">
              <div className={s.metric}>
                <strong>
                  <Counter value={3} suffix=" дні" />
                </strong>
                <span className={s.index} aria-hidden="true">
                  02
                </span>
              </div>
              <div className={s.details}>
                <h3 id="launch-time-label">До запуску сайту із SafeNet Developers</h3>
                <p>
                  Готовий сайт за 3 дні без складних брифів і підписок. Старт від 50% суми, решта —
                  після готовності.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
