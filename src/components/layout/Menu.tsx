'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnchorLink } from '@/components/navigation/AnchorLink';
import { navigation, site } from '@/config/site';
import s from './Header.module.scss';

export function Menu() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  async function close() {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    toggle.current?.focus({ preventScroll: true });
    // Wait for the actual CSS exit, including reduced-motion's immediate exit.
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await Promise.all(
      (panel.current?.getAnimations() ?? []).map((animation) =>
        animation.finished.catch(() => undefined),
      ),
    );
  }

  function toggleMenu() {
    if (openRef.current) void close();
    else {
      openRef.current = true;
      setOpen(true);
    }
  }

  useEffect(() => {
    if (!open) return;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, header > nav, header > a'),
    );
    const previous = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    document.documentElement.dataset.menuOpen = 'true';
    document.dispatchEvent(new CustomEvent('site:menu', { detail: { open: true } }));
    const frame = requestAnimationFrame(() =>
      panel.current?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true }),
    );

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        void close();
      }
      if (event.key !== 'Tab') return;
      const items = Array.from(
        root.current?.querySelectorAll<HTMLElement>('a[href], button:not([tabindex="-1"])') ?? [],
      );
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      background.forEach((element, index) => {
        element.inert = previous[index];
      });
      delete document.documentElement.dataset.menuOpen;
      document.dispatchEvent(new CustomEvent('site:menu', { detail: { open: false } }));
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className={s.menu}
      data-open={open}
      role={open ? 'dialog' : undefined}
      aria-modal={open || undefined}
      aria-label={open ? 'Навігація сайтом' : undefined}
    >
      <button
        ref={toggle}
        type="button"
        className={s.menuToggle}
        onClick={toggleMenu}
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
      >
        <span />
        <span />
      </button>
      <button
        className={s.backdrop}
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        inert={!open}
        onClick={() => void close()}
      />
      <div ref={panel} id="site-menu" className={s.overlay} data-scroll-native inert={!open}>
        <nav aria-label="Основне меню">
          {navigation.map((item, index) => (
            <AnchorLink
              key={item.href}
              href={item.href}
              beforeNavigate={close}
              style={{ '--menu-index': index } as CSSProperties}
            >
              {item.label}
            </AnchorLink>
          ))}
        </nav>
        <div className={s.menuBottom}>
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <AnchorLink href="/legal/privacy-policy" beforeNavigate={close}>
            Політика конфіденційності
          </AnchorLink>
          <AnchorLink href="/legal/terms-of-service" beforeNavigate={close}>
            Умови використання
          </AnchorLink>
          <span>© 2025 {site.name}</span>
        </div>
      </div>
    </div>
  );
}
