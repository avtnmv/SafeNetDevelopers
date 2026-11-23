import 'server-only';
import { isIP } from 'node:net';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  let country = 'UA';
  let detected = false;
  // Only the reverse proxy may provide the visitor address; never accept a query IP.
  const ip = process.env.CONTACT_TRUST_PROXY === 'true' ? request.headers.get('x-real-ip') : null;
  if (ip && isIP(ip) && process.env.ILA_DATA_DIR) {
    try {
      const { lookup } = await import('ip-location-api');
      const result = await lookup(ip);
      if (result?.country && /^[A-Z]{2}$/.test(result.country)) {
        country = result.country;
        detected = true;
      }
    } catch {
      /* Manual country selection remains available if the local database is unavailable. */
    }
  }
  return Response.json(
    { country, detected },
    { headers: { 'Cache-Control': 'private, no-store', Vary: 'X-Real-IP' } },
  );
}
