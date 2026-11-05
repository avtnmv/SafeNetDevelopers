import type { CSSProperties } from 'react';
import Image from 'next/image';
import { assets } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { process } from './data';
import s from './Process.module.scss';

export function Process() {
  return (
    <section className={s.section}>
      <SectionHeading
        label="Про нас"
        title="Як ми запускаємо сайти та маркетингові кампанії"
        compact
      />
      <p className={s.intro} data-reveal="fade">
        Дізнайтеся, як наша команда поєднує творчість, технології та стратегію, щоб створювати
        потужні цифрові рішення.
      </p>
      <div className={s.process}>
        {process.map((title, i) => (
          <article
            key={title}
            data-reveal="card"
            style={{ '--reveal-delay': `${(i % 4) * 75}ms` } as CSSProperties}
          >
            <p>0{i + 1}</p>
            <div className={s.processImage}>
              {assets.process[i] && (
                <Image
                  src={assets.process[i]!}
                  alt={title}
                  fill
                  sizes="(max-width: 809px) 44vw, 23vw"
                />
              )}
            </div>
            <h3>{title}</h3>
          </article>
        ))}
      </div>
      <a href={assets.heroVideo!} className={s.showreel}>
        Дивитися шоуріл <span aria-hidden="true">↗</span>
        <small>(2016–25©)</small>
      </a>
    </section>
  );
}
