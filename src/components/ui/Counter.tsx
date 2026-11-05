import s from './Counter.module.scss';

export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const label = `${prefix}${value.toFixed(decimals)}${suffix}`;
  return (
    <span className={s.counter}>
      <span className={s.final}>{label}</span>
      <span
        aria-hidden="true"
        data-counter={value}
        data-decimals={decimals}
        data-prefix={prefix}
        data-suffix={suffix}
      >
        {label}
      </span>
    </span>
  );
}
