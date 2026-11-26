import { pageMetadata } from '@/lib/seo';
import { DevelopmentPage } from '@/features/development/DevelopmentPage';

export const metadata = pageMetadata(
  'Розробка під ключ: сайти, вебсервіси та застосунки',
  'Від дизайну до запуску: сайти, клієнтські кабінети та застосунки для iOS і Android. Пентест нашою командою та безкоштовне розміщення на захищених серверах SafeNet.',
  '/development',
);

export default function Page() {
  return <DevelopmentPage />;
}
