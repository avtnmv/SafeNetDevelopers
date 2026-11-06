import type { CSSProperties } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import s from './Process.module.scss';

const steps = [
  {
    title: 'Знайомимося з вашим бізнесом',
    label: '15 хвилин',
    description:
      'Безкоштовна консультація: обговорюємо ваші цілі, аудиторію та завдання сайту. Замість довгого брифу — жива розмова.',
  },
  {
    title: 'Показуємо перший варіант',
    label: 'Від ідеї до сайту',
    description:
      'Узгоджуємо стилістику, складаємо структуру та показуємо робочий сайт. Ви одразу бачите, як усе виглядає і працює.',
  },
  {
    title: 'Збираємо матеріали',
    label: 'Усе важливе — поруч',
    description:
      'Від вас — фото, послуги та контакти. Ми допомагаємо з текстами, формулюємо переваги й наповнюємо сторінки.',
  },
  {
    title: 'Вносимо правки',
    label: 'Разом до результату',
    description:
      'Уточнюємо деталі прямо на живому сайті. Ви бачите зміни, залишаєте побажання й погоджуєте фінальний результат.',
  },
  {
    title: 'Передаємо сайт і доступи',
    label: 'Прозорий фінал',
    description:
      'Сплачуєте решту 50%, коли сайт готовий. Передаємо доступи та пояснюємо, як змінювати тексти, фото й інше наповнення.',
  },
  {
    title: 'Запускаємо проєкт у роботу',
    label: 'Початок нового етапу',
    description:
      'Підключаємо домен, перевіряємо форми та налаштовуємо отримання заявок. Залишаємося на зв’язку після запуску.',
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
          <span>↗</span>
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
            <span className={s.miniButton}>Почнімо ↗</span>
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
            <span className={s.fileIcon}>{icon}</span>
            <p>
              <b>{title}</b>
              <small>{text}</small>
            </p>
            <span>✓</span>
          </div>
        ))}
        <span className={s.materialNote}>↗ Тексти допоможемо написати</span>
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
        <div className={s.access}>↗ Сайт і доступи — ваші</div>
      </div>
    );
  return (
    <div className={s.launch}>
      <div className={s.admin}>
        <div className={s.panelTitle}>
          <b>Ваш сайт</b>
          <span>↗</span>
        </div>
        <div className={s.lines}>
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className={s.notification}>
        <span className={s.send}>↗</span>
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
      <SectionHeading
        label="Про нас"
        title="Як ми запускаємо сайти та маркетингові кампанії"
        compact
      />
      <div className={s.intro} data-reveal="fade">
        <p>
          Поєднуємо творчість, технології та стратегію, щоб перетворити вашу ідею на працюючий
          цифровий продукт.
        </p>
        <span>6 кроків. Один спільний результат.</span>
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
                <span>{step.label}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className={s.action}>
        <p>Ваш наступний крок — просто розповісти нам про ідею.</p>
        <Button href="/#contact">Обговорити проєкт</Button>
      </div>
    </section>
  );
}
