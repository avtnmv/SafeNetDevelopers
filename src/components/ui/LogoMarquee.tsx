import Image from 'next/image';
import s from './LogoMarquee.module.scss';

export function LogoMarquee({ logos }: { logos: string[] }) {
  return (
    <div className={s.marquee} data-ambient>
      <input
        id="client-logos-pause"
        type="checkbox"
        className={s.pauseInput}
        aria-label="Призупинити рух логотипів"
      />
      <label
        htmlFor="client-logos-pause"
        className={s.pauseControl}
        title="Призупинити або відновити рух"
      >
        <span className={s.pauseIcon} aria-hidden="true">
          Ⅱ
        </span>
        <span className={s.playIcon} aria-hidden="true">
          ▶
        </span>
      </label>
      <div className={s.viewport}>
        <div className={s.track}>
          {[0, 1].map((copy) => (
            <ul className={s.group} key={copy} aria-hidden={copy === 1 || undefined}>
              {logos.map((src, index) => (
                <li key={src}>
                  <Image
                    src={src}
                    width={140}
                    height={44}
                    alt={copy === 0 ? `Логотип клієнта ${index + 1}` : ''}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
