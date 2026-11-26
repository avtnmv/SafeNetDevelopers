import { AnchorLink } from '@/components/navigation/AnchorLink';
import { Disclosure } from '@/components/ui/Disclosure';
import { CreativeHeading } from '@/features/creative/CreativeHeading';
import c from '@/features/creative/Creative.module.scss';
import s from './Branding.module.scss';
import { modules, process, deliverables, faq } from './data';

function Mark() {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M50 8v84M8 50h84M20 20l60 60M20 80l60-60" stroke="currentColor" strokeWidth="16" />
      <circle cx="50" cy="50" r="17" fill="currentColor" />
    </svg>
  );
}
export function BrandingPage() {
  return (
    <>
      <section className={s.hero}>
        <nav className={s.crumbs} aria-label="Навігаційний шлях">
          <AnchorLink href="/#creative-services">Наші послуги</AnchorLink>
          <span>/</span>
          <span aria-current="page">Брендинг</span>
        </nav>
        <div className={s.heroGrid}>
          <div>
            <p className={c.eyebrow}>Брендинг та айдентика</p>
            <h1>
              Назва, голос
              <br />і стиль <span>вашого бренду.</span>
            </h1>
            <p className={s.lead}>
              Створюємо назви, логотипи, tone of voice та візуальну айдентику. Поєднуємо їх у
              систему, яку ваша команда зможе використовувати на сайті, у соцмережах, презентаціях
              та інших матеріалах.
            </p>
            <div className={s.actions}>
              <AnchorLink href="#contact" className={c.lightButton}>
                Обговорити брендинг ↗
              </AnchorLink>
              <AnchorLink href="#branding-work">Переглянути роботи ↓</AnchorLink>
            </div>
          </div>
          <div
            className={s.brandBoard}
            aria-label="Демонстрація елементів бренду: знак, назва, типографіка, колір і повідомлення"
          >
            <div className={s.boardLogo}>
              <Mark />
              <strong>
                форма<span>простір для вашого</span>
              </strong>
            </div>
            <div className={s.boardType}>
              <small>ТИПОГРАФІКА</small>
              <span>Аа</span>
              <p>Характер у кожній літері.</p>
            </div>
            <div className={s.boardVoice}>
              <small>ГОЛОС БРЕНДУ</small>
              <p>
                Знайдіть місце
                <br />
                для своїх ідей.
              </p>
              <span>Зрозуміло. Відкрито. По-людськи.</span>
            </div>
            <div className={s.boardPalette}>
              <i />
              <i />
              <i />
              <i />
            </div>
            <p className={s.demoLabel}>Демонстраційна концепція / Форма</p>
          </div>
        </div>
      </section>
      <section className={c.section} id="branding-work" tabIndex={-1} data-anchor-target>
        <CreativeHeading
          label="Система в застосуванні"
          title="Як бренд виглядає та звучить у житті"
          description="Показуємо ідею бренду, створені елементи та їх застосування в матеріалах компанії."
        />
        <div className={s.showcase}>
          <div className={s.poster}>
            <span>форма / простір для роботи</span>
            <h3>
              Тут ідеї
              <br />
              знаходять
              <br />
              <em>своє місце.</em>
            </h3>
            <Mark />
            <span>Думайте. Створюйте. Зустрічайтесь.</span>
          </div>
          <div className={s.stationery}>
            <div className={s.businessCard}>
              <Mark />
              <strong>форма</strong>
              <span>Місце для вашого наступного кроку.</span>
            </div>
            <div className={s.editorial}>
              <small>ФОРМА / ПОВІДОМЛЕННЯ</small>
              <p>
                Ваша ідея.
                <br />
                Наш простір.
                <br />
                Нові можливості.
              </p>
            </div>
          </div>
        </div>
        <div className={s.caseCaption}>
          <div>
            <h3>Форма — простір для ідей</h3>
            <p>Демонстраційний проєкт, не клієнтський кейс.</p>
          </div>
          <p>
            Приклад неймінгу, знака, голосу та айдентики для робочого простору. Відкритий знак і
            прості повідомлення передають ідею взаємодії. Показані носії — концепції застосування.
          </p>
        </div>
      </section>
      <section className={s.softSection}>
        <CreativeHeading
          label="Коли звертатися"
          title="Створюєте новий бренд чи розвиваєте наявний?"
          description="Почнемо з того, що вже є та що потрібно змінити. Визначимо склад роботи під вашу задачу."
        />
        <div className={s.situations}>
          {[
            [
              'Запускаємо новий бізнес або продукт',
              'Визначимо назву, характер комунікації та візуальне оформлення для запуску.',
            ],
            [
              'Оновлюємо бренд',
              'З’ясуємо, які елементи вже впізнають клієнти, що варто зберегти та що змінити.',
            ],
            [
              'Потрібна окрема частина',
              'Доповнимо наявний бренд правилами комунікації, графікою, шаблонами або цілісним стилем.',
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className={c.section}>
        <CreativeHeading
          label="Що створюємо"
          title="Що формує ваш бренд"
          description="Назва, комунікація й візуальний стиль спираються на одну погоджену ідею."
        />
        <div className={s.modules}>
          {modules.map((item, i) => (
            <article key={item.title}>
              <div className={s.moduleTop}>
                <span>0{i + 1}</span>
                <span aria-hidden="true" className={s.symbol}>
                  {item.symbol}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={s.result}>
                <small>РЕЗУЛЬТАТ</small>
                <p>{item.result}</p>
              </div>
            </article>
          ))}
        </div>
        <p className={s.scopeNote}>
          Склад проєкту формуємо під задачу. Поглиблені дослідження, додаткові мови, motion,
          упаковку й супровід впровадження погоджуємо окремо.
        </p>
      </section>
      <section className={s.darkSection}>
        <CreativeHeading
          label="Процес"
          title="Як ми працюємо над брендом"
          description="Починаємо з бізнесу й аудиторії, погоджуємо напрям, розвиваємо обрану концепцію та перевіряємо її на потрібних матеріалах."
        />
        <div className={s.process}>
          {process.map(([title, text, agreement], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <div>
                <p>{text}</p>
                <small>{agreement}</small>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className={c.section}>
        <div className={s.delivery}>
          <div>
            <p className={c.eyebrow}>Що передаємо</p>
            <h2>Усе для щоденної роботи з брендом</h2>
            <p className={s.description}>
              Передаємо погоджені матеріали, редаговані файли та правила використання. Ваша команда
              зможе створювати нові матеріали, зберігаючи стиль і характер бренду.
            </p>
            <div className={s.guide}>
              <Mark />
              <span>
                Ваш бренд.
                <br />
                Усе на своїх місцях.
              </span>
              <small>ФАЙЛИ / ПРАВИЛА / ШАБЛОНИ</small>
            </div>
          </div>
          <ul>
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className={s.estimate}>
        <p className={c.eyebrow}>Вартість і строки</p>
        <h2>
          Вартість залежить
          <br />
          від складу роботи
        </h2>
        <p>
          Визначимо, що вже є у вашого бренду, які елементи потрібно створити та де вони будуть
          використовуватися. До старту погодимо результати, етапи, строки, кількість концепцій і
          раундів доопрацювання.
        </p>
        <div className={s.factors}>
          <span>Потрібні модулі</span>
          <span>Мови й ринки</span>
          <span>Носії та шаблони</span>
          <span>Глибина підготовки</span>
        </div>
        <AnchorLink href="#contact" className={c.darkButton}>
          Отримати пропозицію ↗
        </AnchorLink>
      </section>
      <section className={c.section}>
        <CreativeHeading
          label="Наступний крок"
          title="Продовжимо бренд у цифровому середовищі"
          description="Застосуємо погоджений стиль на сайті, у сервісі чи застосунку. Дизайн і розробку узгоджуємо окремо — зі своїм складом робіт, строками та вартістю."
        />
        <div className={s.related}>
          <AnchorLink href="/web-development">
            <span>Створення сайтів</span>
            <span aria-hidden="true">↗</span>
          </AnchorLink>
          <AnchorLink href="/development">
            <span>Індивідуальна розробка</span>
            <span aria-hidden="true">↗</span>
          </AnchorLink>
        </div>
      </section>
      <section className={s.softSection}>
        <div className={s.faq}>
          <div>
            <p className={c.eyebrow}>Питання та відповіді</p>
            <h2>
              Перед початком
              <br />
              роботи
            </h2>
          </div>
          <div>
            {faq.map(([title, text]) => (
              <Disclosure key={title} title={title} reveal={false}>
                <p>{text}</p>
              </Disclosure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
