import {
  parsePhoneNumberFromString,
  isSupportedCountry,
  type CountryCode,
} from 'libphonenumber-js/max';

export function validatePhone(value: unknown, country: unknown): string | null {
  if (
    typeof country !== 'string' ||
    !isSupportedCountry(country) ||
    typeof value !== 'string' ||
    !/^[+\d\s().-]{5,40}$/.test(value)
  )
    return null;
  const number = parsePhoneNumberFromString(value.trim(), {
    defaultCountry: country as CountryCode,
    extract: false,
  });
  if (!number || number.country !== country || number.ext || !number.isValid()) return null;
  return number.number;
}
