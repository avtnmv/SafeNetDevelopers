import { pageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { legal } from '@/lib/content';
import { RichContent } from '@/components/ui/RichContent';
import s from '@/styles/Pages.module.scss';
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return legal.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = legal.find((p) => p.slug === slug);
  if (!page) return { title: 'Сторінку не знайдено', robots: { index: false } };
  const description =
    slug === 'privacy-policy'
      ? 'Як SafeNet Developers обробляє та захищає персональні дані відвідувачів сайту.'
      : 'Умови використання сайту SafeNet Developers та загальні правила взаємодії.';
  return pageMetadata(page.title, description, '/legal/' + slug);
}
export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = legal.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <article className={s.page}>
      <h1 className={s.title}>{page.title}</h1>
      <p className={s.date}>Останнє оновлення: 5 березня 2025</p>
      <RichContent blocks={page.body} />
    </article>
  );
}
