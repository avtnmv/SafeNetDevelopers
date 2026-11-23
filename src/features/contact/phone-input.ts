type Rules = { code: string; max: number; prefix: string };

// The calling code already has its own control. Keep only the national significant number.
export function normalizePhoneInput(raw: string, rules: Rules, truncate = false): string | null {
  let value = raw.replace(/[^\d+]/g, '');
  if (value.startsWith('00')) value = '+' + value.slice(2);
  if (value.startsWith('+')) {
    if (!value.startsWith('+' + rules.code)) return null;
    value = value.slice(rules.code.length + 1);
  } else if (!truncate && value.length > rules.max && value.startsWith(rules.code)) {
    value = value.slice(rules.code.length);
  }
  if (value.includes('+')) return null;
  if (rules.prefix && value.startsWith(rules.prefix)) value = value.slice(rules.prefix.length);
  if (value.length > rules.max && !truncate) return null;
  return value.slice(0, rules.max);
}
