import { Children, type CSSProperties, type ReactNode } from 'react';
import s from './DeliverablesAnimation.module.scss';

const stages = [
  'Готовий продукт',
  'Код, дизайн та доступи',
  'Перевірена безпека',
  'Захищене розміщення',
  'Передача команді',
];

// Move complete pieces without changing their opacity or drawing their strokes.
// Each piece settles into the original coordinates before the scene ends.
function Assembly({ children }: { children: ReactNode }) {
  const origins = [
    [-55, -35],
    [25, -70],
    [-75, 25],
    [70, -45],
    [-65, 55],
    [85, 30],
    [15, 75],
    [-45, -65],
  ];
  return (
    <g>
      {Children.toArray(children).map((child, index) => {
        const [x, y] = origins[index % origins.length];
        return (
          <g
            key={index}
            className={s.piece}
            style={
              {
                '--from-x': `${x}px`,
                '--from-y': `${y}px`,
              } as CSSProperties
            }
          >
            {child}
          </g>
        );
      })}
    </g>
  );
}

export function DeliverablesAnimation() {
  return (
    <div
      className={s.panel}
      role="img"
      aria-label="Від готового продукту до передачі команді: код і дизайн, пентест, захищений хостинг та документація."
    >
      <svg viewBox="0 0 560 480" fill="none" aria-hidden="true">
        <circle cx="280" cy="240" r="196" stroke="#d7d7d7" strokeDasharray="3 9" />
        <circle cx="280" cy="240" r="150" stroke="#e0e0e0" />
        {stages.map((label, index) => (
          <g
            key={label}
            className={s.scene}
            style={{ '--delay': `${index * 3}s` } as CSSProperties}
          >
            {index === 0 && (
              <Assembly>
                <rect x="100" y="112" width="360" height="256" rx="16" fill="white" stroke="#aaa" />
                <path d="M100 150h360" stroke="#ddd" />
                {[120, 134, 148].map((x) => (
                  <circle key={x} cx={x} cy="132" r="3" fill="#aaa" />
                ))}
                <g>
                  <rect x="124" y="174" width="160" height="150" rx="8" fill="#ded9ed" />
                  <circle cx="204" cy="224" r="28" fill="#b3a7d4" />
                  <path d="m144 304 60-62 60 62" fill="#83739f" />
                </g>
                <path
                  d="M308 190h116M308 212h90M308 246h116M308 264h104"
                  stroke="#aaa"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <rect x="308" y="294" width="112" height="30" rx="15" fill="#242424" />
              </Assembly>
            )}
            {index === 1 && (
              <Assembly>
                <rect x="111" y="134" width="244" height="224" rx="16" fill="#242424" />
                <path
                  d="m173 200-22 22 22 22m120-44 22 22-22 22m-48-58-25 72"
                  stroke="#d5c9ed"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M147 285h120M147 305h80"
                  stroke="#777"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <g>
                  <rect
                    x="320"
                    y="194"
                    width="126"
                    height="150"
                    rx="12"
                    fill="white"
                    stroke="#bbb"
                  />
                  <rect x="338" y="214" width="90" height="65" rx="6" fill="#ded9ed" />
                  <path
                    d="M340 300h70M340 316h46"
                    stroke="#aaa"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>
                <g>
                  <circle cx="360" cy="140" r="28" fill="white" stroke="#bbb" />
                  <path d="m350 140 7 7 14-15" stroke="#242424" strokeWidth="3" />
                </g>
              </Assembly>
            )}
            {index === 2 && (
              <Assembly>
                <path
                  d="m280 112 114 43v87c0 80-114 133-114 133s-114-53-114-133v-87Z"
                  fill="white"
                  stroke="#aaa"
                  strokeWidth="2"
                />
                <path
                  d="m239 240 28 28 56-61"
                  stroke="#827197"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g>
                  <rect x="316" y="309" width="126" height="40" rx="20" fill="#242424" />
                  <text x="379" y="334" textAnchor="middle" fill="white" fontSize="12">
                    PENTEST / OK
                  </text>
                </g>
              </Assembly>
            )}
            {index === 3 && (
              <Assembly>
                {[132, 210, 288].map((y, i) => (
                  <g key={y}>
                    <rect
                      x="154"
                      y={y}
                      width="252"
                      height="60"
                      rx="12"
                      fill={i === 1 ? '#242424' : 'white'}
                      stroke="#aaa"
                    />
                    <circle cx="183" cy={y + 30} r="5" fill="#b3a7d4" />
                    <path
                      d={`M213 ${y + 30}h66M348 ${y + 25}h28M348 ${y + 35}h28`}
                      stroke="#aaa"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>
                ))}
                <path d="M280 348v35m-70 0h140" stroke="#aaa" strokeWidth="2" />
                <circle cx="280" cy="383" r="5" fill="#827197" />
              </Assembly>
            )}
            {index === 4 && (
              <Assembly>
                <rect
                  x="162"
                  y="120"
                  width="230"
                  height="260"
                  rx="16"
                  fill="#ded9ed"
                  transform="rotate(-8 277 250)"
                />
                <g>
                  <rect
                    x="174"
                    y="106"
                    width="230"
                    height="260"
                    rx="16"
                    fill="white"
                    stroke="#aaa"
                  />
                  <text x="202" y="150" fill="#242424" fontSize="15">
                    PROJECT / HANDBOOK
                  </text>
                  {[184, 220, 256].map((y) => (
                    <g key={y}>
                      <path d={`m203 ${y} 5 5 10-11`} stroke="#827197" strokeWidth="2" />
                      <path
                        d={`M233 ${y}h137`}
                        stroke="#ccc"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </g>
                  ))}
                </g>
                <g>
                  <circle cx="376" cy="335" r="40" fill="#242424" />
                  <path
                    d="m358 335 12 12 25-27"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>
              </Assembly>
            )}
          </g>
        ))}
      </svg>
      <div className={s.captions}>
        {stages.map((stage, index) => (
          <div
            key={stage}
            className={s.caption}
            style={{ '--delay': `${index * 3}s` } as CSSProperties}
          >
            <strong>{stage}</strong>
          </div>
        ))}
      </div>
      <div className={s.progress} aria-hidden="true">
        {stages.map((stage, index) => (
          <span key={stage}>
            <i style={{ '--delay': `${index * 3}s` } as CSSProperties} />
          </span>
        ))}
      </div>
    </div>
  );
}
