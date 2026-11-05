import Link from 'next/link';
export default function NotFound() {
  return (
    <section style={{ padding: '100px var(--gutter)' }}>
      <h1>Сторінку не знайдено</h1>
      <p>
        Перевірте адресу або <Link href="/">поверніться на головну</Link>.
      </p>
    </section>
  );
}
