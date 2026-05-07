import { COUNTRIES, COUNTRY_NAMES } from '@/types/CountryTypes';

export function getAllowedCountries(): Array<{ code: string; name: string }> {
  return COUNTRIES.map((code) => ({ code, name: COUNTRY_NAMES[code as keyof typeof COUNTRY_NAMES] }));
}

export default { getAllowedCountries };
