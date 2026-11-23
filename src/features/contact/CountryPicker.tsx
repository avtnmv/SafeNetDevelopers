'use client';
import { useEffect, useRef, useState } from 'react';
import s from './PhoneField.module.scss';
export type Country = {
  id: string;
  name: string;
  code: string;
  max: number;
  prefix: string;
  example: string;
};
export function CountryPicker({
  countries,
  selected,
  onSelect,
}: {
  countries: Country[];
  selected: Country;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const term = query.trim().toLocaleLowerCase('uk').replace(/^\+/, '');
  const filtered = countries.filter(
    (item) =>
      !term ||
      item.name.toLocaleLowerCase('uk').includes(term) ||
      item.id.toLowerCase().includes(term) ||
      item.code.startsWith(term),
  );
  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    function outside(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  useEffect(() => {
    if (open) list.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);
  function choose(id: string) {
    setOpen(false);
    onSelect(id);
  }
  return (
    <div
      ref={root}
      className={s.picker}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <input type="hidden" name="country" value={selected.id} />
      <button
        ref={trigger}
        type="button"
        className={s.trigger}
        aria-label={`Країна телефонного номера: ${selected.name} (+${selected.code})`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? 'phone-countries' : undefined}
        onClick={() => {
          setQuery('');
          setActive(0);
          setOpen(!open);
        }}
      >
        <img src={`/media/flags/${selected.id.toLowerCase()}.svg`} width="24" height="18" alt="" />
        <span>+{selected.code}</span>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="m3 4 3 3 3-3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {open && (
        <div className={s.dropdown}>
          <div className={s.searchBox}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={search}
              type="text"
              role="combobox"
              aria-label="Пошук країни або коду"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls="phone-countries"
              aria-activedescendant={
                filtered[active] ? `phone-country-${filtered[active].id}` : undefined
              }
              placeholder="Країна або код"
              autoComplete="off"
              maxLength={60}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.preventDefault();
                  setOpen(false);
                  trigger.current?.focus();
                }
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                  event.preventDefault();
                  setActive((index) =>
                    Math.max(
                      0,
                      Math.min(filtered.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1)),
                    ),
                  );
                }
                if (event.key === 'Enter') {
                  event.preventDefault();
                  if (filtered[active]) choose(filtered[active].id);
                }
              }}
            />
          </div>
          <div
            ref={list}
            id="phone-countries"
            className={s.countryList}
            role="listbox"
            aria-label="Країни"
            data-lenis-prevent
          >
            {filtered.map((item, index) => (
              <button
                key={item.id}
                id={`phone-country-${item.id}`}
                type="button"
                role="option"
                aria-selected={item.id === selected.id}
                tabIndex={-1}
                className={s.option}
                data-active={active === index}
                onClick={() => choose(item.id)}
              >
                <img
                  src={`/media/flags/${item.id.toLowerCase()}.svg`}
                  width="24"
                  height="18"
                  alt=""
                  loading="lazy"
                />
                <span>{item.name}</span>
                <small>+{item.code}</small>
                {item.id === selected.id && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="m3 8 3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
          {!filtered.length && <p className={s.empty}>Країну не знайдено</p>}
        </div>
      )}
    </div>
  );
}
