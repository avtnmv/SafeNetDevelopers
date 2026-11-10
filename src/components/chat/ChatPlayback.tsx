'use client';
import { ArrowUpRight } from '@/components/ui/ArrowUpRight';
import { useEffect, useRef, useState } from 'react';
import { chatMessages, chatTimeline, chatProfile } from './chat-data';
import s from './AnimatedChatIphone.module.scss';

export default function ChatPlayback({ visible }: { visible: boolean }) {
  const [cursor, setCursor] = useState(-1);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const elapsed = useRef(0);
  const scroll = useRef<HTMLDivElement>(null);
  const event = chatTimeline[cursor];
  const complete = cursor === chatTimeline.length - 1;
  const shown = reduced ? chatMessages.length : event ? event.index + (event.typing ? 0 : 1) : 0;
  const typing = !reduced && event?.typing;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduced(media.matches);
    const syncVisibility = () => setHidden(document.hidden);
    syncMotion();
    syncVisibility();
    media.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      media.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!visible || reduced || hidden) return;
    if (complete) {
      const timer = window.setTimeout(() => {
        elapsed.current = 0;
        scroll.current?.scrollTo({ top: 0, behavior: 'instant' });
        setCursor(-1);
      }, 1000);
      return () => window.clearTimeout(timer);
    }
    const started = performance.now();
    const timer = window.setTimeout(
      () => setCursor(cursor + 1),
      Math.max(0, chatTimeline[cursor + 1].at - elapsed.current),
    );
    return () => {
      window.clearTimeout(timer);
      elapsed.current += performance.now() - started;
    };
  }, [cursor, visible, reduced, hidden, complete]);

  useEffect(() => {
    const element = scroll.current;
    if (element && !reduced) element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  }, [shown, typing, reduced]);

  return (
    <>
      <div className={s.phone}>
        <div className={s.screen}>
          <div className={s.status} aria-hidden="true">
            <span>9:41</span>
            <span className={s.island} />
            <span className={s.statusIcons}>
              <svg viewBox="0 0 20 16">
                <path d="M2 5q8-7 16 0M5 8q5-5 10 0M8 11q2-2 4 0" />
              </svg>
              <span className={s.battery} />
            </span>
          </div>
          <div className={s.chatHeader}>
            <span className={s.back} aria-hidden="true">
              <svg viewBox="0 0 12 22">
                <path d="m10 2-8 9 8 9" />
              </svg>
              Чати
            </span>
            <div className={s.contact}>
              <strong>{chatProfile.name}</strong>
              <small>
                {typing && event && chatMessages[event.index].side === 'incoming'
                  ? 'друкує…'
                  : 'в мережі'}
              </small>
            </div>
            <div className={s.avatar} aria-hidden="true">
              {chatProfile.avatar ? <img src={chatProfile.avatar} alt="" /> : chatProfile.initial}
            </div>
          </div>
          <div
            className={s.conversation}
            ref={scroll}
            data-scroll-native
            tabIndex={0}
            aria-label="Приклад переписки з клієнтом"
          >
            <div className={s.day}>Сьогодні</div>
            <div className={s.messages}>
              {chatMessages.slice(0, shown).map((message, index) =>
                message.side === 'divider' ? (
                  <div key={index} className={s.day}>
                    {message.text}
                  </div>
                ) : (
                  <div
                    key={index}
                    className={`${s.bubble} ${s[message.side]} ${'card' in message ? s.linkCard : ''}`}
                  >
                    {'domain' in message && (
                      <div className={s.websitePreview} aria-hidden="true">
                        <span>YOUR BRAND</span>
                        <strong>
                          Made for
                          <br />
                          your business.
                        </strong>
                        <i>
                          Let’s start <ArrowUpRight />
                        </i>
                      </div>
                    )}
                    <p>{message.text}</p>
                    {'domain' in message && <small className={s.domain}>{message.domain}</small>}
                    <span className={s.time}>
                      9:{index < 8 ? '41' : '42'}{' '}
                      {message.side === 'outgoing' && (
                        <svg
                          className={s.readTicks}
                          viewBox="0 0 20 12"
                          role="img"
                          aria-label="Прочитано"
                        >
                          <path d="m1 6 4 4 8-8M9 8l2 2 8-8" />
                        </svg>
                      )}
                    </span>
                  </div>
                ),
              )}
              {typing && event && (
                <div
                  className={`${s.typing} ${s[chatMessages[event.index].side]}`}
                  aria-label="Набирає повідомлення"
                >
                  <i />
                  <i />
                  <i />
                </div>
              )}
            </div>
          </div>
          <div className={s.composer} aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m8 13 7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L13 2" />
            </svg>
            <div>
              Повідомлення
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="8" />
                <path d="M8 9h.01M16 9h.01M8 14q4 5 8 0" />
              </svg>
            </div>
            <svg viewBox="0 0 24 24">
              <rect x="9" y="2" width="6" height="13" rx="3" />
              <path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" />
            </svg>
          </div>
          <div className={s.homeIndicator} aria-hidden="true" />
        </div>
      </div>
    </>
  );
}
