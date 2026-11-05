'use client';
import { useState, type FormEvent } from 'react';
import s from './Contact.module.scss';
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <form data-reveal="fade" className={s.form} onSubmit={submit}>
      <p className={s.brand}>SafeNet Developers</p>
      <h3>
        Маєте проєкт
        <br />
        на думці?
      </h3>
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
      <label htmlFor="contact-message">
        Повідомлення
        <textarea id="contact-message" name="message" rows={3} maxLength={5000} />
      </label>
      <button type="submit">
        Надіслати повідомлення <span aria-hidden="true">↗</span>
      </button>
      <p role="status" className={s.status}>
        {submitted
          ? 'Це демонстраційна форма. Для зв’язку скористайтеся електронною поштою поруч.'
          : 'Надсилаючи форму, ви погоджуєтеся з умовами використання та політикою конфіденційності.'}
      </p>
    </form>
  );
}
