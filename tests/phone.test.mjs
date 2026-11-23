import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { validatePhone } from '../src/lib/phone.ts';
test('validates national and international phones against the selected country', () => {
  for (const [number, country, expected] of [
    ['0671234567', 'UA', '+380671234567'],
    ['+380671234567', 'UA', '+380671234567'],
    ['791234567', 'PL', '+48791234567'],
    ['02079460018', 'GB', '+442079460018'],
    ['+14155552671', 'US', '+14155552671'],
    ['+14165552671', 'CA', '+14165552671'],
  ])
    assert.equal(validatePhone(number, country), expected);
  for (const [number, country] of [
    ['+14165552671', 'US'],
    ['+380671234567', 'PL'],
    ['@safenet_developers', 'UA'],
    ['123', 'UA'],
    ['+3806712345678', 'UA'],
    ['0671234567', 'ZZ'],
  ])
    assert.equal(validatePhone(number, country), null);
});
test('all country choices have local flags and bounded input lengths', () => {
  const countries = JSON.parse(fs.readFileSync('public/phone-countries.json', 'utf8'));
  assert.ok(countries.length > 200);
  for (const item of countries) {
    assert.ok(fs.existsSync(`public/media/flags/${item.id.toLowerCase()}.svg`));
    assert.ok(item.max > 0 && item.max <= 17);
  }
});

test('input excludes calling/trunk codes and never allows an extra Ukrainian digit', async () => {
  const { normalizePhoneInput } = await import('../src/features/contact/phone-input.ts');
  const countries = JSON.parse(fs.readFileSync('public/phone-countries.json', 'utf8'));
  const ua = countries.find((c) => c.id === 'UA');
  assert.equal(ua.max, 9);
  for (const value of [
    '+380 63 503 20 28',
    '00380635032028',
    '380635032028',
    '0635032028',
    '635032028',
  ])
    assert.equal(normalizePhoneInput(value, ua), '635032028');
  assert.equal(normalizePhoneInput('6350320287', ua, true), '635032028');
  assert.equal(normalizePhoneInput('3801234567', ua, true), '380123456');
  assert.equal(normalizePhoneInput('6350320287', ua), null);
  assert.equal(normalizePhoneInput('+48791234567', ua), null);
  const it = countries.find((c) => c.id === 'IT');
  assert.equal(normalizePhoneInput('0212345678', it), '0212345678');
  for (const c of countries) {
    assert.ok(c.example && c.example !== 'Номер телефону', c.id);
    assert.ok(c.max + c.code.length <= 15);
  }
});
