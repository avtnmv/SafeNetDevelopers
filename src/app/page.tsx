import { SeoSchema } from '@/components/SeoSchema';
import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';
import { CreativeHero } from '@/features/creative/CreativeHero';
import { CreativeStudio } from '@/features/creative/CreativeStudio';
import { CreativeServices } from '@/features/creative/CreativeServices';
import { CreativeWork } from '@/features/creative/CreativeWork';
import { CreativeReviews } from '@/features/creative/CreativeReviews';
import { CreativeFaq, CreativeApproach } from '@/features/creative/CreativeDetails';

export const metadata = pageMetadata(
  'Сайти, розробка, дизайн і контент для бізнесу',
  site.description,
  '/',
);

export default function HomePage() {
  return (
    <>
      <SeoSchema />
      <CreativeHero />
      <CreativeStudio />
      <CreativeServices />
      <CreativeWork />
      <CreativeFaq />
      <CreativeReviews />
      <CreativeApproach />
    </>
  );
}
