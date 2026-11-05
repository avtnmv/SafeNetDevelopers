import type { CSSProperties } from 'react';
import Image from 'next/image';
import { team } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import s from './Team.module.scss';

export function Team() {
  return (
    <section className={s.section}>
      <SectionHeading label="SafeNet Developers" title="Люди за нашими проєктами." compact />
      <div className={s.team}>
        {team.map((person, index) => (
          <article
            key={person.name}
            data-reveal="card"
            style={{ '--reveal-delay': `${(index % 4) * 75}ms` } as CSSProperties}
          >
            <div className={s.portrait}>
              {person.image && (
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 809px) 44vw, 23vw"
                />
              )}
              <p>
                {person.role}
                <br />
                <small>у SafeNet Developers</small>
              </p>
            </div>
            <h3>{person.name}</h3>
            <p>{person.description}</p>
          </article>
        ))}
      </div>
      <div className={s.teamCallout} data-reveal="fade">
        <p>Ми віримо, що найкращі результати народжуються у співпраці.</p>
        <Button href="mailto:hello@fabrica.com">Приєднатися</Button>
      </div>
    </section>
  );
}
