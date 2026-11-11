import 'server-only';
import { createContactHandler } from '@/lib/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const POST = createContactHandler({
  token: process.env.TELEGRAM_BOT_TOKEN,
  chatId: process.env.TELEGRAM_CHAT_ID,
  origin: process.env.CONTACT_ORIGIN || 'https://safenet-developers.com',
  // Enable only behind our Nginx, which overwrites X-Real-IP.
  trustProxy: process.env.CONTACT_TRUST_PROXY === 'true',
});
