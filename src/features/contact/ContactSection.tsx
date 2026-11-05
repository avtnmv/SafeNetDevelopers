import { HeroVideo } from '@/features/home/HeroVideo';
import { assets } from '@/lib/content';
import { ContactForm } from './ContactForm';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';
import s from './Contact.module.scss';
export function ContactSection() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      data-anchor-target
      className={s.section}
      aria-labelledby="contact-heading"
    >
      <div className={s.media} aria-hidden="true">
        <HeroVideo src={assets.heroVideo} className={s.background} />
      </div>
      <div className={s.formColumn}>
        <ContactForm />
        <p className={s.copyright}>© 2025 SafeNet Developers</p>
      </div>
      <div className={s.copy} data-reveal="fade">
        <h2 id="contact-heading">Поговорімо.</h2>
        <p>Розкажіть про свій проєкт — сайт, SEO або маркетинг.</p>
        <div>
          <h3>Швидка відповідь.</h3>
          <p>Готові творити та співпрацювати? Будемо раді почути вас.</p>
        </div>
        <div>
          <h3>Зрозумілі наступні кроки.</h3>
          <p>Після консультації ми надамо детальний план і графік роботи.</p>
        </div>
        <Button inverse href={`mailto:${site.email}`}>
          Написати напряму
        </Button>
      </div>
    </section>
  );
}
