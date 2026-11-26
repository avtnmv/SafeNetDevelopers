'use client';

import { useState, type CSSProperties } from 'react';
import s from './Development.module.scss';

const nodes = [
  { radius: 340, angle: -130, icon: 'search', duration: 17, delay: -3 },
  { radius: 230, angle: -136, icon: 'shield', duration: 20, delay: -9 },
  { radius: 150, angle: -168, icon: 'lock', duration: 24, delay: -6 },
  { radius: 340, angle: -102, icon: 'server', duration: 27, delay: -16 },
];

// Unequal periods and phases keep the two cards from repeating in lockstep.
const rightTiming = [
  { duration: 18.7, delay: -6.8 },
  { duration: 23.3, delay: -1.7 },
  { duration: 16.9, delay: -13.1 },
  { duration: 29.1, delay: -19.8 },
];

function OrbitIcon({ kind }: { kind: string }) {
  return (
    <g stroke="#242424" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {kind === 'search' && (
        <>
          <circle cx="-2" cy="-2" r="6" />
          <path d="m3 3 5 5" />
        </>
      )}
      {kind === 'lock' && (
        <>
          <rect x="-7" y="-1" width="14" height="11" rx="2" />
          <path d="M-4-1v-4a4 4 0 0 1 8 0v4M0 3v3" />
        </>
      )}
      {kind === 'shield' && (
        <>
          <path d="m0-10 8 3v6c0 5-8 10-8 10S-8 4-8-1v-6Z" />
          <path d="m-4-1 3 3 5-5" />
        </>
      )}
      {kind === 'server' && (
        <>
          <rect x="-9" y="-8" width="18" height="7" rx="2" />
          <rect x="-9" y="2" width="18" height="7" rx="2" />
          <path d="M-5-4.5h.1M-5 5.5h.1M0-4.5h5M0 5.5h5" />
        </>
      )}
    </g>
  );
}

// Mirror the original cropped orbits across the gap between the cards.
export function SecurityOrbit({ mirrored = false }: { mirrored?: boolean }) {
  const [cycles, setCycles] = useState(() => nodes.map(() => 0));
  return (
    <svg className={s.securityOrbit} viewBox="0 0 640 350" fill="none" aria-hidden="true">
      <g transform={mirrored ? 'translate(640 0) scale(-1 1)' : undefined}>
        <circle cx="680" cy="370" r="150" fill="currentColor" fillOpacity=".09" />
        {[340, 230, 150].map((radius, index) => (
          <g key={radius}>
            <circle
              cx="680"
              cy="370"
              r={radius}
              stroke="currentColor"
              strokeOpacity={index === 0 ? '.24' : '.42'}
            />
            <g
              className={s.orbitRotation}
              style={
                {
                  '--orbit-duration': `${48 + index * 13}s`,
                  '--orbit-delay': `${-index * 8}s`,
                } as CSSProperties
              }
            >
              <circle
                className={s.orbitPacket}
                cx="680"
                cy="370"
                r={radius}
                pathLength="100"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray=".2 1 .4 1 .8 96.6"
                transform={`rotate(${index * 95} 680 370)`}
              />
              <circle cx={680 - radius} cy="370" r="3" fill="currentColor" />
            </g>
          </g>
        ))}
        {nodes.map(({ radius, angle, duration, delay }, index) => {
          const radians = (angle * Math.PI) / 180;
          const timing = mirrored ? rightTiming[index] : { duration, delay };
          return (
            <g
              key={index}
              transform={`translate(${680 + radius * Math.cos(radians)} ${370 + radius * Math.sin(radians)})`}
              style={
                {
                  '--signal-duration': `${timing.duration}s`,
                  '--signal-delay': `${timing.delay}s`,
                } as CSSProperties
              }
            >
              <circle className={s.orbitPulse} r="26" stroke="currentColor" strokeWidth="1" />
              <circle className={s.orbitPulseInner} r="16" fill="currentColor" fillOpacity=".12" />
              <circle r="4" fill="currentColor" />
              <g
                className={s.orbitIcon}
                onAnimationIteration={(event) => {
                  if (event.target !== event.currentTarget) return;
                  const advance = 1 + Math.floor(Math.random() * (nodes.length - 1));
                  setCycles((previous) =>
                    previous.map((cycle, nodeIndex) =>
                      nodeIndex === index ? (cycle + advance) % nodes.length : cycle,
                    ),
                  );
                }}
              >
                <circle r="22" fill="white" stroke="#dedede" strokeWidth=".8" />
                <g transform={mirrored ? 'scale(-1 1)' : undefined}>
                  <OrbitIcon kind={nodes[(index + cycles[index]) % nodes.length].icon} />
                </g>
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
