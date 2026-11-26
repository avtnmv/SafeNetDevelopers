'use client';

import { useEffect, useRef, type RefObject } from 'react';
import s from './ServiceSections.module.scss';

const solutions = [
  [
    'Сайти та інтернет-магазини',
    'Корпоративні сайти, портали й магазини: від презентації бізнесу до каталогу, замовлення та оплати.',
  ],
  [
    'Вебзастосунки та кабінети',
    'Особисті кабінети, клієнтські інтерфейси й онлайн-сервіси, у яких зручно працювати щодня.',
  ],
  [
    'Застосунки для iOS та Android',
    'Мобільні продукти для ваших клієнтів і команди — з інтеграціями та серверною частиною.',
  ],
  [
    'Внутрішні системи та інтеграції',
    'CRM, робочі панелі, Telegram-боти та зв’язки між сервісами, які автоматизують бізнес-процеси.',
  ],
];
const capabilities = [
  ['UX/UI-дизайн', 'M8 29 27 10l5 5-19 19-7 2 2-7ZM23 14l5 5M7 8h10M7 8v10'],
  ['Веброзробка', 'm13 11-9 9 9 9m14-18 9 9-9 9M23 6l-6 28'],
  [
    'iOS та Android',
    'M12 4h16a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3ZM16 9h8M18 31h4',
  ],
  ['Інтеграції та API', 'M15 14h10v12H15ZM5 5h7v7H5ZM28 28h7v7h-7ZM8 12v8h7M25 20h7v8'],
  ['Пентест і безпека', 'M20 4 34 10v10c0 8-8 13-14 16C14 33 6 28 6 20V10L20 4ZM13 20l5 5 10-11'],
  ['Хостинг і запуск', 'M6 6h28v11H6ZM6 23h28v11H6ZM11 11h1M11 28h1M20 11h9M20 28h9'],
];
const steps = [
  [
    'Задача та стратегія',
    'Знайомимося з бізнесом, аудиторією й цілями. Визначаємо потрібні платформи та функції, погоджуємо обсяг робіт, бюджет, терміни й критерії готовності продукту.',
  ],
  [
    'Структура та прототипи',
    'Продумуємо шлях клієнта, навігацію й логіку екранів. Створюємо прототипи сайту або застосунку, щоб узгодити ключові сценарії до початку розробки.',
  ],
  [
    'Дизайн інтерфейсу',
    'Створюємо візуальну концепцію під ваш бренд. Опрацьовуємо адаптивні екрани, компоненти й анімації для зручної роботи на комп’ютерах і мобільних пристроях.',
  ],
  [
    'Розробка та інтеграції',
    'Реалізуємо клієнтську й серверну частини, базу даних, iOS та Android — відповідно до задачі. Підключаємо оплати, CRM та потрібні API, показуємо проміжні результати.',
  ],
  [
    'Пентест та запуск',
    'Тестуємо продукт і проводимо пентест нашими фахівцями з кібербезпеки. Виправляємо вразливості, запускаємо на наших захищених серверах із безкоштовним розміщенням на погоджених умовах. Супроводжуємо подання застосунків у магазини, передаємо код, дизайн, доступи та інструкції.',
  ],
];

/** Reference timing: scale .8 → 1, expo-out, 2 seconds, .2 second stagger. */
function useSectionReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations: Animation[] = [];
    let observer: IntersectionObserver | undefined;
    const reset = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.length = 0;
      element.querySelectorAll<HTMLElement>('[data-service-reveal]').forEach((item) => {
        item.style.removeProperty('opacity');
      });
    };
    const configure = () => {
      reset();
      if (reduced.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, index) => {
            const item = entry.target as HTMLElement;
            item.style.removeProperty('opacity');
            animations.push(
              item.animate(
                [
                  { opacity: 0, transform: 'scale(.8)' },
                  { opacity: 1, transform: 'scale(1)' },
                ],
                {
                  duration: 2000,
                  delay: index * 200,
                  easing: 'cubic-bezier(.16,1,.3,1)',
                  fill: 'backwards',
                },
              ),
            );
            observer?.unobserve(item);
          });
      });
      element.querySelectorAll<HTMLElement>('[data-service-reveal]').forEach((item) => {
        if (item.getBoundingClientRect().top >= window.innerHeight) {
          item.style.opacity = '0';
          observer?.observe(item);
        }
      });
    };
    configure();
    reduced.addEventListener('change', configure);
    return () => {
      reset();
      reduced.removeEventListener('change', configure);
    };
  }, [root]);
}

function Heading({ children }: { children: string }) {
  return (
    <h2 className={s.heading} data-reveal="words">
      {children.split(' ').map((word, index) => (
        <span key={index} data-word>
          {word}
          {'\u00a0'}
        </span>
      ))}
    </h2>
  );
}

