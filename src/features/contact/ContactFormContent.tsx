import s from './Contact.module.scss';

export function ContactFormContent() {
  return (
    <>
      <div className={s.formHeading}>
        <h3>Розкажіть про проєкт</h3>
      </div>
      <div className={s.fields}>
        <label htmlFor="contact-name">
          Ваше ім’я*
          <input id="contact-name" name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label htmlFor="contact-email">
          Електронна пошта*
          <input
            id="contact-email"
            name="email"
            autoComplete="email"
            type="email"
            required
            maxLength={254}
          />
        </label>
        <label htmlFor="contact-phone">
          Номер телефону
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={40}
          />
        </label>
        <label htmlFor="contact-message">
          Коментар (додайте деталі, опціонально)
          <textarea id="contact-message" name="message" rows={1} maxLength={5000} />
        </label>
      </div>
      <button type="submit">Надіслати заявку</button>
      <div className={s.consent}>
        <input
          id="contact-consent"
          name="consent"
          type="checkbox"
          aria-labelledby="contact-consent-label"
        />
        <label id="contact-consent-label" htmlFor="contact-consent">
          <span>
            Надсилаючи форму, ви погоджуєтеся з{' '}
            <a href="/legal/terms-of-service">умовами використання</a> та{' '}
            <a href="/legal/privacy-policy">політикою конфіденційності</a>.
          </span>
        </label>
      </div>
    </>
  );
}
