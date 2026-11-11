import 'server-only';
import type { CSSProperties } from 'react';
import manifest from '@/content/image-variants.json';

type Props = {
  src: string;
  alt: string;
  sizes: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

/** Prebuilt images avoid a cold image-optimizer request on the first visit. */
export function ResponsiveImage({ src, alt, sizes, fill, width, height }: Props) {
  const image = manifest[src as keyof typeof manifest];
  const fallback =
    image?.variants.find((variant) => variant.width >= 640) ?? image?.variants.at(-1);
  const style: CSSProperties | undefined = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%' }
    : undefined;
  return (
    <img
      src={fallback?.src ?? src}
      srcSet={image?.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={width ?? image?.width}
      height={height ?? image?.height}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );
}
