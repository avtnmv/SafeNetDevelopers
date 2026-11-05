import { Hero } from '@/features/home/Hero';
import { Clients } from '@/features/home/Clients';
import { ProjectsSection } from '@/features/home/ProjectsSection';
import { Advantages } from '@/features/home/Advantages';
import { Services } from '@/features/home/Services';
import { Process } from '@/features/home/Process';
import { Testimonials } from '@/features/home/Testimonials';
import { Results } from '@/features/home/Results';
import { CaseStudy } from '@/features/home/CaseStudy';
import { Team } from '@/features/home/Team';
import { Faq } from '@/features/home/Faq';
import { Pricing } from '@/features/home/Pricing';
export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <ProjectsSection />
      <Advantages />
      <Services />
      <Process />
      <Testimonials />
      <Results />
      <CaseStudy />
      <Pricing />
      <Team />
      <Faq />
    </>
  );
}
