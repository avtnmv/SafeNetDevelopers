import type { Metadata } from 'next';
import Image from 'next/image';
import { assets } from '@/lib/content';
import { Team } from '@/features/home/Team';
import { Clients } from '@/features/home/Clients';
import s from '@/styles/Pages.module.scss';
export const metadata: Metadata = {
  title: 'Студія',
  description: 'Команда SafeNet Developers, наш підхід до дизайну та розробки.',
};
export default function StudioPage() {
  return (
    <>
      <div className={s.page}>
        <h1 className={s.title}>Студія.</h1>
        <p className={s.lead}>
          Ми — цифрова студія, що спеціалізується на розробці сайтів, SEO та маркетингу.
        </p>
        <div className={s.heroImage}>
          <Image
            src={assets.studio!}
            alt="Команда студії за спільною роботою"
            fill
            preload
            sizes="100vw"
          />
        </div>
        <section className={s.detail}>
          <h2>Наш підхід</h2>
          <div>
            <p>
              Ми віримо, що сайт має бути більшим, ніж просто присутність в інтернеті: він повинен
              працювати на ваш бізнес.
            </p>
            <p>
              Ми створюємо швидкі, ефективні та прості в управлінні сайти, щоб ви могли зосередитися
              на головному — своєму бізнесі.
            </p>
          </div>
        </section>
        <section className={s.awards}>
          <h2>Нагороди.</h2>
          {[
            ['Найкраща агенція вебдизайну', 'Web Excellence Awards', '2025'],
            ['Провідна агенція цифрового маркетингу', 'Clutch Top Agencies', '2025'],
            ['Найкраща інновація UI/UX', 'CSS Design Awards', '2024'],
            ['Почесна відзнака', 'Awwwards', '2024'],
          ].map((row) => (
            <div key={row[0]}>
              {row.map((cell) => (
                <p key={cell}>{cell}</p>
              ))}
            </div>
          ))}
        </section>
      </div>
      <Clients />
      <Team />
    </>
  );
}
