import type { Country, Translations } from '../types';

/**
 * Built-in translation files by language code
 * English is the default/fallback language
 */
const LOCALE_STRINGS: Record<string, Translations> = {
  en: {
    searchPlaceholder: 'Search by name or code',
    headerTitle: 'Select Country',
    noCountriesFound: 'No countries found',
  },
  es: {
    searchPlaceholder: 'Buscar por nombre o código',
    headerTitle: 'Seleccionar País',
    noCountriesFound: 'No se encontraron países',
  },
  fr: {
    searchPlaceholder: 'Rechercher par nom ou code',
    headerTitle: 'Sélectionner un Pays',
    noCountriesFound: 'Aucun pays trouvé',
  },
  de: {
    searchPlaceholder: 'Nach Name oder Code durchsuchen',
    headerTitle: 'Land auswählen',
    noCountriesFound: 'Keine Länder gefunden',
  },
};

/**
 * Get translations for a given language code
 * Falls back to English translations if language is not found
 *
 * @param language - Language/locale code (e.g., "en", "es", "fr", "de")
 * @param customTranslations - Optional custom translations to merge
 * @returns Translations object
 */
export function getTranslations(
  language?: string,
  customTranslations?: Translations
): Translations {
  const baseTranslations: Translations =
    LOCALE_STRINGS[language || 'en'] ?? LOCALE_STRINGS.en!;

  return {
    searchPlaceholder:
      customTranslations?.searchPlaceholder ??
      baseTranslations.searchPlaceholder,
    headerTitle:
      customTranslations?.headerTitle ?? baseTranslations.headerTitle,
    noCountriesFound:
      customTranslations?.noCountriesFound ?? baseTranslations.noCountriesFound,
  };
}

/**
 * Get the display name for a country in the specified language
 * Falls back to English name if translation is not available
 *
 * @param country - Country object
 * @param language - Language/locale code (e.g., "en", "es")
 * @returns Translated country name or default name
 */
export function getCountryName(country: Country, language?: string): string {
  if (!language || language === 'en') {
    return country.name;
  }

  // Check if the country has translations for this language
  if (country.names && language in country.names) {
    const translatedName = country.names[language];
    if (translatedName) {
      return translatedName;
    }
  }

  // Fall back to English name
  return country.name;
}
