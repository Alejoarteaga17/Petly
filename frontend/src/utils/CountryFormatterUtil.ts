import { COUNTRIES, type Country } from '@/types/CountryTypes';

type CountryOriginSummary = {
  country: Country;
  label: string;
  count: number;
};

const COUNTRY_DISPLAY_NAMES_ES = new Intl.DisplayNames(['es'], { type: 'region' });
const COUNTRY_DISPLAY_NAMES_EN = new Intl.DisplayNames(['en'], { type: 'region' });

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function addAlias(lookup: Map<string, Country>, alias: string, country: Country) {
  lookup.set(normalizeText(alias), country);
}

function buildCountryLookup(): Map<string, Country> {
  const lookup = new Map<string, Country>();

  for (const country of COUNTRIES) {
    addAlias(lookup, country, country);
    addAlias(lookup, COUNTRY_DISPLAY_NAMES_ES.of(country) ?? country, country);
    addAlias(lookup, COUNTRY_DISPLAY_NAMES_EN.of(country) ?? country, country);
  }

  addAlias(lookup, 'usa', 'US');
  addAlias(lookup, 'u.s.a.', 'US');
  addAlias(lookup, 'united states of america', 'US');
  addAlias(lookup, 'estados unidos', 'US');
  addAlias(lookup, 'uk', 'GB');
  addAlias(lookup, 'u.k.', 'GB');
  addAlias(lookup, 'reino unido', 'GB');
  addAlias(lookup, 'great britain', 'GB');

  return lookup;
}

const COUNTRY_LOOKUP = buildCountryLookup();

export class CountryFormatterUtil {
  static normalizeCountryOrigin(origin: string): Country | null {
    const normalizedOrigin = normalizeText(origin.trim());

    if (!normalizedOrigin) {
      return null;
    }

    return COUNTRY_LOOKUP.get(normalizedOrigin) ?? null;
  }

  static summarizeCountryOrigins(origins: string[]): CountryOriginSummary[] {
    const counts = new Map<Country, number>();

    for (const origin of origins) {
      const country = this.normalizeCountryOrigin(origin);

      if (!country) {
        continue;
      }

      counts.set(country, (counts.get(country) ?? 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([country, count]) => ({
        country,
        label: COUNTRY_DISPLAY_NAMES_ES.of(country) ?? country,
        count,
      }))
      .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label, 'es'));
  }

  static formatDestinations(destinations: string): Country[] {
    const destinationsArray = destinations
      .split(',')
      .map((dest) => this.normalizeCountryOrigin(dest))
      .filter((dest): dest is Country => Boolean(dest));

    if (destinationsArray.length === 0) {
      throw new Error('No valid country codes found in the input string.');
    }

    return destinationsArray;
  }
}