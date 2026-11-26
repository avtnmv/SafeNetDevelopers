'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import s from './DevelopmentHeroAnimation.module.scss';

const colors = ['#ff8297', '#a995f5', '#62d9c4', '#77adff', '#ffc575'];
const ideas = [
  [104, 120, -12, 'brief'],
  [280, 75, 9, 'task'],
  [622, 95, -9, 'doc'],
  [750, 180, 12, 'task'],
  [166, 285, 7, 'doc'],
  [705, 365, -8, 'brief'],
  [285, 470, -11, 'task'],
  [565, 490, 8, 'doc'],
  [90, 440, 12, 'brief'],
  [410, 140, -7, 'doc'],
  [780, 490, 8, 'task'],
  [530, 70, 14, 'brief'],
  [355, 340, -12, 'task'],
  [610, 260, 6, 'doc'],
  [450, 520, -5, 'brief'],
] as const;
const destinations = [
  [390, 210],
  [475, 220],
  [400, 365],
  [480, 365],
  [440, 450],
];
const stages = ['Ідея', 'Дизайн', 'Розробка', 'Пентест', 'Запуск'];

/** One CSS timeline keeps the assembly, cursors and launch path in sync. */
export function DevelopmentHeroAnimation() {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const id = useId().replace(/:/g, '');
  const glow = `${id}-glow`;
  const wash = `${id}-wash`;
  const line = `${id}-line`;
  const screen = `${id}-screen`;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = true;
    const sync = () => {
      element.dataset.running = String(visible && !document.hidden);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return (
    <div ref={root} className={s.root} data-paused={paused}>
      <svg
        className={s.canvas}
        viewBox="0 0 880 680"
        role="img"
        aria-labelledby={`${id}-title ${id}-description`}
      >
        <title id={`${id}-title`}>Від ідеї до запуску — процес SafeNet</title>
        <desc id={`${id}-description`}>
          Ідеї та задачі збираються в мобільний прототип. Курсори команди перевіряють інтерфейс, а
          світлова лінія поєднує етапи: ідея, дизайн, розробка, пентест і запуск.
        </desc>
        <defs>
          <filter id={glow} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" />
            <feComposite in="SourceGraphic" operator="over" />
          </filter>
          <radialGradient id={wash}>
            <stop stopColor="#1b2939" stopOpacity=".65" />
            <stop offset="1" stopColor="#0a0a0a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={line}>
            <stop stopColor="#ff8297" />
            <stop offset=".25" stopColor="#ffc575" />
            <stop offset=".5" stopColor="#62d9c4" />
            <stop offset=".75" stopColor="#77adff" />
            <stop offset="1" stopColor="#a995f5" />
          </linearGradient>
          <linearGradient id={screen} x2="1" y2="1">
            <stop stopColor="#273f70" />
            <stop offset="1" stopColor="#7761a8" />
          </linearGradient>
        </defs>
        <ellipse cx="455" cy="300" rx="440" ry="340" fill={`url(#${wash})`} />
        <g opacity=".25" fill="#9faabf" aria-hidden="true">
          {Array.from({ length: 56 }, (_, i) => (
            <circle
              key={i}
              cx={24 + ((i * 137) % 834)}
              cy={30 + ((i * 83) % 560)}
              r={i % 4 === 0 ? 1.3 : 0.65}
            />
          ))}
        </g>
        <g className={s.connections} fill="none" stroke="#8fa4bc" strokeWidth=".8">
          {ideas.map(([x, y], index) => {
            const next = ideas[(index + 3) % ideas.length];
            return <path key={index} d={`M${x} ${y} Q440 280 ${next[0]} ${next[1]}`} />;
          })}
        </g>
        <g className={s.constellation} fill="none" strokeWidth="2.4">
          <circle cx="210" cy="190" r="16" stroke={colors[3]} />
          <circle cx="620" cy="420" r="20" stroke={colors[2]} />
          <circle cx="480" cy="110" r="12" stroke={colors[0]} />
          <path d="m120 370 15-30 18 34Z" stroke={colors[1]} />
          <path d="m680 155 16-30 16 34Z" stroke={colors[2]} />
          <path d="m320 230 12-24 14 27Z" stroke={colors[0]} />
        </g>
        {ideas.map(([x, y, rotation, kind], index) => {
          const target = destinations[index % destinations.length];
          return (
            <g
              key={index}
              className={s.idea}
              style={
                {
                  '--x': `${x}px`,
                  '--y': `${y}px`,
                  '--r': `${rotation}deg`,
                  '--dx': `${target[0]}px`,
                  '--dy': `${target[1]}px`,
                  '--i': index,
                  '--color': colors[index % 5],
                } as CSSProperties
              }
            >
              <g className={s.ideaFloat}>
                <rect
                  x="-24"
                  y="-25"
                  width="48"
                  height="50"
                  rx="9"
                  fill="currentColor"
                  opacity=".12"
                  filter={`url(#${glow})`}
                />
                <rect
                  x="-24"
                  y="-25"
                  width="48"
                  height="50"
                  rx={kind === 'doc' ? 5 : 9}
                  fill="currentColor"
                />
                {kind === 'task' ? (
                  <>
                    <path
                      d="m-14-8 4 4 7-9M1-9h14M-13 7h27M-13 14h16"
                      stroke="#172432"
                      strokeOpacity=".5"
                      strokeWidth="2.4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <circle cx="0" cy="-25" r="3.5" fill="#e9efff" />
                  </>
                ) : (
                  <>
                    <path
                      d="M-13-7h26M-13 1h20M-13 9h13"
                      stroke="#172432"
                      strokeOpacity=".45"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />
                    {kind === 'brief' && <path d="m10-25 14 14H10Z" fill="#ffffff55" />}
                  </>
                )}
              </g>
            </g>
          );
        })}

        <g className={s.phone}>
          <rect
            className={s.phoneShell}
            x="320"
            y="96"
            width="240"
            height="430"
            rx="36"
            fill="#10131d"
            stroke="#d3d7e6"
            strokeWidth="1.6"
          />
          <g className={s.interface}>
            <rect x="405" y="111" width="70" height="7" rx="4" fill="#5b6275" />
            <text x="346" y="144" fill="#e4e8f5" fontSize="12" letterSpacing="2">
              SAFENET
            </text>
            <circle cx="528" cy="139" r="5" fill="#62d9c4" />
            <g className={s.imageCard}>
              <rect x="342" y="164" width="196" height="132" rx="18" fill={`url(#${screen})`} />
              <circle cx="475" cy="223" r="52" fill="#b49bf6" fillOpacity=".55" />
              <path
                d="m350 284 67-70 67 70Z"
                fill="#f49ab5"
                fillOpacity=".65"
                stroke="#efd9f1"
                strokeWidth="1"
              />
              <circle cx="385" cy="194" r="10" fill="#f9ce8b" />
            </g>
            <rect
              className={s.textResponse}
              x="342"
              y="316"
              width="150"
              height="11"
              rx="5"
              fill="#a8acc0"
            />
            <rect x="342" y="340" width="194" height="5" rx="2.5" fill="#626a83" />
            <rect x="342" y="353" width="123" height="5" rx="2.5" fill="#626a83" />
            <rect x="342" y="377" width="92" height="65" rx="14" fill="#252d42" stroke="#5f6983" />
            <rect x="446" y="377" width="92" height="65" rx="14" fill="#252d42" stroke="#5f6983" />
            <path
              d="m369 409 11 10 21-22"
              stroke="#a995f5"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M484 400.5l-9 9 9 9M500 400.5l9 9-9 9"
              stroke="#77adff"
              strokeWidth="2.4"
              fill="none"
            />
            <g className={s.buttonResponse}>
              <rect x="342" y="465" width="196" height="36" rx="18" fill="#62d9c4" />
              <text
                x="440"
                y="488"
                textAnchor="middle"
                fill="#102e2c"
                fontSize="13"
                fontWeight="600"
              >
                Почати
              </text>
            </g>
          </g>
          <g className={s.selection} fill="none" stroke="#54aaff" strokeWidth="1">
            <rect x="310" y="86" width="260" height="450" />
            {[
              [310, 86],
              [570, 86],
              [310, 536],
              [570, 536],
            ].map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" fill="white" />
            ))}
            <rect x="310" y="60" width="120" height="24" rx="4" fill="#2688e8" stroke="none" />
            <text
              x="370"
              y="72"
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              stroke="none"
              fontSize="12"
            >
              App / Prototype
            </text>
            <text x="440" y="555" fill="#54aaff" stroke="none" textAnchor="middle" fontSize="11">
              390 × 844
            </text>
          </g>
          {[
            ['Оля', colors[0]],
            ['Макс', colors[2]],
            ['Анна', colors[1]],
          ].map(([name, color], index) => (
            <g
              className={`${s.cursor} ${s[`cursor${index}`]}`}
              key={name}
              style={{ '--cursor-color': color } as CSSProperties}
            >
              <circle className={s.clickRing} r="9" fill="none" stroke={color} strokeWidth="1.5" />
              <path
                d="M0 0 3 23 9 16 15 26 20 23 14 13 23 12Z"
                fill={color}
                stroke="white"
                strokeWidth="1.2"
              />
              <rect x="18" y="25" width="52" height="22" rx="11" fill={color} />
              <text x="44" y="40" fill="#141822" textAnchor="middle" fontSize="12" fontWeight="500">
                {name}
              </text>
            </g>
          ))}
        </g>

        <g className={s.roadmap}>
          <path className={s.roadBase} d="M80 430H800" stroke="#2b3140" fill="none" />
          <path
            className={s.roadLine}
            d="M80 430H800"
            pathLength="1"
            stroke={`url(#${line})`}
            strokeWidth="2"
            fill="none"
          />
          <path
            className={s.arc}
            d="M260 430Q530 125 800 430"
            pathLength="1"
            stroke={`url(#${line})`}
            strokeWidth="1.4"
            fill="none"
          />
          {stages.map((stage, index) => (
            <g
              key={stage}
              style={{ '--stage': index, color: colors[[0, 4, 2, 3, 1][index]] } as CSSProperties}
              className={s.stage}
            >
              <circle
                className={s.stageHalo}
                cx={80 + index * 180}
                cy="430"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle
                cx={80 + index * 180}
                cy="430"
                r="6"
                fill="#111620"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx={80 + index * 180}
                cy="430"
                r="2"
                fill="currentColor"
                filter={`url(#${glow})`}
              />
              <text x={80 + index * 180} y="465" fill="#d4d9e5" textAnchor="middle" fontSize="17">
                {stage}
              </text>
            </g>
          ))}
        </g>
        <path
          className={s.launchTrail}
          d="M510 470C690 450 780 170 700 140S560 260 800 430"
          pathLength="1"
          fill="none"
          stroke={`url(#${line})`}
          strokeWidth="1.5"
        />
        <g className={s.spark} filter={`url(#${glow})`}>
          <circle r="4" fill="#fff" />
          <path d="M-9 0H9M0-9V9" stroke="white" strokeWidth="1" />
        </g>
        <g className={s.captions} textAnchor="middle">
          {[
            ['Ідеї стають рішеннями', 'Збираємо задачі. Знаходимо зв’язки.'],
            ['Збираємо ваш продукт', 'Від першого екрана до цілісного інтерфейсу.'],
            ['Перевіряємо кожну деталь', 'Дизайн, взаємодія та безпека — разом.'],
            ['Готово до запуску', 'Повний цикл. Одна команда. SafeNet.'],
          ].map(([title, subtitle], index) => (
            <g key={title} className={s[`caption${index}`]}>
              <text
                x="440"
                y="599"
                fill="#eef0f6"
                fontSize="30"
                fontWeight="500"
                letterSpacing="-.9"
              >
                {title}
              </text>
              <text x="440" y="633" fill="#949eaf" fontSize="16">
                {subtitle}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <button
        type="button"
        className={s.pause}
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? 'Продовжити анімацію' : 'Призупинити анімацію'}
      >
        {paused ? 'Відтворити' : 'Пауза'}
        <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
      </button>
    </div>
  );
}
