import s from './Offer.module.scss';
export function TrustStrip() {
  return (
    <ul className={s.trust} aria-label="Умови співпраці">
      {[
        'Частина SafeNet Security',
        'Договір і рахунок для ФОП/ТОВ',
        'Оплата 50/50',
        'Перевірка безпеки перед запуском',
      ].map((text) => (
        <li key={text}>
          <span aria-hidden="true">↗</span>
          {text}
        </li>
      ))}
    </ul>
  );
}
