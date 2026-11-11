import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/content/image-variants.json')));
const content = JSON.parse(fs.readFileSync(path.join(root, 'src/content/site.json')));

test('project and team photos have valid responsive images without upscaling', async () => {
  for (const src of [
    ...content.projects.map((p) => p.cover),
    ...content.team.map((p) => p.image),
  ]) {
    const image = manifest[src];
    assert.ok(image, `Missing responsive image: ${src}`);
    let last = 0;
    for (const variant of image.variants) {
      assert.ok(variant.width > last && variant.width <= image.width);
      const file = path.join(root, 'public', variant.src);
      const info = await sharp(file).metadata();
      assert.equal(info.width, variant.width);
      assert.equal(info.format, 'webp');
      last = variant.width;
    }
  }
});

test('background media stay within mobile and desktop transfer budgets', () => {
  for (const [name, limit] of [
    ['hero-mobile-v2.mp4', 700 * 1024],
    ['hero-desktop-v2.mp4', 2 * 1024 * 1024],
    ['hero-poster-v2.webp', 80 * 1024],
  ]) {
    assert.ok(
      fs.statSync(path.join(root, 'public/media', name)).size < limit,
      `${name} exceeds budget`,
    );
  }
});
