'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type Lenis from 'lenis';
import { useCounters } from './useCounters';

/** One scroll controller and one reveal observer; scrolling never updates React state. */
export function ScrollExperience() {
  const pathname = usePathname();
  useCounters(pathname);
  const scroll = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let generation = 0;

    async function configure() {
      const current = ++generation;
      scroll.current?.destroy();
      scroll.current = null;
      if (reduced.matches || !finePointer.matches) return;

      const { default: Lenis } = await import('lenis');
      if (current !== generation) return;
      scroll.current = new Lenis({
        autoRaf: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        anchors: false,
        stopInertiaOnNavigate: true,
        prevent: (node) => node.tagName === 'TEXTAREA' || node.hasAttribute('data-scroll-native'),
      });
      if (document.documentElement.dataset.menuOpen === 'true') scroll.current.stop();
    }

    function onMenu(event: Event) {
      if ((event as CustomEvent<{ open: boolean }>).detail.open) scroll.current?.stop();
      else scroll.current?.start();
    }
    document.addEventListener('site:menu', onMenu);
    void configure();
    reduced.addEventListener('change', configure);
    finePointer.addEventListener('change', configure);
    return () => {
      generation++;
      scroll.current?.destroy();
      scroll.current = null;
      reduced.removeEventListener('change', configure);
      finePointer.removeEventListener('change', configure);
      document.removeEventListener('site:menu', onMenu);
    };
  }, []);

  useEffect(() => {
    function onAnchor(event: Event) {
      const hash = (event as CustomEvent<{ hash: string }>).detail.hash;
      let id: string;
      try {
        id = decodeURIComponent(hash.replace(/^#/, ''));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      const focus = () => target.focus({ preventScroll: true });
      if (scroll.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        scroll.current.resize();
        scroll.current.scrollTo(target, {
          offset: 0,
          duration: 1.1,
          lerp: 0,
          easing: (t) => 1 - Math.pow(1 - t, 4),
          onComplete: focus,
        });
      } else {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
          top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 82),
          behavior: reduced ? 'instant' : 'smooth',
        });
        focus();
      }
    }
    document.addEventListener('site:anchor', onAnchor);
    return () => document.removeEventListener('site:anchor', onAnchor);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;

    function observe() {
      observer?.disconnect();
      const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
      if (reduced.matches || !('IntersectionObserver' in window)) {
        delete document.documentElement.dataset.motion;
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0, rootMargin: '0px 0px -7% 0px' },
      );
      for (const element of targets) {
        // Content already visible at navigation time stays immediately readable (including LCP).
        if (element.getBoundingClientRect().top < window.innerHeight * 0.93) {
          element.classList.add('is-visible');
        } else if (!element.classList.contains('is-visible')) {
          observer.observe(element);
        }
      }
      document.documentElement.dataset.motion = 'ready';
    }

    observe();
    scroll.current?.resize();
    const hashFrame = requestAnimationFrame(() => {
      if (window.location.hash)
        document.dispatchEvent(
          new CustomEvent('site:anchor', { detail: { hash: window.location.hash } }),
        );
    });
    reduced.addEventListener('change', observe);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(hashFrame);
      reduced.removeEventListener('change', observe);
      delete document.documentElement.dataset.motion;
    };
  }, [pathname]);

  return null;
}
