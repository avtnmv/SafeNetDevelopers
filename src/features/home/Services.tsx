import Image from 'next/image';
import { Disclosure } from '@/components/ui/Disclosure';
import { Button } from '@/components/ui/Button';
import { services } from './data';
import s from './Services.module.scss';

export function Services() {
  return (
    <section id="services" tabIndex={-1} data-anchor-target className={s.section}>
      <header className={s.heading}>
        <p data-reveal="fade">
          <span aria-hidden="true">✚</span> Що ми робимо
        </p>
        <h2 data-reveal="words">
          <span data-word>Послуги.</span>
          <sup>({services.length})</sup>
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
                  <Image key={src} src={src} alt="" width={80} height={80} sizes="80px" />
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
                  <li className={s.count}>{item.tags.length}+</li>
                </ul>
              </div>
            </div>
          </Disclosure>
        ))}
      </div>
      <div className={s.action}>
        <Button inverse href="/contact">
          Почати
        </Button>
      </div>
    </section>
  );
}
