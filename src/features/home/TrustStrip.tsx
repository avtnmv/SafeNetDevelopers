import s from './TrustStrip.module.scss';

const conditions = [
  {
    text: 'Частина SafeNet Security',
    path: 'M12 8v4M5 16v-4h14v4M9 2h6v6H9zM2 16h6v6H2zM16 16h6v6h-6z',
  },
  {
    text: 'Договір і рахунок для ФОП/ТОВ',
    path: 'M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8M8 16h8',
  },
  {
    text: 'Оплата 50/50',
    path: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM2 9h20M6 15h4M14 15h4',
  },
  {
    text: 'Перевірка безпеки перед запуском',
    path: 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4ZM8 12l3 3 5-6',
  },
];

export function TrustStrip() {
  return (
    <ul className={s.strip} aria-label="Умови співпраці">
      {conditions.map(({ text, path }) => (
        <li className={s.badge} key={text}>
          <span className={s.content}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d={path} />
            </svg>
            <span className={s.text}>{text}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
