'use client';
import { useState, type FormEvent, type ReactNode } from 'react';
import s from './Contact.module.scss';
export function ContactForm({ children }: { children: ReactNode }) {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <form data-reveal="fade" className={s.form} onSubmit={submit}>
      {children}
      <p role="status" className={s.status}>
        {submitted &&
          'Це демонстраційна форма. Для зв’язку скористайтеся електронною поштою поруч.'}
      </p>
    </form>
  );
}
