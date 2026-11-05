import { AnchorLink } from '@/components/navigation/AnchorLink';
import type { ReactNode } from 'react';
import s from './Button.module.scss';

export function Button({
  href,
  children,
  inverse = false,
  showArrow = true,
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
  showArrow?: boolean;
}) {
  return (
    <AnchorLink
      className={`${s.button} ${inverse ? s.inverse : ''}`}
      href={href === '/contact' ? '/#contact' : href}
    >
      {children}
      {showArrow && <span aria-hidden="true">↗</span>}
    </AnchorLink>
  );
}
