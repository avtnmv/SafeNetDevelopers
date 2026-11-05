import type { Metadata } from 'next';
import { ProjectGrid } from '@/features/projects/ProjectGrid';
import s from '@/styles/Pages.module.scss';
export const metadata: Metadata = {
  title: 'Проєкти',
  description: 'Добірка проєктів із вебдизайну, розробки та брендингу SafeNet Developers.',
};
export default function ProjectsPage() {
  return (
    <div className={s.page}>
      <h1 className={s.title}>Проєкти.</h1>
      <p className={s.description}>
        Ми допомогли компаніям із різних галузей досягти цілей. Ось кілька наших останніх проєктів.
      </p>
      <ProjectGrid />
    </div>
  );
}
