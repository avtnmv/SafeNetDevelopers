import Image from 'next/image';
import { assets } from '@/lib/content';
import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import s from './Hero.module.scss';
export function Hero() {
  return (
    <section className={s.hero} aria-label="SafeNet Developers — цифрова студія">
      <Image
        src={assets.hero!}
        alt=""
        fill
        preload
        sizes="100vw"
        quality={75}
        className={s.background}
      />
      <div className={s.top}>
        <div className={s.wordmark}>
          SafeNet
          <br />
          <span>Developers</span>
          <p>Студія</p>
        </div>
        <ul className={s.services}>
          <li>Брендинг та айдентика</li>
          <li>Маркетинг у соцмережах</li>
          <li>Вебдизайн і розробка</li>
          <li>SEO-оптимізація</li>
        </ul>
      </div>
      <div className={s.crosses} aria-hidden="true">
        <span>+</span>
        <span>+</span>
        <span>+</span>
        <span>+</span>
      </div>
      <div className={s.bottom}>
        <h1>
          Жодних шаблонних сайтів чи порожніх обіцянок.{' '}
          <span>Лише інструменти та стратегії, які розвивають ваш бізнес і підсилюють бренд.</span>
        </h1>
        <small>© 2025 {site.name}</small>
        <div className={s.person}>
          <Image src={assets.lead!} alt="Lauren Thompson" width={120} height={154} sizes="120px" />
          <div>
            <p>Керівниця команди</p>
            <small>у SafeNet Developers</small>
            <h2>Lauren Thompson</h2>
            <Button href="/contact">Поговорімо</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
