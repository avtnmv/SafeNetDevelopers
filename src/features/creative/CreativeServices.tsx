'use client';
import { useState } from 'react';
import { Disclosure } from '@/components/ui/Disclosure';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { CreativeHeading } from './CreativeHeading';
import s from './Creative.module.scss';
import { creativeServices as services } from './services-data';

function ServiceContent({ service }: { service: (typeof services)[number] }) {
  return (
    <>
      <div className={s.serviceImage}>
        <img
          src={service.vector ? `${service.image}.svg` : `${service.image}-1200.webp`}
          srcSet={
            service.vector
              ? undefined
              : `${service.image}-640.webp 640w, ${service.image}-1200.webp 1200w`
          }
          sizes="(max-width: 809px) calc(100vw - 56px), 42vw"
          alt=""
          width={640}
          height={448}
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3>{service.subtitle}</h3>
      <p>{service.description}</p>
      <ul className={s.tags}>
        {service.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <ul className={s.serviceOfferings}>
        {service.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <AnchorLink className={s.textLink} href={service.href ?? '#contact'}>
        {service.href ? 'Дізнатися більше' : 'Обговорити завдання'}
      </AnchorLink>
    </>
  );
}

export function CreativeServices() {
  const [active, setActive] = useState(0);
  return (
    <section className={s.services} id="creative-services" tabIndex={-1} data-anchor-target>
      <CreativeHeading
        label="Наші послуги"
        title="Усе, що потрібно вашому бренду."
        description="Від першого враження до щоденної роботи. Сайти, розробка, аудит безпеки, контент, графічний дизайн і брендинг — комплексні рішення для вашого бізнесу."
      />
      <div className={s.serviceMobile}>
        {services.map((service, i) => (
          <Disclosure
            key={service.title}
            title={service.title}
            defaultOpen={i === 0}
            reveal={false}
            className={s.serviceAccordion}
          >
            <div className={s.servicePanel}>
              <ServiceContent service={service} />
            </div>
          </Disclosure>
        ))}
      </div>
      <div className={s.serviceGrid}>
        <div
          className={s.serviceTabs}
          role="tablist"
          aria-label="Послуги"
          aria-orientation="vertical"
        >
          {services.map((service, i) => (
            <button
              key={service.title}
              id={`creative-service-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`creative-service-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => {
                if (window.matchMedia('(hover: hover)').matches) setActive(i);
              }}
              onKeyDown={(event) => {
                let next = i;
                if (event.key === 'ArrowDown') next = (i + 1) % services.length;
                else if (event.key === 'ArrowUp')
                  next = (i + services.length - 1) % services.length;
                else if (event.key === 'Home') next = 0;
                else if (event.key === 'End') next = services.length - 1;
                else return;
                event.preventDefault();
                setActive(next);
                document.getElementById(`creative-service-tab-${next}`)?.focus();
              }}
            >
              {service.title}
              <span aria-hidden="true">{active === i ? '−' : '+'}</span>
            </button>
          ))}
        </div>
        <div className={s.servicePanels}>
          {services.map((service, i) => (
            <article
              key={service.title}
              id={`creative-service-${i}`}
              role="tabpanel"
              aria-labelledby={`creative-service-tab-${i}`}
              hidden={active !== i}
              tabIndex={0}
              className={s.servicePanel}
            >
              <ServiceContent service={service} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
