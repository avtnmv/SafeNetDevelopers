import { TelegramLink } from '@/components/ui/TelegramLink';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { site } from '@/config/site';
import { Menu } from './Menu';
import s from './Header.module.scss';
export function Header() {
  return (
    <header className={s.header}>
      <AnchorLink href="/#main" className={s.brand} aria-label={`${site.name} — головна`}>
        <BrandLogo />
      </AnchorLink>
      <Menu />
      <TelegramLink floating />
    </header>
  );
}
