import type { ContentBlock } from '@/lib/content';
import s from './RichContent.module.scss';
export function RichContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className={s.content}>
      {blocks.map((block, index) =>
        block.type === 'heading' ? (
          <h2 key={index} data-reveal="fade">
            {block.text}
          </h2>
        ) : block.type === 'list' ? (
          <ul key={index} data-reveal="fade">
            {block.items?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={index} data-reveal="fade">
            {block.text}
          </p>
        ),
      )}
    </div>
  );
}
