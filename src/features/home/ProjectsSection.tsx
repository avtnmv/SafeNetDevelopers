import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectGrid } from '@/features/projects/ProjectGrid';
import s from './ProjectsSection.module.scss';

export function ProjectsSection() {
  return (
    <section id="projects" tabIndex={-1} data-anchor-target className={s.section}>
      <div className={s.headingRow}>
        <SectionHeading title="Проєкти." />
        <p className={s.intro} data-reveal="fade">
          Ми допомогли компаніям із різних галузей досягти цілей. Ось кілька наших останніх
          проєктів.
        </p>
      </div>
      <ProjectGrid />
    </section>
  );
}
