'use client';
import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import s from './Contact.module.scss';
import { ContactSuccess } from './ContactSuccess';
export function ContactForm({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const busy = useRef(false);
  const requestId = useRef('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || submitted) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    busy.current = true;
    setPending(true);
    setStatus('Надсилаємо заявку…');
    requestId.current ||= crypto.randomUUID();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(data), requestId: requestId.current }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setStatus(
          result?.error ||
            (response.status === 429
              ? 'Забагато спроб. Спробуйте через 15 хвилин.'
              : 'Не вдалося надіслати заявку. Спробуйте пізніше.'),
        );
        return;
      }
      setStatus('');
      setSubmitted(true);
      form.reset();
      requestId.current = '';
    } catch {
      setStatus('Не вдалося підтвердити доставку. Перевірте з’єднання та спробуйте ще раз.');
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  return (
    <form
      ref={formRef}
      data-reveal="fade"
      data-submitted={submitted}
      className={s.form}
      onSubmit={submit}
      aria-busy={pending}
      data-pending={pending}
    >
      <fieldset
        className={s.formBody}
        disabled={pending || submitted}
        inert={submitted}
        aria-hidden={submitted}
      >
        {children}
        <label className={s.honeypot} aria-hidden="true">
          Залиште це поле порожнім
          <input name="website" tabIndex={-1} autoComplete="off" maxLength={200} />
        </label>
      </fieldset>
      {submitted && (
        <ContactSuccess
          onReset={() => {
            setSubmitted(false);
            setStatus('');
            requestAnimationFrame(() =>
              formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus(),
            );
          }}
        />
      )}
      <p role="status" aria-live="polite" className={s.status}>
        {status}
      </p>
    </form>
  );
}
