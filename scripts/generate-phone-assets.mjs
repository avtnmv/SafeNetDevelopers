import fs from 'node:fs';
import { getCountries, getCountryCallingCode, getExampleNumber } from 'libphonenumber-js/max';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const metadata = require('libphonenumber-js/metadata.max.json');
const examples = require('libphonenumber-js/examples.mobile.json');
const names = new Intl.DisplayNames(['uk'], { type: 'region' });
const countries = getCountries()
  .map((id) => {
    const item = metadata.countries[id];
    const example = getExampleNumber(id, examples);
    const types = item[11] || [];
    // Contact numbers use fixed-line/mobile lengths, not longer premium/service numbers.
    const lengths = types
      .slice(0, 2)
      .filter(Boolean)
      .flatMap((type) => type[1] || item[3]);
    const code = getCountryCallingCode(id);
    const prefix = item[5] || '';
    return {
      id,
      name: names.of(id),
      code,
      max: Math.min(15 - code.length, Math.max(...(lengths.length ? lengths : item[3]))),
      prefix:
        typeof prefix === 'string' &&
        /^\d+$/.test(prefix) &&
        !example?.nationalNumber.startsWith(prefix)
          ? prefix
          : '',
      example: example ? example.formatInternational().slice(code.length + 2) : 'Номер телефону',
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'uk'));
fs.mkdirSync('public/media/flags', { recursive: true });
for (const { id } of countries)
  fs.copyFileSync(
    `node_modules/country-flag-icons/3x2/${id}.svg`,
    `public/media/flags/${id.toLowerCase()}.svg`,
  );
fs.copyFileSync('node_modules/country-flag-icons/LICENSE', 'public/media/flags/LICENSE.txt');
fs.writeFileSync('public/phone-countries.json', JSON.stringify(countries));
