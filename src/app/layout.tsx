import { AnchorLink } from '@/components/navigation/AnchorLink';
import type { Metadata, Viewport } from 'next';
import 'lenis/dist/lenis.css';
import { ScrollExperience } from '@/components/motion/ScrollExperience';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/features/contact/ContactSection';
import { site } from '@/config/site';
import { socialImage } from '@/lib/seo';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  category: 'technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: { type: 'website', locale: 'uk_UA', siteName: site.name, images: [socialImage] },
  twitter: { card: 'summary_large_image', images: [socialImage] },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f5f5f5' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <head>
        {[400, 500, 600].flatMap((weight) =>
          ['cyrillic', 'latin'].map((subset) => (
            <link
              key={`${weight}-${subset}`}
              rel="preload"
              href={`/media/inter-${weight}-${subset}.woff2`}
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          )),
        )}
      </head>
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
