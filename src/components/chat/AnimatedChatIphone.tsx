'use client';
import { useEffect, useRef, useState } from 'react';
import Chat from './ChatPlayback';
import s from './AnimatedChatIphone.module.scss';

export function AnimatedChatIphone() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={s.stage}>
      <Chat visible={visible} />
    </div>
  );
}
