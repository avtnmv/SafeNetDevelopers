'use client';
import { useEffect, useRef, useState } from 'react';
import s from './PhoneField.module.scss';
import { normalizePhoneInput } from './phone-input';
import { CountryPicker, type Country } from './CountryPicker';
const fallback: Country = {
  id: 'UA',
  name: 'Україна',
  code: '380',
  max: 9,
  prefix: '0',
  example: '50 123 4567',
};
export default function PhoneField() {
  const [countries, setCountries] = useState<Country[]>([fallback]);
  const [country, setCountry] = useState('UA');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const edited = useRef(false);
  const revision = useRef(0);
  const selected = countries.find((item) => item.id === country) || fallback;
  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch('/phone-countries.json', { signal: controller.signal }).then((r) =>
        r.ok ? r.json() : Promise.reject(),
      ),
      fetch('/api/country', {
        signal: AbortSignal.any([controller.signal, AbortSignal.timeout(3000)]),
        cache: 'no-store',
      })
        .then((r) => r.json())
        .catch(() => ({ country: 'UA' })),
    ])
      .then(([list, geo]: [Country[], { country: string }]) => {
        setCountries(list);
        if (!edited.current && list.some((item) => item.id === geo.country))
          setCountry(geo.country);
      })
      .catch(() => {});
    const form = input.current?.form;
    function reset() {
      setValue('');
      setError('');
      revision.current++;
      input.current?.setCustomValidity('');
    }
    form?.addEventListener('reset', reset);
    return () => {
      controller.abort();
      form?.removeEventListener('reset', reset);
    };
  }, []);
  async function validate() {
    const version = ++revision.current;
    const { validatePhone } = await import('@/lib/phone');
    if (version !== revision.current) return;
    const message =
      !value || validatePhone(value, country) ? '' : 'Перевірте номер для обраної країни.';
    setError(message);
    input.current?.setCustomValidity(message);
  }
  return (
    <div className={s.field}>
      <label className={s.label} htmlFor="contact-phone">
        Телефон*
      </label>
      <div className={s.control} data-invalid={Boolean(error)}>
        <CountryPicker
          countries={countries}
          selected={selected}
          onSelect={(id) => {
            edited.current = true;
            revision.current++;
            setCountry(id);
            setValue('');
            setError('');
            input.current?.setCustomValidity('');
            input.current?.focus();
          }}
        />
        <input
          ref={input}
          id="contact-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          value={value}
          maxLength={selected.max}
          placeholder={selected.example}
          aria-describedby={error ? 'contact-phone-error' : undefined}
          aria-invalid={Boolean(error)}
          onInput={(event) => {
            edited.current = true;
            revision.current++;
            input.current?.setCustomValidity('');
            setError('');
            const next = normalizePhoneInput(event.currentTarget.value, selected, true);
            event.currentTarget.value = next ?? value;
            if (next !== null) setValue(next);
            else setError('Код номера не відповідає обраній країні.');
          }}
          onKeyDown={(event) => {
            const field = event.currentTarget;
            const remaining =
              field.value.length - ((field.selectionEnd ?? 0) - (field.selectionStart ?? 0));
            if (
              !event.metaKey &&
              !event.ctrlKey &&
              /^\d$/.test(event.key) &&
              remaining >= selected.max
            )
              event.preventDefault();
          }}
          onPaste={(event) => {
            event.preventDefault();
            edited.current = true;
            revision.current++;
            const pasted = event.clipboardData.getData('text');
            const element = event.currentTarget;
            const raw = /^\s*(?:\+|00)/.test(pasted)
              ? pasted
              : value.slice(0, element.selectionStart ?? 0) +
                pasted +
                value.slice(element.selectionEnd ?? value.length);
            const next = normalizePhoneInput(raw, selected);
            if (next === null) {
              setError('Перевірте код країни та кількість цифр у номері.');
              return;
            }
            setValue(next);
            setError('');
            input.current?.setCustomValidity('');
          }}
          onBlur={() => void validate().catch(() => {})}
        />
      </div>
      {error && (
        <p id="contact-phone-error" className={s.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
