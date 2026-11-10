import { ArrowUpRight } from '@/components/ui/ArrowUpRight';
import type { CSSProperties } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ActionLink } from '@/components/ui/ActionLink';
import s from './Process.module.scss';

const steps = [
  {
    title: 'Знайомимося з вашим бізнесом',
    description:
      'Безкоштовна консультація: обговорюємо ваші цілі, аудиторію та завдання сайту. Замість довгого брифу — жива розмова.',
  },
  {
    title: 'Узгоджуємо дизайн',
    description:
      'Узгоджуємо стилістику, складаємо структуру та показуємо робочий сайт. Ви одразу бачите, як усе виглядає і працює.',
  },
  {
    title: 'Збираємо матеріали',
    description:
      'Від вас — фото, послуги та контакти. Ми допомагаємо з текстами, формулюємо переваги й наповнюємо сторінки.',
  },
  {
    title: 'Вносимо правки',
    description:
      'Уточнюємо деталі прямо на живому сайті. Ви бачите зміни, залишаєте побажання й погоджуєте фінальний результат.',
  },
  {
    title: 'Передаємо сайт і доступи',
    description:
      'Коли сайт готовий і погоджений, ви сплачуєте решту 50% та отримуєте всі доступи. Сайт повністю належить вам.',
  },
  {
    title: 'Запускаємо проєкт',
    description:
      'Перед запуском сайт перевіряє фахівець із кібербезпеки. Усуваємо виявлені вразливості, підключаємо домен і налаштовуємо отримання заявок. Залишаємося на зв’язку після запуску.',
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
      <SectionHeading label="Наш підхід" title="Як ми запускаємо сайти за 6 кроків" compact />
      <div className={s.intro} data-reveal="fade">
        <p>
          Поєднуємо творчість, технології та стратегію, щоб перетворити вашу ідею на працюючий
          цифровий продукт.
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
