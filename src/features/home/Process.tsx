import { ArrowUpRight } from '@/components/ui/ArrowUpRight';
import type { CSSProperties } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ActionLink } from '@/components/ui/ActionLink';
import s from './Process.module.scss';

const steps = [
  {
    title: 'Знайомимося',
    day: 'День 0',
    description:
      'За 15 хвилин визначаємо структуру, ціну й дату запуску. Погоджуємо договір та передоплату 50%.',
  },
  {
    title: 'Перший екран і структура',
    day: 'День 1',
    description:
      'Показуємо перший екран, логіку сторінки та стиль. Узгоджуємо напрям до складання всього сайту.',
  },
  {
    title: 'Збираємо матеріали',
    day: 'День 1',
    description:
      'Від вас — фото, послуги та контакти. Ми готуємо структуру й тексти для погодження.',
  },
  {
    title: 'Збираємо сайт і правимо',
    day: 'День 2',
    description:
      'Підключаємо форми та аналітику, адаптуємо мобільну версію. Ви бачите робочий сайт і залишаєте правки.',
  },
  {
    title: 'Перевіряємо безпеку',
    day: 'День 3',
    description:
      'Перевіряємо 10 пунктів, усуваємо виявлені проблеми й готуємо звіт. Після погодження готового сайту — решта 50%.',
  },
  {
    title: 'Запускаємо і передаємо доступи',
    day: 'День 3',
    description:
      'Підключаємо домен, перевіряємо отримання заявок і передаємо сайт та всі доступи. Починається період правок після запуску.',
  },
];

function Preview({ step }: { step: number }) {
  if (step === 0)
    return (
      <div className={s.chat}>
        <span className={s.badge}>
          <i /> На зв’язку
        </span>
        <p className={s.message}>Потрібен сайт для мого бізнесу. З чого почнемо?</p>
        <p className={s.reply}>З вашої ідеї. Розкажіть, що робите й кого хочете залучити.</p>
        <span className={s.typing}>
          SafeNet друкує <b>•••</b>
        </span>
      </div>
    );
  if (step === 1)
    return (
      <div className={s.browser}>
        <div className={s.browserBar}>
          <span>•••</span>
          <small>вашсайт.com.ua</small>
          <ArrowUpRight />
        </div>
        <div className={s.browserBody}>
          <div>
            <span className={s.miniLabel}>ВАШ БРЕНД</span>
            <strong>
              Ваша ідея.
              <br />
              Новий масштаб.
            </strong>
            <div className={s.lines}>
              <i />
              <i />
            </div>
            <span className={s.miniButton}>
              Почнімо <ArrowUpRight />
            </span>
          </div>
          <div className={s.art}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={s.browserBottom}>
          <span>● ● ○</span>
          <span>✓ Стиль погоджено</span>
        </div>
      </div>
    );
  if (step === 2)
    return (
      <div className={s.materials}>
        {[
          ['▧', 'Фото та відео', 'Матеріали вашого бренду'],
          ['≡', 'Послуги й ціни', 'Усе про вашу пропозицію'],
          ['↗', 'Контакти', 'Пошта, телефон, соцмережі'],
        ].map(([icon, title, text]) => (
          <div key={title}>
            <span className={s.fileIcon}>{icon === '↗' ? <ArrowUpRight /> : icon}</span>
            <p>
              <b>{title}</b>
              <small>{text}</small>
            </p>
            <span>✓</span>
          </div>
        ))}
      </div>
    );
  if (step === 3)
    return (
      <div className={s.checklist}>
        <div className={s.panelTitle}>
          <b>Останні штрихи</b>
          <span>3 / 4</span>
        </div>
        {['Оновити фото на головній', 'Додати перелік послуг', 'Уточнити текст кнопки'].map(
          (text) => (
            <p key={text}>
              <span>✓</span>
              {text}
              <small>Готово</small>
            </p>
          ),
        )}
        <p className={s.pending}>
          <span>◌</span>Перевірити всі деталі<small>У роботі</small>
        </p>
      </div>
    );
  if (step === 4)
    return (
      <div className={s.payment}>
        <div className={s.panelTitle}>
          <span>Фінальний етап</span>
          <span className={s.ready}>✓ Сайт готовий</span>
        </div>
        <p>
          <strong>50%</strong>
          <span>після завершення</span>
        </p>
        <div className={s.progress}>
          <span />
        </div>
        <div className={s.paymentLabels}>
          <span>Аванс сплачено</span>
          <span>Залишок</span>
        </div>
        <div className={s.access}>
          <ArrowUpRight /> Сайт і доступи — ваші
        </div>
      </div>
    );
  return (
    <div className={s.launch}>
      <div className={s.admin}>
        <div className={s.panelTitle}>
          <b>Ваш сайт</b>
          <ArrowUpRight />
        </div>
        <div className={s.lines}>
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className={s.notification}>
        <span className={s.send}>
          <ArrowUpRight />
        </span>
        <p>
          <b>Нова заявка із сайту!</b>
          <small>Олена хоче обговорити проєкт</small>
        </p>
        <span className={s.dot} />
      </div>
      <span className={s.launchNote}>Працює на ваш бізнес.</span>
    </div>
  );
}

export function Process() {
  return (
    <section id="process" className={s.section}>
      <SectionHeading label="Наш підхід" title="Від заявки до сайту за 3 дні." compact />
      <div className={s.intro} data-reveal="fade">
        <p>
          Від заявки до запуску — 3 робочі дні. Ось що відбувається кожного дня. Строк рахуємо після
          отримання матеріалів і передоплати; деталі фіксуємо в договорі.
        </p>
      </div>
      <div className={s.process}>
        {steps.map((step, index) => (
          <article
            key={step.title}
            data-reveal="card"
            style={{ '--reveal-delay': `${(index % 3) * 70}ms` } as CSSProperties}
          >
            <div className={`${s.preview} ${index === 1 ? s.darkPreview : ''}`} aria-hidden="true">
              <Preview step={index} />
            </div>
            <div className={s.cardCopy}>
              <div className={s.stepMeta}>
                <span>(0{index + 1})</span>
                <span>{step.day}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className={s.action}>
        <p>Ваш наступний крок — просто розповісти нам про ідею.</p>
        <ActionLink href="/#contact">Обговорити проєкт</ActionLink>
      </div>
    </section>
  );
}
