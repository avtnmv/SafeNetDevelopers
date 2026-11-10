import { BrandLogo } from '@/components/ui/BrandLogo';
import { ArrowUpRight } from '@/components/ui/ArrowUpRight';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { navigation, site, socialLinks } from '@/config/site';
import s from './Footer.module.scss';

export function Footer() {
  return (
    <footer id="footer" className={s.footer}>
      <div className={s.main}>
        <div className={s.contacts}>
          <a className={s.email} href={`mailto:${site.email}`}>
            <svg
              className={s.emailIcon}
              viewBox="0 0 24 24"
              width="18"
              height="18"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="12" r="12" fill="currentColor" />
              <path
                d="M12 7v10M7 12h10"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>{site.email}</span>
          </a>
        </div>
        <nav className={s.navigation} aria-label="Навігація у футері">
          <p className={s.label}>Навігація</p>
          {navigation.map((item) => (
            <AnchorLink key={item.href} href={item.href}>
              {item.label}
            </AnchorLink>
          ))}
        </nav>
        <div className={s.social}>
          <p className={s.label}>Соцмережі</p>
          {socialLinks.map(({ label, href }) => (
            <a
              className={s.socialItem}
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
              <ArrowUpRight />
            </a>
          ))}
        </div>
        <div className={s.brand}>
          <AnchorLink
            className={s.wordmark}
            href="/#main"
            aria-label="SafeNet Developers — головна"
          >
            <BrandLogo />
          </AnchorLink>
          <div className={s.legal}>
            <small>
              © {new Date().getFullYear()} {site.name}. Усі права захищені.
            </small>
            <nav aria-label="Правова інформація">
              <AnchorLink href="/legal/privacy-policy">Політика конфіденційності</AnchorLink>
              <AnchorLink href="/legal/terms-of-service">Умови використання</AnchorLink>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
