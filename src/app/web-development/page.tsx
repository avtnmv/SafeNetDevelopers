import { pageMetadata } from '@/lib/seo';
import { SeoSchema } from '@/components/SeoSchema';
import { TrustStrip } from '@/features/home/TrustStrip';
import { Hero } from '@/features/home/Hero';
import { ProjectsSection } from '@/features/home/ProjectsSection';
import { Advantages } from '@/features/home/Advantages';
import { Services } from '@/features/home/Services';
import { Process } from '@/features/home/Process';
import { Testimonials } from '@/features/home/Testimonials';
import { Results } from '@/features/home/Results';
import { Team } from '@/features/home/Team';
import { Faq } from '@/features/home/Faq';
import { Pricing } from '@/features/home/Pricing';
export const metadata = pageMetadata(
  'Сайт для бізнесу за 3 дні — SafeNet Developers',
  'Сайт для бізнесу за 3 дні: дизайн, тексти, розробка та перевірка безпеки. Пакети «Старт» і «Бізнес», договір та оплата 50/50.',
  '/web-development',
);

export default function WebDevelopmentPage() {
  return (
    <>
      <SeoSchema />
      <Hero />
      <TrustStrip />
      <ProjectsSection />
      <Pricing />
      <Services />
      <Advantages />
      <Process />
      <Testimonials />
      <Results />
      <Team />
      <Faq />
    </>
  );
}
