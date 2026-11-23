import type { Metadata } from 'next';
import { site } from '@/config/site';
export const socialImage = {
  url: '/media/safenet-og.png',
  width: 1200,
  height: 630,
  alt: 'SafeNet Developers — розробка, дизайн, контент і безпека для бізнесу.',
};
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = title.includes(site.name) ? title : `${title} — ${site.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: 'uk_UA',
      type: 'website',
      images: [socialImage],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [socialImage] },
  };
}
