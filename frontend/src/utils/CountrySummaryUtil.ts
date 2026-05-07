import { COUNTRY_NAMES, type Country } from '@/types/CountryTypes';

type CountryOriginSummary = {
  country: Country;
  label: string;
  count: number;
};

export function summarizeCountryOrigins(origins: Array<string | undefined | null>): CountryOriginSummary[] {
  const counts = new Map<Country, number>();

  for (const origin of origins) {
    if (!origin) continue;

    const code = origin.trim().toUpperCase() as Country;

    if (!code || !(code in COUNTRY_NAMES)) continue;

    counts.set(code, (counts.get(code) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([country, count]) => ({ country, label: COUNTRY_NAMES[country], count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'es'));
}

export default summarizeCountryOrigins;
