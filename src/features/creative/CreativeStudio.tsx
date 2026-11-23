import { team } from '@/lib/content';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Counter } from '@/components/ui/Counter';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { CreativeHeading } from './CreativeHeading';
import s from './Creative.module.scss';

export function CreativeStudio() {
  return (
    <section
      className={s.studio}
      id="creative-studio"
      tabIndex={-1}
      data-anchor-target
      aria-label="Про студію"
    >
      <div className={s.section}>
        <CreativeHeading
          label="Хто ми"
          title="Сильна команда. Комплексна експертиза. Масштабні рішення."
          description="Ми — SafeNet Developers. Об’єднуємо фахівців із дизайну, розробки, маркетингу та кібербезпеки, щоб комплексно розвивати ваш бренд. Створюємо сайти, візуальну айдентику й контент — від стратегії та першої ідеї до запуску й подальшого розвитку."
        />
        <AnchorLink className={s.textLink} href="/studio">
          Познайомитися зі студією
        </AnchorLink>
      </div>
      <div className={s.teamStrip}>
        {team.map((person) => (
          <figure className={s.teamCard} key={person.name} data-reveal="card">
            <div>
              <ResponsiveImage
                src={person.image}
                alt={person.name}
                fill
                sizes="(max-width: 809px) 70vw, 25vw"
              />
            </div>
            <figcaption>
              <strong>{person.name}</strong>
              <span>{person.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className={s.metrics}>
        {[
          {
            value: 4,
            suffix: '',
            label: 'Напрями експертизи',
            description: 'Дизайн, розробка, маркетинг і кібербезпека в одній команді.',
          },
          {
            value: 50,
            suffix: '/50',
            label: 'Прозора оплата',
            description: 'Половина перед стартом, решта після погодження готового сайту.',
          },
          {
            value: 300,
            prefix: '$',
            label: 'Вартість старту',
            description: 'Чіткий обсяг робіт і погоджена ціна до початку співпраці.',
          },
          {
            value: 100,
            suffix: '%',
            label: 'Сайт належить вам',
            description: 'Домен, код, контент та всі доступи передаємо вам.',
          },
        ].map((item) => (
          <article key={item.label} data-reveal="fade">
            <strong>
              <Counter value={item.value} suffix={item.suffix} prefix={item.prefix} />
            </strong>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
