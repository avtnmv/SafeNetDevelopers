import { createHash } from 'node:crypto';

const plans = { start: 'Старт', business: 'Бізнес', custom: 'Допоможіть обрати' };
const invalidControls = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u202a-\u202e\u2066-\u2069]/;
export function validateContact(input: unknown) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const data = input as Record<string, unknown>;
  const limits = {
    name: 120,
    phone: 80,
    email: 254,
    message: 2500,
    plan: 20,
    website: 200,
    requestId: 36,
  };
  for (const [key, limit] of Object.entries(limits)) {
    if (
      typeof data[key] !== 'string' ||
      data[key].length > limit ||
      invalidControls.test(data[key])
    )
      return null;
  }
  const name = (data.name as string).trim();
  const phone = (data.phone as string).trim();
  const email = (data.email as string).trim();
  const message = (data.message as string).trim();
  const plan = data.plan as keyof typeof plans;
  const requestId = data.requestId as string;
  if (!name || /[\r\n]/.test(name) || /[\r\n]/.test(phone)) return null;
  if (!/^@[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(phone) && !/^\+?[\d\s().-]{7,30}$/.test(phone))
    return null;
  if (!phone.startsWith('@') && phone.replace(/\D/g, '').length < 7) return null;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (
    !Object.hasOwn(plans, plan) ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)
  )
    return null;
  return { name, phone, email, message, plan, requestId, website: (data.website as string).trim() };
}

export function createContactHandler(options: {
  token?: string;
  chatId?: string;
  origin: string;
  trustProxy?: boolean;
  fetcher?: typeof fetch;
  now?: () => number;
}) {
  const fetcher = options.fetcher ?? fetch;
  const now = options.now ?? Date.now;
  const rates = new Map<string, { count: number; until: number }>();
  const deliveries = new Map<string, { state: 'pending' | 'sent'; until: number }>();
  function take(key: string, max: number, period: number) {
    const time = now();
    for (const [id, entry] of rates) if (entry.until <= time) rates.delete(id);
    let entry = rates.get(key);
    if (!entry) {
      if (rates.size >= 10000) return false;
      entry = { count: 0, until: time + period };
      rates.set(key, entry);
    }
    return ++entry.count <= max;
  }
  function reply(status: number, error?: string) {
    return Response.json(error ? { ok: false, error } : { ok: true }, {
      status,
      headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '900' } : {}) },
    });
  }
  return async function handle(request: Request) {
    if (request.method !== 'POST') return reply(405, 'Метод не підтримується.');
    if (
      request.headers.get('origin') !== options.origin ||
      request.headers.get('sec-fetch-site') === 'cross-site'
    )
      return reply(403, 'Оновіть сторінку та спробуйте ще раз.');
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json')
      return reply(415, 'Непідтримуваний формат.');
    const ip = options.trustProxy ? request.headers.get('x-real-ip') || 'unknown' : 'local';
    const ipKey = createHash('sha256').update(ip).digest('hex');
    if (!take('requests:' + ipKey, 20, 60_000))
      return reply(429, 'Забагато спроб. Спробуйте пізніше.');
    if (Number(request.headers.get('content-length')) > 16384)
      return reply(413, 'Повідомлення завелике.');
    let input: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply(400, 'Заповніть форму.');
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > 16384) {
          await reader.cancel();
          return reply(413, 'Повідомлення завелике.');
        }
        chunks.push(value);
      }
      input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      return reply(400, 'Некоректні дані форми.');
    }
    const data = validateContact(input);
    if (!data) return reply(400, 'Перевірте ім’я, телефон або @username та інші поля.');
    if (data.website) return reply(200);
    if (!options.token || !options.chatId)
      return reply(503, 'Форма тимчасово недоступна. Напишіть на Info@safenet.org.ua.');
    const time = now();
    for (const [key, value] of deliveries) if (value.until <= time) deliveries.delete(key);
    const key = createHash('sha256')
      .update(
        JSON.stringify([
          data.requestId,
          data.name,
          data.phone,
          data.email,
          data.plan,
          data.message,
        ]),
      )
      .digest('hex');
    const previous = deliveries.get(key);
    if (previous?.state === 'sent') return reply(200);
    if (previous) return reply(409, 'Заявка вже надсилається. Зачекайте.');
    if (
      !take('send:' + ipKey, 3, 900_000) ||
      !take('global', 30, 60_000) ||
      deliveries.size >= 10000
    )
      return reply(429, 'Забагато спроб. Спробуйте через 15 хвилин.');
    deliveries.set(key, { state: 'pending', until: time + 900_000 });
    const text = [
      'Нова заявка · SafeNet Developers',
      `Ім’я: ${data.name}`,
      `Контакт: ${data.phone}`,
      `Email: ${data.email || 'Не вказано'}`,
      `Тариф: ${plans[data.plan]}`,
      '',
      'Деталі:',
      data.message || 'Не вказано',
      '',
      `ID заявки: ${data.requestId}`,
    ].join('\n');
    try {
      const response = await fetcher(`https://api.telegram.org/bot${options.token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: options.chatId,
          text,
          link_preview_options: { is_disabled: true },
        }),
        signal: AbortSignal.timeout(10_000),
        cache: 'no-store',
        redirect: 'error',
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('delivery_failed');
      deliveries.set(key, { state: 'sent', until: time + 900_000 });
      return reply(200);
    } catch {
      deliveries.delete(key);
      // Never log upstream errors: their URLs may contain the bot token.
      console.error('Contact delivery failed');
      return reply(
        502,
        'Не вдалося підтвердити доставку. Спробуйте пізніше або напишіть на Info@safenet.org.ua.',
      );
    }
  };
}
