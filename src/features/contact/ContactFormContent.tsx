import s from './Contact.module.scss';
import { PlanSelect } from './PlanSelect';
export function ContactFormContent() {
  return (
    <>
      <div className={s.formHeading}>
        <h3>Розрахуємо ваш сайт за 15 хвилин</h3>
      </div>
      <div className={s.fields}>
        <label htmlFor="contact-name">
          Ваше ім’я*
          <input id="contact-name" name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label htmlFor="contact-phone">
          Телефон або @telegram*
          <input
            id="contact-phone"
            name="phone"
            type="text"
            autoComplete="tel"
            required
            maxLength={80}
            placeholder="+380… або @username"
          />
        </label>
        <label htmlFor="contact-email">
          Електронна пошта (необов’язково)
          <input
            id="contact-email"
            name="email"
            autoComplete="email"
            type="email"
            maxLength={254}
          />
        </label>
        <PlanSelect />
        <label htmlFor="contact-message">
          Деталі (необов’язково)
          <textarea id="contact-message" name="message" rows={2} maxLength={5000} />
        </label>
      </div>
      <button type="submit">Надіслати заявку</button>
      <p className={s.consent}>
        Надсилаючи форму, ви погоджуєтесь з{' '}
        <a href="/legal/terms-of-service">умовами використання</a> та{' '}
        <a href="/legal/privacy-policy">політикою конфіденційності</a>.
      </p>
    </>
  );
}
