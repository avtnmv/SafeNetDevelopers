import { assets } from '@/lib/content';
import { LogoMarquee } from '@/components/ui/LogoMarquee';
import s from './Clients.module.scss';

export function Clients() {
  return (
    <section className={s.clients} aria-label="Наші клієнти">
      <div className={s.heading}>
        <p>Наші клієнти</p>
        <small>(2016–25©)</small>
      </div>
      <LogoMarquee logos={assets.logos.filter((src): src is string => Boolean(src))} />
    </section>
  );
}