export function DevelopmentBuild() {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);
  return (
    <section className={`${s.section} ${s.build}`} ref={root}>
      <div className={s.container}>
        <Heading>Що ми створюємо</Heading>
        <div className={s.bento}>
          {solutions.map(([title, text], index) => (
            <article
              className={`${s.buildCard} ${index === 0 || index === 3 ? s.large : ''}`}
              key={title}
              data-service-reveal
            >
              <div className={s.buildInfo}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <div className={s.buildMedia}>
                <img
                  src={`/media/development/build-${index + 1}.webp`}
                  width={index === 0 || index === 3 ? 600 : 504}
                  height={index === 0 || index === 3 ? 350 : 250}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DevelopmentCapabilities() {
  const root = useRef<HTMLElement>(null);
  useSectionReveal(root);
  return (
    <section
      className={`${s.section} ${s.capabilities}`}
      ref={root}
      id="development-scope"
      tabIndex={-1}
      data-anchor-target
    >
      <div className={s.container}>
        <Heading>Наші можливості</Heading>
        <div className={s.tiles}>
          {capabilities.map(([title, path]) => (
            <article className={s.tile} key={title} data-service-reveal>
              <svg
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={path} />
              </svg>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DevelopmentProcess() {
  const root = useRef<HTMLElement>(null);
  const main = useRef<HTMLDivElement>(null);
  const items = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const wrapper = main.current;
    const list = items.current;
    if (!wrapper || !list) return;
    const cards = Array.from(list.querySelectorAll<HTMLElement>('[data-process-card]'));
    const desktop = window.matchMedia('(min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let disposed = false;
    let bounds: { top: number; bottom: number }[] = [];
    let progress = cards.map(() => 1);
    let previousTime = 0;
    let lastWidth = 0;

    const paint = (card: HTMLElement, value: number) => {
      const eased = 1 - (1 - value) ** 2;
      card.style.setProperty('--step-progress', String(value));
      const accordion = card.querySelector<HTMLElement>('[data-step-accordion]');
      if (accordion) accordion.style.gridTemplateRows = `minmax(0, ${value}fr)`;
      card.style.setProperty('--step-color', String(Math.round(255 * eased)));
      card.style.setProperty('--step-bg', String(Math.round(232 * (1 - eased))));
      card.style.setProperty('--step-text', String(Math.max(0, Math.min(1, (value - 0.4) / 0.6))));
    };
    const tick = (time: number) => {
      frame = 0;
      if (!desktop.matches || reduced.matches) return;
      const top = wrapper.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      const blend = 1 - Math.exp(-Math.min(time - previousTime || 16, 64) / 180);
      previousTime = time;
      let unsettled = false;
      cards.forEach((card, index) => {
        const range = bounds[index];
        if (!range) return;
        // Original triggers: top at 70vh → bottom at 80vh, measured fully expanded.
        const start = range.top - viewport * 0.7;
        const end = range.bottom - viewport * 0.8;
        const target =
          index === 0 ? 1 : Math.max(0, Math.min(1, (-top - start) / Math.max(1, end - start)));
        progress[index] += (target - progress[index]) * blend;
        if (Math.abs(target - progress[index]) < 0.001) progress[index] = target;
        else unsettled = true;
        paint(card, progress[index]);
      });
      if (unsettled) frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = 0;
      delete list.dataset.scroll;
      wrapper.style.removeProperty('height');
      cards.forEach((card) => {
        card.style.cssText = '';
        card
          .querySelector<HTMLElement>('[data-step-accordion]')
          ?.style.removeProperty('grid-template-rows');
        card.removeAttribute('data-mobile-open');
      });
      if (!desktop.matches || reduced.matches) return;
      const rect = list.getBoundingClientRect();
      bounds = cards.map((card) => {
        const box = card.getBoundingClientRect();
        return { top: box.top - rect.top, bottom: box.bottom - rect.top };
      });
      wrapper.style.height = `${rect.height}px`;
      list.dataset.scroll = 'true';
      progress = cards.map((_, index) => (index === 0 ? 1 : 0));
      cards.forEach((card, index) => paint(card, progress[index]));
      schedule();
    };
    const toggle = (event: Event) => {
      if (desktop.matches || reduced.matches) return;
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('button');
      const card = button?.closest<HTMLElement>('[data-process-card]');
      if (!button || !card) return;
      const isOpen = card.dataset.mobileOpen !== 'false';
      card.dataset.mobileOpen = String(!isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
    };
    const configure = () => {
      measure();
      cards.forEach((card, index) => {
        const button = card.querySelector('button');
        if (!desktop.matches && !reduced.matches) {
          card.dataset.mobileOpen = String(index === 0);
          button?.setAttribute('aria-expanded', String(index === 0));
        } else button?.setAttribute('aria-expanded', 'true');
      });
    };
    const resize = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width && Math.abs(width - lastWidth) > 1) {
        lastWidth = width;
        configure();
      }
    });
    configure();
    resize.observe(list);
    void document.fonts.ready.then(() => {
      if (!disposed) configure();
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', configure);
    desktop.addEventListener('change', configure);
    reduced.addEventListener('change', configure);
    list.addEventListener('click', toggle);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', configure);
      desktop.removeEventListener('change', configure);
      reduced.removeEventListener('change', configure);
      list.removeEventListener('click', toggle);
    };
  }, []);

  return (
    <section className={`${s.section} ${s.process}`} ref={root}>
      <div className={s.container}>
        <Heading>Наш процес</Heading>
        <div className={s.processMain} ref={main}>
          <ol className={s.steps} ref={items}>
            {steps.map(([title, text], index) => (
              <li className={s.step} key={title} data-process-card>
                <div className={s.stepFill} aria-hidden="true" />
                <img
                  className={s.stepImage}
                  src={`/media/development/process-${index + 1}.webp`}
                  width={600}
                  height={374}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <h3 className={s.stepHeading}>
                  <span className={s.desktopTitle}>{title}</span>
                  <button
                    className={s.mobileTitle}
                    type="button"
                    aria-expanded="true"
                    aria-controls={`development-step-${index}`}
                  >
                    {title}
                  </button>
                  <span className={s.number} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </h3>
                <div className={s.accordion} data-step-accordion id={`development-step-${index}`}>
                  <div className={s.stepContent}>
                    <p>{text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
