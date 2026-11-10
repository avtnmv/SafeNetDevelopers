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
export default function HomePage() {
  return (
    <>
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
