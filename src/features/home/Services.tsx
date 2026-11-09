import Image from 'next/image';
import { Disclosure } from '@/components/ui/Disclosure';
import { ActionLink } from '@/components/ui/ActionLink';
import { services } from './data';
import s from './Services.module.scss';

export function Services() {
  return (
    <section id="services" tabIndex={-1} data-anchor-target className={s.section}>
      <header className={s.heading}>
        <p data-reveal="fade">
          <span aria-hidden="true">✚</span> Наші послуги
        </p>
        <h2 data-reveal="words">
          <span data-word>Що входить.</span>
        </h2>
      </header>
      <div className={s.services}>
        {services.map((item, i) => (
          <Disclosure
            key={item.name}
            defaultOpen={i === 0}
            reveal={false}
            title={
              <>
                <small>(00{i + 1})</small>
                <h3>{item.name}</h3>
              </>
            }
          >
            <div className={s.serviceContent}>
              <div className={s.images} aria-hidden="true">
                {item.images.map((src) => (
                  <Image key={src} src={src} alt="" width={120} height={120} sizes="120px" />
                ))}
              </div>
              <div className={s.description}>
                <p className={s.name} aria-hidden="true">
                  {item.name}
                </p>
                <p>{item.description}</p>
              </div>
              <div className={s.categories}>
                <p>Категорії</p>
                <ul>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Disclosure>
        ))}
      </div>
      <div className={s.action}>
        <ActionLink href="/#contact">Почати</ActionLink>
      </div>
    </section>
  );
}
