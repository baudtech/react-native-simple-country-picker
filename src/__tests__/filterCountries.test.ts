import { filterCountries } from '../utils/filterCountries';
import type { Country } from '../types';

describe('filterCountries', () => {
  const mockCountries: Country[] = [
    {
      code: 'US',
      name: 'United States',
      callingCode: '+1',
      flag: '🇺🇸',
      currency: 'USD',
    },
    {
      code: 'GB',
      name: 'United Kingdom',
      callingCode: '+44',
      flag: '🇬🇧',
      currency: 'GBP',
    },
    {
      code: 'CA',
      name: 'Canada',
      callingCode: '+1',
      flag: '🇨🇦',
      currency: 'CAD',
    },
    {
      code: 'AU',
      name: 'Australia',
      callingCode: '+61',
      flag: '🇦🇺',
      currency: 'AUD',
    },
    {
      code: 'DE',
      name: 'Germany',
      callingCode: '+49',
      flag: '🇩🇪',
      currency: 'EUR',
    },
  ];

  it('returns all countries when query is empty', () => {
    const result = filterCountries(mockCountries, '');
    expect(result).toEqual(mockCountries);
    expect(result.length).toBe(5);
  });

  it('returns all countries when query is only whitespace', () => {
    const result = filterCountries(mockCountries, '   ');
    expect(result).toEqual(mockCountries);
    expect(result.length).toBe(5);
  });

  it('filters by country name (case-insensitive)', () => {
    const result = filterCountries(mockCountries, 'united');
    expect(result.length).toBe(2);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'United States' }),
        expect.objectContaining({ name: 'United Kingdom' }),
      ])
    );
  });

  it('filters by country name (exact match)', () => {
    const result = filterCountries(mockCountries, 'Germany');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('Germany');
  });

  it('filters by country name (case insensitive)', () => {
    const result = filterCountries(mockCountries, 'CANADA');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('Canada');
  });

  it('filters by calling code with + sign', () => {
    const result = filterCountries(mockCountries, '+44');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('United Kingdom');
  });

  it('filters by calling code without + sign', () => {
    const result = filterCountries(mockCountries, '44');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('United Kingdom');
  });

  it('filters by calling code with multiple matches', () => {
    const result = filterCountries(mockCountries, '+1');
    // Matches +1 (US, Canada) and +61 (Australia) due to substring matching
    expect(result.length).toBe(3);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'United States' }),
        expect.objectContaining({ name: 'Canada' }),
        expect.objectContaining({ name: 'Australia' }),
      ])
    );
  });

  it('filters by partial country name', () => {
    const result = filterCountries(mockCountries, 'ger');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('Germany');
  });

  it('returns empty array when no matches found', () => {
    const result = filterCountries(mockCountries, 'xyz123');
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it('handles special characters in search query', () => {
    const result = filterCountries(mockCountries, 'United States');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('United States');
  });

  it('trims whitespace from query', () => {
    const result = filterCountries(mockCountries, '  Germany  ');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('Germany');
  });

  it('matches partial calling code', () => {
    const result = filterCountries(mockCountries, '6');
    expect(result.length).toBe(1);
    expect(result[0]?.name).toBe('Australia');
  });
});
