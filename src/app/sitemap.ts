import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/branding`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/development`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/web-development`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/legal/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/legal/terms-of-service`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
