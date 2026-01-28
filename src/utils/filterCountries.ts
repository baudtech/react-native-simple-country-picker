import type { Country } from '../types';

/**
 * Filter countries by search query
 * Searches in: country name (case-insensitive) and calling code
 *
 * @param countries - Array of countries to filter
 * @param query - Search query string
 * @returns Filtered array of countries matching the query
 */
export function filterCountries(
  countries: Country[],
  query: string
): Country[] {
  if (!query || query.trim() === '') {
    return countries;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return countries.filter((country) => {
    // Search in country name (case-insensitive)
    const matchesName = country.name.toLowerCase().includes(normalizedQuery);

    // Search in calling code (remove + if present in query)
    const matchesCallingCode = country.callingCode
      .replace('+', '')
      .includes(normalizedQuery.replace('+', ''));

    return matchesName || matchesCallingCode;
  });
}
