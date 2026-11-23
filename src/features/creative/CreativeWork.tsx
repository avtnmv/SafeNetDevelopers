import { ArrowUpRight } from '@/components/ui/ArrowUpRight';
import { CreativeCaseVideo } from './CreativeCaseVideo';
import { projects } from '@/lib/content';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { Disclosure } from '@/components/ui/Disclosure';
import { CreativeHeading } from './CreativeHeading';
import s from './Creative.module.scss';

const caseVideos: Record<string, { media: string; width: number; height: number }> = {
  powersurge: { media: 'skyrend-rebuild', width: 1600, height: 734 },
  boltshift: { media: 'dasp-rebuild', width: 1280, height: 540 },
  cloudwatch: { media: 'identity-rebuild-clean', width: 1600, height: 690 },
  warpspeed: { media: 'hoteliero-rebuild', width: 1600, height: 690 },
};

const caseLinks: Record<string, string> = {
  powersurge: 'https://skyrend.cz/',
  boltshift: 'https://dasp.ua/',
  warpspeed: 'https://hotelinsights.com.ua/',
  cloudwatch: 'https://identity-space.com/',
};

const visibleProjects = projects.filter((project) =>
  ['boltshift', 'warpspeed', 'cloudwatch', 'powersurge'].includes(project.slug),
);

export function CreativeWork() {
  return (
    <section className={s.section} id="creative-work" tabIndex={-1} data-anchor-target>
      <CreativeHeading
        label="Вибрані роботи"
        title="Проєкти, у яких ідеї стають досвідом."
        description="Кожен бізнес має свою історію. Ми допомагаємо розповісти її через дизайн, функціональність і продумані деталі."
      />
      <div className={s.projects}>
        {visibleProjects.map((project) => (
          <article className={s.project} key={project.slug} data-reveal="card">
            {caseVideos[project.slug] ? (
              <CreativeCaseVideo {...caseVideos[project.slug]} name={project.name} />
            ) : (
              <div className={s.projectImage}>
                <ResponsiveImage
                  src={project.cover}
                  alt={`Сайт ${project.name}`}
                  fill
                  sizes="(max-width: 809px) calc(100vw - 40px), calc((100vw - 96px) / 2)"
                />
              </div>
            )}
            <Disclosure
              reveal={false}
              title={
                <div className={s.projectCaption}>
                  <h3>{project.name}</h3>
                  <span>{project.caseSummary?.activity ?? 'Дизайн і розробка'}</span>
                </div>
              }
            >
              <div className={s.projectDescription}>
                <p>{project.caseSummary?.before ?? 'Розробка цифрового досвіду для бренду.'}</p>
                <p>{project.caseSummary?.after ?? 'Виразний дизайн і зручна навігація.'}</p>
              </div>
            </Disclosure>
            {caseLinks[project.slug] && (
              <a
                className={s.textLink}
                href={caseLinks[project.slug]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Дивитися демо ${project.name} — у новій вкладці`}
              >
                Дивитися демо <ArrowUpRight />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
