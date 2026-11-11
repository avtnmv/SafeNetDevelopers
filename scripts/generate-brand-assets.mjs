import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const logo = await readFile(new URL('../public/media/safenet-logo.svg', import.meta.url), 'utf8');
const symbol = logo.match(/<path[^>]*\/>/)[0];
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="112" fill="#111"/><g transform="translate(126 74) scale(1.44)">${symbol}</g></svg>`;
await writeFile(new URL('../src/app/icon.svg', import.meta.url), icon);
await sharp(Buffer.from(icon)).png().toFile('public/media/safenet-logo-square.png');
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
const favicon = await sharp(Buffer.from(icon)).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32;
header[7] = 32;
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(favicon.length, 14);
header.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([header, favicon]));
const background = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="g"><stop stop-color="#393939"/><stop offset="1" stop-color="#101010"/></radialGradient></defs><rect width="1200" height="630" fill="#101010"/><circle cx="1050" cy="220" r="550" fill="url(#g)"/><g opacity=".055" transform="translate(900 130) scale(1.5)">${symbol}</g><g font-family="Arial, sans-serif" fill="white"><text x="64" y="267" font-size="76" font-weight="700" letter-spacing="-3">Сайт для бізнесу</text><text x="64" y="355" font-size="76" font-weight="700" letter-spacing="-3">за 3 дні.</text><text x="66" y="408" font-size="25" fill="#c5c5c5">Дизайн. Розробка. Перевірка безпеки.</text><rect x="64" y="452" width="370" height="58" rx="29" fill="white"/><text x="91" y="489" font-size="23" fill="#111">$300 / $500 · фіксована ціна</text><line x1="64" y1="555" x2="1136" y2="555" stroke="#444"/><text x="64" y="597" font-size="20" fill="#aaa">safenet-developers.com</text><text x="1136" y="597" text-anchor="end" font-size="20" fill="#aaa">Частина SafeNet Security</text></g></svg>`;
const brand = await sharp(Buffer.from(logo)).resize(235, 96).png().toBuffer();
await sharp(Buffer.from(background))
  .composite([{ input: brand, left: 64, top: 50 }])
  .png({ compressionLevel: 9 })
  .toFile('public/media/safenet-og.png');
