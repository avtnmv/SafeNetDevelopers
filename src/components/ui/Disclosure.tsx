'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import s from './Disclosure.module.scss';

/** Native details fallback, with interruptible height animation after hydration. */
export function Disclosure({
  title,
  children,
  defaultOpen = false,
  reveal = true,
  className = '',
  indicator = '+',
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  reveal?: boolean;
  className?: string;
  indicator?: ReactNode;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const summary = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const bodyAnimation = useRef<Animation | null>(null);
  const expanded = useRef(defaultOpen);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => {
      if (reduced.matches) {
        animation.current?.finish();
        bodyAnimation.current?.finish();
      }
    };
    reduced.addEventListener('change', finish);
    return () => {
      animation.current?.cancel();
      bodyAnimation.current?.cancel();
      reduced.removeEventListener('change', finish);
    };
  }, []);

  function toggle(event: MouseEvent<HTMLElement>) {
    const element = details.current;
    const heading = summary.current;
    const body = content.current;
    if (!element || !heading || !body || !element.animate) return;
    event.preventDefault();
    if (element.dataset.expanded === undefined) expanded.current = element.open;
    const startHeight = element.getBoundingClientRect().height;
    animation.current?.cancel();
    bodyAnimation.current?.cancel();
    animation.current = null;
    bodyAnimation.current = null;
    const next = !expanded.current;
    expanded.current = next;
    element.dataset.expanded = String(next);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.open = next;
      return;
    }

    element.open = true;
    const style = getComputedStyle(element);
    const closedHeight =
      heading.getBoundingClientRect().height +
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth);
    const endHeight = next ? element.scrollHeight : closedHeight;
    const effect = element.animate([{ height: `${startHeight}px` }, { height: `${endHeight}px` }], {
      duration: 360,
      easing: 'cubic-bezier(0.16,1,0.3,1)',
    });
    animation.current = effect;
    bodyAnimation.current = body.animate(
      next
        ? [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ]
        : [{ opacity: 1 }, { opacity: 0 }],
      { duration: next ? 320 : 150, fill: 'both' },
    );
    effect.onfinish = () => {
      element.open = next;
      bodyAnimation.current?.cancel();
      bodyAnimation.current = null;
      animation.current = null;
    };
  }

  return (
    <details
      ref={details}
      className={`${s.root} ${className}`}
      open={defaultOpen}
      data-reveal={reveal ? 'fade' : undefined}
    >
      <summary ref={summary} onClick={toggle}>
        {title}
        <span aria-hidden="true">{indicator}</span>
      </summary>
      <div ref={content} className={s.content}>
        {children}
      </div>
    </details>
  );
}
