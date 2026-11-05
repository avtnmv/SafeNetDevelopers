import { AnchorLink } from '@/components/navigation/AnchorLink';
import { navigation, site } from '@/config/site';
import { Menu } from './Menu';
import s from './Header.module.scss';
export function Header() {
  return (
    <header className={s.header}>
      <AnchorLink href="/#main" className={s.brand} aria-label={`${site.name} — головна`}>
        {site.name}
      </AnchorLink>
      <nav aria-label="Розділи сайту" className={s.desktop}>
        {navigation.slice(1).map((item) => (
          <AnchorLink href={item.href} key={item.href}>
            {item.label}
          </AnchorLink>
        ))}
      </nav>
      <Menu />
    </header>
  );
}
