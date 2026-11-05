import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, type Project } from '@/lib/content';
import s from './Projects.module.scss';
export function ProjectGrid({ items = projects }: { items?: Project[] }) {
  return (
    <div className={s.grid}>
      {items.map((project, index) => (
        <Link
          key={project.slug}
          data-reveal="card"
          style={{ '--reveal-delay': `${(index % 2) * 75}ms` } as CSSProperties}
          href={`/projects/${project.slug}`}
          className={s.card}
        >
          <div className={s.image}>
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(max-width: 809px) calc(100vw - 40px), 48vw"
            />
            <span className={s.name} aria-hidden="true">
              {project.name}
            </span>
          </div>
          <div className={s.caption}>
            <h3>{project.name}</h3>
            <span>/ {project.year}</span>
            <span aria-hidden="true">↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
