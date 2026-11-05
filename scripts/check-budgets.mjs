import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const root = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(root, '.next/server/app/index.html'), 'utf8');
const scriptPaths = [
  ...new Set([...html.matchAll(/<script[^>]+src="([^"?]+\.js)/g)].map((m) => m[1])),
];
const scripts = scriptPaths.map((url) => {
  const file = fs.readFileSync(path.join(root, '.next', url.replace(/^\/_next\//, '')));
  return { url, bytes: file.length, gzip: gzipSync(file).length };
});
const modernScripts = scripts.filter((s) => !s.url.includes('/polyfills-'));
const deferredManifest = JSON.parse(
  fs.readFileSync(path.join(root, '.next/react-loadable-manifest.json'), 'utf8'),
);
const deferredPaths = [
  ...new Set(
    Object.values(deferredManifest)
      .flatMap((entry) => entry.files)
      .filter((file) => file.endsWith('.js')),
  ),
];
const deferredScripts = deferredPaths.map((url) => {
  const file = fs.readFileSync(path.join(root, '.next', url));
  return { url, bytes: file.length, gzip: gzipSync(file).length };
});
const report = {
  scriptCount: scripts.length,
  deferredJavascriptGzipBytes: deferredScripts.reduce((n, s) => n + s.gzip, 0),
  deferredScripts,
  modernJavascriptGzipBytes: modernScripts.reduce((n, s) => n + s.gzip, 0),
  javascriptGzipBytes: scripts.reduce((n, s) => n + s.gzip, 0),
  htmlGzipBytes: gzipSync(html).length,
  scripts,
};
console.log(JSON.stringify(report, null, 2));
if (report.modernJavascriptGzipBytes > 150 * 1024)
  throw new Error('Modern initial JS exceeds the 150 KiB gzip budget');
if (report.deferredJavascriptGzipBytes > 12 * 1024)
  throw new Error('Deferred effects exceed the 12 KiB gzip budget');
if (report.htmlGzipBytes > 50 * 1024) throw new Error('HTML exceeds the 50 KiB gzip budget');
if (scriptPaths.some((url) => !url.startsWith('/_next/static/')))
  throw new Error('Unexpected external runtime detected');
