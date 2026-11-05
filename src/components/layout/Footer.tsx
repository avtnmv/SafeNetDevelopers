import { AnchorLink } from '@/components/navigation/AnchorLink';
import { navigation, site } from '@/config/site';
import s from './Footer.module.scss';
export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <p>
          Хочете створити вражаючий сайт, посилити бренд або отримати вимірювані результати? Ми
          допоможемо.
        </p>
        <div>
          <p className={s.label}>Навігація</p>
          {navigation.map((item) => (
            <AnchorLink key={item.href} href={item.href}>
              {item.label}
            </AnchorLink>
          ))}
        </div>
        <div>
          <p className={s.label}>Зв’язатися</p>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <AnchorLink href="/contact">Написати нам ↗</AnchorLink>
        </div>
      </div>
      <p className={s.wordmark}>
        SafeNet
        <br />
        Developers
      </p>
      <div className={s.bottom}>
        <small>© 2025 {site.name}. Усі права захищені.</small>
        <AnchorLink href="/legal/privacy-policy">Політика конфіденційності</AnchorLink>
        <AnchorLink href="/legal/terms-of-service">Умови використання</AnchorLink>
      </div>
    </footer>
  );
}
