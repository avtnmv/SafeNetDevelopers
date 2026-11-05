import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/content';
import type { Metadata } from 'next';
import s from '@/styles/Pages.module.scss';
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.name, description: project?.sections[0]?.paragraphs[0] };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className={s.page}>
      <h1 className={s.title}>{project.name}</h1>
      <div className={s.heroImage}>
        <Image
          src={project.gallery[0] || project.cover}
          alt={`Дизайн проєкту ${project.name}`}
          fill
          preload
          sizes="100vw"
        />
      </div>
      {project.sections.map((section) => (
        <section key={section.title} className={s.detail} data-reveal="fade">
          <h2>{section.title}</h2>
          <div>
            {section.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </section>
      ))}
      <div className={s.gallery}>
        {project.gallery.slice(1).map((image, i) => (
          <div key={image} data-reveal="card">
            <Image
              src={image}
              alt={`${project.name} — зображення ${i + 2}`}
              fill
              sizes="(max-width: 809px) 90vw, 50vw"
            />
          </div>
        ))}
      </div>
      <nav aria-label="Інші проєкти" className={s.next}>
        <Link href="/projects">Усі проєкти</Link>
        <Link href={`/projects/${next.slug}`}>Далі: {next.name} ↗</Link>
      </nav>
    </article>
  );
}
