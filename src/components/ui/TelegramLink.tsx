import { site } from '@/config/site';
import s from './TelegramLink.module.scss';
export function TelegramLink({ floating = false }: { floating?: boolean }) {
  const className = `${s.link} ${floating ? s.floating : ''}`;
  const content = floating ? (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.7 3.3 18.4 20c-.2 1.2-.9 1.5-1.9.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.2-8.3c.4-.4-.1-.6-.6-.2L5.7 13.7.8 12.2c-1.1-.3-1.1-1.1.2-1.6L20.1 3c.9-.3 1.7.2 1.6.3Z" />
    </svg>
  ) : (
    <>Написати в Telegram{!site.telegram && <small>Незабаром</small>}</>
  );
  return site.telegram ? (
    <a
      aria-label="Написати в Telegram"
      className={className}
      href={site.telegram}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : (
    <button
      aria-label="Написати в Telegram — незабаром"
      className={className}
      type="button"
      disabled
      title="Контакт Telegram буде додано незабаром"
    >
      {content}
    </button>
  );
}
