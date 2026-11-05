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
      <ContactForm />
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
        <Button href={`mailto:${site.email}`}>Написати напряму</Button>
      </div>
    </section>
  );
}
