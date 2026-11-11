import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const media = path.join(root, 'public/media');
const output = path.join(media, 'responsive');
await fs.mkdir(output, { recursive: true });
const manifest = {};
for (const name of (await fs.readdir(media)).sort()) {
  if (!/\.(png|jpe?g|webp)$/i.test(name)) continue;
  const bytes = await fs.readFile(path.join(media, name));
  const info = await sharp(bytes).metadata();
  const hash = createHash('sha256').update(bytes).update('webp-78-v1').digest('hex').slice(0, 16);
  const widths = [
    ...new Set([96, 320, 480, 640, 960, 1280, 1600].map((w) => Math.min(w, info.width))),
  ];
  const variants = [];
  for (const width of widths) {
    const file = `${hash}-${width}.webp`;
    await sharp(bytes)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(output, file));
    variants.push({ width, src: `/media/responsive/${file}` });
  }
  manifest[`/media/${name}`] = { width: info.width, height: info.height, variants };
}
await fs.writeFile(
  path.join(root, 'src/content/image-variants.json'),
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(`Prepared responsive WebP variants for ${Object.keys(manifest).length} images`);
