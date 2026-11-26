import { pageMetadata } from '@/lib/seo';
import { BrandingPage } from '@/features/branding/BrandingPage';
export const metadata = pageMetadata(
  'Брендинг та айдентика: назва, голос і стиль бренду',
  'Неймінг, логотип, tone of voice та візуальна айдентика. Створюємо цілісну систему бренду й передаємо матеріали та правила для вашої команди.',
  '/branding',
);
export default function Page() {
  return <BrandingPage />;
}
