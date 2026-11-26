import { Fragment, type CSSProperties } from 'react';
import s from './Creative.module.scss';

export function CreativeHeading({
  label,
  title,
  description,
  breakBefore,
}: {
  label: string;
  title: string;
  description?: string;
  breakBefore?: string;
}) {
  return (
    <header className={s.heading}>
      <p className={s.eyebrow} data-reveal="fade">
        {label}
      </p>
      <div className={s.headingRow}>
        <h2 data-reveal="words">
          {title.split(' ').map((word, i) => (
            <Fragment key={i}>
              {i > 0 && word === breakBefore && <br />}
              <span data-word style={{ '--word-index': i } as CSSProperties}>
                {word}
                {'\u00a0'}
              </span>
            </Fragment>
          ))}
        </h2>
        {description && <p data-reveal="fade">{description}</p>}
      </div>
    </header>
  );
}
