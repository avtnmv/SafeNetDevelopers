import type { CSSProperties } from 'react';
import { ResponsiveImage as Image } from '@/components/ui/ResponsiveImage';
import Link from 'next/link';
import { projects, type Project } from '@/lib/content';
import { Disclosure } from '@/components/ui/Disclosure';
import s from './Projects.module.scss';
export function ProjectGrid({ items = projects }: { items?: Project[] }) {
  return (
    <div className={s.grid}>
      {items.map((project, index) =>
        project.caseSummary ? (
          <article key={project.slug} className={s.card} data-reveal="card">
            <div className={s.image}>
              <div className={s.imageViewport}>
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(max-width: 809px) calc(100vw - 40px), 48vw"
                />
              </div>
            </div>
            <Disclosure
              className={s.caseDisclosure}
              reveal={false}
              title={
                <div className={s.caseHeading}>
                  <h3>{project.name}</h3>
                  <span>/ {project.caseSummary.activity}</span>
                </div>
              }
              indicator={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  focusable="false"
                >
                  <path d="M5 19 19 5M5 5h14v14" />
                </svg>
              }
            >
              <div className={s.caseResults}>
                <p>
                  <strong>До:</strong> {project.caseSummary.before}
                </p>
                <p>
                  <strong>Після:</strong> {project.caseSummary.after}
                </p>
                <p>
                  <strong>Результат:</strong>{' '}
                  {project.caseSummary.resultHighlight && (
                    <>
                      <strong>{project.caseSummary.resultHighlight}</strong>{' '}
                    </>
                  )}
                  {project.caseSummary.result}
                </p>
              </div>
            </Disclosure>
          </article>
        ) : (
          <Link
            key={project.slug}
            data-reveal="card"
            style={{ '--reveal-delay': `${(index % 2) * 75}ms` } as CSSProperties}
            href={`/projects/${project.slug}`}
            className={s.card}
          >
            <div className={s.image}>
              <div className={s.imageViewport}>
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(max-width: 809px) calc(100vw - 40px), 48vw"
                />
              </div>
            </div>
            <div className={s.caption}>
              <h3>{project.name}</h3>
              <span>/ {project.year}</span>
              <span aria-hidden="true">↗</span>
            </div>
          </Link>
        ),
      )}
    </div>
  );
}
