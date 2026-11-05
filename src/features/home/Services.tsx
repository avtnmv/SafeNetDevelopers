import { Disclosure } from '@/components/ui/Disclosure';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { services } from './data';
import s from './Services.module.scss';

export function Services() {
  return (
    <section id="services" tabIndex={-1} data-anchor-target className={`${s.section} ${s.dark}`}>
      <SectionHeading label="Що ми робимо" title="Послуги." count="(4)" />
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
              <p>{item.description}</p>
              <div>
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
        <Button inverse href="/contact">
          Почати
        </Button>
      </div>
    </section>
  );
}
