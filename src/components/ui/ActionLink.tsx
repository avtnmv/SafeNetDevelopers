import type { ReactNode } from 'react';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import s from './ActionLink.module.scss';

export function ActionLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <AnchorLink
      href={href}
      className={`${s.action} ${secondary ? s.secondaryAction : s.primaryAction}`}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M8 2v12m-5-5 5 5 5-5" transform={secondary ? undefined : 'rotate(-135 8 8)'} />
      </svg>
    </AnchorLink>
  );
}
