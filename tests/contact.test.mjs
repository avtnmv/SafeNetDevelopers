import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createContactHandler, validateContact } from '../src/lib/contact.ts';
const origin = 'https://safenet-developers.com';
const valid = () => ({
  name: 'Олена',
  phone: '@olena_test',
  email: '',
  message: 'Хочу сайт',
  plan: 'custom',
  website: '',
  requestId: randomUUID(),
});
const request = (data, headers = {}) =>
  new Request(origin + '/api/contact', {
    method: 'POST',
    headers: { origin, 'content-type': 'application/json', ...headers },
    body: JSON.stringify(data),
  });
const setup = (fetcher) =>
  createContactHandler({ origin, token: 'test-secret', chatId: '-123', fetcher });
test('strict validation rejects invalid fields, controls, plans and excessive text', () => {
  assert.ok(validateContact(valid()));
  assert.ok(validateContact({ ...valid(), phone: '+380 (67) 123-45-67' }));
  for (const changes of [
    { name: '' },
    { name: 'a\nb' },
    { phone: '--- ---' },
    { phone: '@x' },
    { plan: '__proto__' },
    { email: 'bad' },
    { message: 'x'.repeat(2501) },
    { name: 1 },
    { message: '\u202eevil' },
    { requestId: 'bad' },
  ])
    assert.equal(validateContact({ ...valid(), ...changes }), null);
});
test('rejects foreign origins, malformed JSON and oversized streamed payload without delivery', async () => {
  const handler = setup(() => {
    throw new Error('must not send');
  });
  assert.equal((await handler(request(valid(), { origin: 'https://evil.test' }))).status, 403);
  assert.equal((await handler(request(valid(), { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await handler(request({ ...valid(), message: 'x'.repeat(17000) }))).status, 413);
  assert.equal(
    (
      await handler(
        new Request(origin, {
          method: 'POST',
          headers: { origin, 'content-type': 'application/json' },
          body: '{',
        }),
      )
    ).status,
    400,
  );
  assert.equal((await handler(request({ ...valid(), website: 'bot.example' }))).status, 200);
});
test('sends plain text to fixed destination once and suppresses concurrent duplicates', async () => {
  let calls = 0;
  let release;
  const handler = setup(async (url, init) => {
    calls++;
    assert.equal(url, 'https://api.telegram.org/bottest-secret/sendMessage');
    const body = JSON.parse(init.body);
    assert.equal(body.chat_id, '-123');
    assert.equal(body.parse_mode, undefined);
    assert.ok(body.text.includes('<b>literal</b>'));
    assert.ok(body.text.length < 4096);
    await new Promise((resolve) => {
      release = resolve;
    });
    return Response.json({ ok: true });
  });
  const data = { ...valid(), message: '<b>literal</b>' };
  const pending = handler(request(data));
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal((await handler(request(data))).status, 409);
  release();
  assert.equal((await pending).status, 200);
  assert.equal((await handler(request(data))).status, 200);
  assert.equal(calls, 1);
});
test('limits submissions per IP and expires window', async () => {
  let time = 1000;
  const handler = createContactHandler({
    origin,
    token: 'x',
    chatId: '-1',
    now: () => time,
    fetcher: async () => Response.json({ ok: true }),
  });
  for (let i = 0; i < 3; i++) assert.equal((await handler(request(valid()))).status, 200);
  const denied = await handler(request(valid()));
  assert.equal(denied.status, 429);
  assert.equal(denied.headers.get('retry-after'), '900');
  time += 900001;
  assert.equal((await handler(request(valid()))).status, 200);
});
test('upstream errors never expose token or incorrectly report success', async () => {
  const handler = setup(async () =>
    Response.json({ ok: false, description: 'test-secret' }, { status: 403 }),
  );
  const response = await handler(request(valid()));
  assert.equal(response.status, 502);
  assert.ok(!(await response.text()).includes('test-secret'));
  const missing = createContactHandler({ origin });
  assert.equal((await missing(request(valid()))).status, 503);
});
