import { Fragment, type CSSProperties } from 'react';
import s from './SectionHeading.module.scss';
export function SectionHeading({
  label,
  title,
  count,
  compact = false,
}: {
  label?: string;
  title: string;
  count?: string;
  compact?: boolean;
}) {
  const words = title.split(/\s+/);
  return (
    <header className={s.heading}>
      {label && (
        <p className={s.label} data-reveal="fade">
          <span aria-hidden="true">⊕</span> {label}
        </p>
      )}
      <h2 className={compact ? s.compact : s.title} data-reveal="words">
        {words.map((word, index) => (
          <Fragment key={index}>
            <span data-word style={{ '--word-index': index } as CSSProperties}>
              {word}
            </span>
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </h2>
      {count && <span className={s.count}>{count}</span>}
    </header>
  );
}
