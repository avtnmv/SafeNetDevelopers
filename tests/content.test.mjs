import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'src/content/site.json'), 'utf8'));

test('all published routes have distinct, valid slugs and complete content', () => {
  assert.equal(data.projects.length, 6);
  assert.equal(Object.hasOwn(data, 'articles'), false);
  assert.equal(data.legal.length, 2);
  for (const collection of [data.projects, data.legal]) {
    assert.equal(new Set(collection.map((item) => item.slug)).size, collection.length);
    for (const item of collection) assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }
  for (const project of data.projects) {
    assert.ok(project.cover && project.gallery.length > 0);
    assert.ok(project.sections.every((section) => section.paragraphs.length > 0));
  }
});

test('all content media are local, exist and cannot escape the public directory', () => {
  function visit(value) {
    if (Array.isArray(value)) return value.forEach(visit);
    if (value && typeof value === 'object') return Object.values(value).forEach(visit);
    if (typeof value !== 'string') return;
    assert.doesNotMatch(value, /https?:\/\/.*\.(?:jpg|png|svg|mp4|woff)/i);
    if (value.startsWith('/media/')) {
      assert.ok(!value.includes('..'));
      assert.ok(fs.existsSync(path.join(root, 'public', value)), value);
    }
  }
  visit(data);
});
