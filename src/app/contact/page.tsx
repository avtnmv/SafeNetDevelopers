import type { Metadata } from 'next';
import s from '@/styles/Pages.module.scss';
export const metadata: Metadata = {
  title: 'Контакти',
  description: 'Обговоріть сайт, брендинг або маркетинговий проєкт із SafeNet Developers.',
};
export default function ContactPage() {
  return (
    <div className={s.page}>
      <h1 className={s.title}>Зв’яжімося.</h1>
      <p className={s.description}>
        Маєте проєкт на думці? Напишіть нам, і ми обговоримо найкращий шлях уперед.
      </p>
    </div>
  );
}
