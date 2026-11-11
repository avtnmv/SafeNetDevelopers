import { site, socialLinks } from '@/config/site';
export function SeoSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: `${site.url}/media/safenet-logo-square.png`,
        email: site.email,
        sameAs: [...socialLinks.map((link) => link.href), site.telegram],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        url: site.url,
        inLanguage: 'uk-UA',
        publisher: { '@id': `${site.url}/#organization` },
      },
      {
        '@type': 'Service',
        '@id': `${site.url}/#web-development`,
        name: 'Розробка сайтів для бізнесу',
        serviceType: 'Web development',
        provider: { '@id': `${site.url}/#organization` },
        url: `${site.url}/#pricing`,
        offers: [
          {
            '@type': 'Offer',
            name: 'Старт',
            price: '300',
            priceCurrency: 'USD',
            url: `${site.url}/#pricing`,
          },
          {
            '@type': 'Offer',
            name: 'Бізнес',
            price: '500',
            priceCurrency: 'USD',
            url: `${site.url}/#pricing`,
          },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
