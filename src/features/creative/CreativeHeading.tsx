import type { CSSProperties } from 'react';
import s from './Creative.module.scss';

export function CreativeHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className={s.heading}>
      <p className={s.eyebrow} data-reveal="fade">
        {label}
      </p>
      <div className={s.headingRow}>
        <h2 data-reveal="words">
          {title.split(' ').map((word, i) => (
            <span key={i} data-word style={{ '--word-index': i } as CSSProperties}>
              {word}
              {'\u00a0'}
            </span>
          ))}
        </h2>
        {description && <p data-reveal="fade">{description}</p>}
      </div>
    </header>
  );
}
