'use client';
import { useEffect, useRef, useState } from 'react';
import s from './IntroVideo.module.scss';
import hero from './Hero.module.scss';
type Player = { playVideo(): void; pauseVideo(): void; destroy(): void };
type VideoWindow = Window & {
  YT?: { Player: new (element: HTMLElement, options: object) => Player };
  onYouTubeIframeAPIReady?: () => void;
};
let apiReady: Promise<void> | undefined;
function loadApi() {
  const win = window as VideoWindow;
  if (win.YT?.Player) return Promise.resolve();
  return (apiReady ??= new Promise<void>((resolve, reject) => {
    const previous = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => {
      apiReady = undefined;
      reject(new Error('Video unavailable'));
    };
    document.head.appendChild(script);
  }));
}
export function IntroVideo() {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<Player | null>(null);
  const [ready, setReady] = useState(false);
  const [warm, setWarm] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!warm) return;
    let disposed = false;
    loadApi()
      .then(() => {
        if (disposed || !host.current) return;
        const element = document.createElement('div');
        host.current.appendChild(element);
        player.current = new (window as VideoWindow).YT!.Player(element, {
          host: 'https://www.youtube-nocookie.com',
          videoId: 'KW1zcFX7kwg',
          playerVars: { playsinline: 1, rel: 0, origin: window.location.origin },
          events: {
            onReady: () => {
              if (!disposed) {
                setReady(true);
                if (dialog.current?.open) player.current?.playVideo();
                host.current
                  ?.querySelector('iframe')
                  ?.setAttribute('title', 'Як працює SafeNet Developers');
              }
            },
            onError: () => {
              if (!disposed) setFailed(true);
            },
          },
        });
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });
    return () => {
      disposed = true;
      player.current?.destroy();
      player.current = null;
    };
  }, [warm]);
  function open() {
    setWarm(true);
    dialog.current?.showModal();
    player.current?.playVideo();
  }
  function close() {
    player.current?.pauseVideo();
    dialog.current?.close();
  }
  return (
    <>
      <div className={hero.person}>
        <button
          type="button"
          className={s.thumbnail}
          onClick={open}
          onPointerEnter={() => setWarm(true)}
          onFocus={() => setWarm(true)}
          aria-label="Відтворити відео про SafeNet Developers"
        >
          <span className={s.play}>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M8 5v14l11-7Z" fill="currentColor" />
            </svg>
          </span>
        </button>
        <div>
          <div className={hero.processCopy}>
            <h2>Як ми працюємо</h2>
            <p className={hero.processDescription}>
              Детально про процес роботи, формування ціни та реалізацію.
            </p>
          </div>
          <button
            className={s.watch}
            type="button"
            onClick={open}
            onPointerEnter={() => setWarm(true)}
            onFocus={() => setWarm(true)}
          >
            Дивитися відео
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className={s.dialog}
        aria-label="Як ми працюємо — відео"
        onCancel={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <button className={s.close} type="button" onClick={close} aria-label="Закрити відео">
          ×
        </button>
        <div ref={host} className={s.player} />
        {(!ready || failed) && (
          <p>{failed ? 'Не вдалося завантажити плеєр.' : 'Завантажуємо відео…'}</p>
        )}
        <a
          className={s.external}
          href="https://youtube.com/shorts/KW1zcFX7kwg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Відкрити на YouTube ↗
        </a>
      </dialog>
    </>
  );
}
