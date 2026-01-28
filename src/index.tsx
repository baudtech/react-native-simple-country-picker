import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { View, StyleSheet } from 'react-native';
import type { CountryPickerProps, Country, CountryPickerRef } from './types';
import CountryButton from './components/CountryButton';
import CountryModal from './components/CountryModal';
import { filterCountries } from './utils/filterCountries';
import { getTranslations } from './utils/translations';
import allCountriesData from './data/countries.json';

// Type assertion for imported JSON
const allCountries = allCountriesData as Country[];

/**
 * CountryPicker component
 *
 * A simple country picker with modal, search, and customization options.
 *
 * @example
 * ```tsx
 * <CountryPicker
 *   withCountryNameButton
 *   withFlag
 *   withFilter
 *   withCallingCode
 *   language="es"
 *   onSelect={(country) => console.log(country)}
 *   countryCode="US"
 * />
 * ```
 *
 * @example
 * Imperative usage with ref:
 * ```tsx
 * const pickerRef = useRef<CountryPickerRef>(null);
 *
 * // Open modal programmatically
 * pickerRef.current?.open();
 *
 * // Close modal programmatically
 * pickerRef.current?.close();
 * ```
 */
const CountryPicker = forwardRef<CountryPickerRef, CountryPickerProps>(
  (
    {
      withCountryNameButton = false,
      withFlag = false,
      withFilter = false,
      withCallingCode = false,
      onSelect,
      onClose,
      onOpen,
      countryCodes,
      countryCode,
      language,
      translations: customTranslations,
      containerStyle,
      buttonStyle,
      modalStyle,
      renderChevron,
      renderFlag,
      renderHeader,
    },
    ref
  ) => {
    // Get translations
    const translations = useMemo(
      () => getTranslations(language, customTranslations),
      [language, customTranslations]
    );

    // State management
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
      null
    );
    const [searchQuery, setSearchQuery] = useState('');

    // Initialize selected country from countryCode prop
    useEffect(() => {
      if (countryCode) {
        const country = allCountries.find(
          (c) => c.code.toUpperCase() === countryCode.toUpperCase()
        );
        if (country) {
          setSelectedCountry(country);
        }
      }
    }, [countryCode]);

    // Filter countries based on countryCodes whitelist and search query
    const filteredCountries = useMemo(() => {
      let countries = allCountries;

      // Apply countryCodes whitelist if provided
      if (countryCodes && countryCodes.length > 0) {
        const upperCaseCodes = countryCodes.map((code) => code.toUpperCase());
        countries = countries.filter((country) =>
          upperCaseCodes.includes(country.code.toUpperCase())
        );
      }

      // Apply search filter if withFilter is enabled and query exists
      if (withFilter && searchQuery.trim()) {
        countries = filterCountries(countries, searchQuery);
      }

      return countries;
    }, [countryCodes, searchQuery, withFilter]);

    // Event handlers
    const handleOpen = useCallback(() => {
      setModalVisible(true);
      onOpen?.();
    }, [onOpen]);

    const handleClose = useCallback(() => {
      setModalVisible(false);
      setSearchQuery(''); // Clear search on close
      onClose?.();
    }, [onClose]);

    const handleSelect = useCallback(
      (country: Country) => {
        setSelectedCountry(country);
        onSelect(country);
        handleClose();
      },
      [onSelect, handleClose]
    );

    const handleSearchChange = useCallback((text: string) => {
      setSearchQuery(text);
    }, []);

    // Expose imperative methods via ref
    useImperativeHandle(
      ref,
      () => ({
        open: handleOpen,
        close: handleClose,
      }),
      [handleOpen, handleClose]
    );

    return (
      <View style={[styles.container, containerStyle]}>
        <CountryButton
          selectedCountry={selectedCountry}
          onPress={handleOpen}
          withCountryNameButton={withCountryNameButton}
          withFlag={withFlag}
          withCallingCode={withCallingCode}
          style={buttonStyle}
          renderChevron={renderChevron}
          renderFlag={renderFlag}
        />
        <CountryModal
          visible={modalVisible}
          onClose={handleClose}
          countries={filteredCountries}
          onSelectCountry={handleSelect}
          withFilter={withFilter}
          withFlag={withFlag}
          withCallingCode={withCallingCode}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          style={modalStyle}
          renderHeader={renderHeader}
          language={language}
          translations={translations}
        />
      </View>
    );
  }
);

export default CountryPicker;

// Export types for consumers
export type {
  Country,
  CountryPickerProps,
  CountryPickerRef,
  Translations,
} from './types';

// Export translation utilities for advanced use cases
export { getTranslations, getCountryName } from './utils/translations';

const styles = StyleSheet.create({
  container: {
    // Container styles can be overridden via containerStyle prop
  },
});
