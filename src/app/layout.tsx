import { AnchorLink } from '@/components/navigation/AnchorLink';
import type { Metadata, Viewport } from 'next';
import 'lenis/dist/lenis.css';
import { ScrollExperience } from '@/components/motion/ScrollExperience';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/features/contact/ContactSection';
import { site } from '@/config/site';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.description,
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f5f5f5' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>
        <AnchorLink href="#main" className="skip">
          Перейти до вмісту
        </AnchorLink>
        <ScrollExperience />
        <Header />
        <main id="main" tabIndex={-1} data-anchor-target>
          {children}
          <ContactSection />
        </main>
        <Footer />
      </body>
    </html>
  );
}
