'use client';
import { useEffect } from 'react';

export function useCounters(pathname: string) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const active = new Map<HTMLElement, number>();
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-counter]')];
    let frame = 0;
    const render = (node: HTMLElement, progress: number) => {
      const value = Number(node.dataset.counter);
      node.textContent = `${node.dataset.prefix ?? ''}${(value * progress).toFixed(Number(node.dataset.decimals))}${node.dataset.suffix ?? ''}`;
    };
    const tick = (time: number) => {
      for (const [node, start] of active) {
        const progress = Math.min((time - start) / 1400, 1);
        render(node, 1 - (1 - progress) ** 3);
        if (progress === 1) active.delete(node);
      }
      frame = active.size ? requestAnimationFrame(tick) : 0;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const node = entry.target as HTMLElement;
          observer.unobserve(node);
          if (reduced.matches) render(node, 1);
          else {
            render(node, 0);
            active.set(node, performance.now());
          }
        }
        if (active.size && !frame) frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    nodes.forEach((node) => observer.observe(node));
    const finish = () => {
      if (!reduced.matches) return;
      cancelAnimationFrame(frame);
      frame = 0;
      active.clear();
      nodes.forEach((node) => render(node, 1));
      observer.disconnect();
    };
    reduced.addEventListener('change', finish);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      reduced.removeEventListener('change', finish);
      nodes.forEach((node) => render(node, 1));
    };
  }, [pathname]);
}
