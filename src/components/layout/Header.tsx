import { AnchorLink } from '@/components/navigation/AnchorLink';
import { site } from '@/config/site';
import { Menu } from './Menu';
import s from './Header.module.scss';
export function Header() {
  return (
    <header className={s.header}>
      <AnchorLink href="/#main" className={s.brand} aria-label={`${site.name} — головна`}>
        {site.name}
      </AnchorLink>
      <Menu />
    </header>
  );
}
