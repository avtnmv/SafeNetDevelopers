'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'onClick'> & {
  href: string;
  beforeNavigate?: () => void | Promise<void>;
};

/** Uses native links for navigation; only section jumps and animated menu exits are intercepted. */
export function AnchorLink({ href, beforeNavigate, ...props }: Props) {
  const router = useRouter();

  async function navigate(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === '_blank'
    )
      return;
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin || (!url.hash && !beforeNavigate)) return;

    event.preventDefault();
    await beforeNavigate?.();
    const samePage =
      url.pathname === window.location.pathname && url.search === window.location.search;
    if (samePage && url.hash) {
      if (window.location.hash !== url.hash) window.history.pushState(null, '', url.hash);
      document.dispatchEvent(new CustomEvent('site:anchor', { detail: { hash: url.hash } }));
    } else {
      router.push(href, { scroll: !url.hash });
    }
  }

  return <Link {...props} href={href} onClick={navigate} />;
}
