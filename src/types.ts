import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Country data structure
 */
export interface Country {
  /** ISO 3166-1 alpha-2 country code */
  code: string;
  /** Country name in English */
  name: string;
  /** E.164 calling code (e.g., "+1", "+44") */
  callingCode: string;
  /** Emoji flag representation */
  flag: string;
  /** ISO 4217 currency code (optional) */
  currency?: string;
}

/**
 * Main CountryPicker component props
 */
export interface CountryPickerProps {
  // Display options
  /** Show country name on the trigger button */
  withCountryNameButton?: boolean;
  /** Show flags in the country list */
  withFlag?: boolean;
  /** Enable search filter bar */
  withFilter?: boolean;
  /** Show calling codes in the country list */
  withCallingCode?: boolean;

  // Callbacks
  /** Called when a country is selected (required) */
  onSelect: (country: Country) => void;
  /** Called when the modal closes */
  onClose?: () => void;
  /** Called when the modal opens */
  onOpen?: () => void;

  // Data filtering
  /** Whitelist of country codes to display (ISO 3166-1 alpha-2) */
  countryCodes?: string[];
  /** Initial selected country code (ISO 3166-1 alpha-2) */
  countryCode?: string;

  // Styling
  /** Style for the main container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Style for the trigger button */
  buttonStyle?: StyleProp<ViewStyle>;
  /** Style for the modal container */
  modalStyle?: StyleProp<ViewStyle>;
}

/**
 * CountryItem component props
 */
export interface CountryItemProps {
  /** Country data to display */
  country: Country;
  /** Called when the item is pressed */
  onPress: (country: Country) => void;
  /** Show flag emoji */
  withFlag?: boolean;
  /** Show calling code */
  withCallingCode?: boolean;
}

/**
 * SearchBar component props
 */
export interface SearchBarProps {
  /** Current search query value */
  value: string;
  /** Called when search text changes */
  onChangeText: (text: string) => void;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Custom style for the search bar container */
  style?: StyleProp<ViewStyle>;
}

/**
 * CountryButton component props
 */
export interface CountryButtonProps {
  /** Currently selected country (if any) */
  selectedCountry: Country | null;
  /** Called when the button is pressed */
  onPress: () => void;
  /** Show country name on button */
  withCountryNameButton?: boolean;
  /** Show flag on button */
  withFlag?: boolean;
  /** Custom button style */
  style?: StyleProp<ViewStyle>;
}

/**
 * CountryModal component props
 */
export interface CountryModalProps {
  /** Controls modal visibility */
  visible: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Array of countries to display */
  countries: Country[];
  /** Called when a country is selected */
  onSelectCountry: (country: Country) => void;
  /** Enable search filter */
  withFilter?: boolean;
  /** Show flags in list */
  withFlag?: boolean;
  /** Show calling codes in list */
  withCallingCode?: boolean;
  /** Search query value */
  searchQuery: string;
  /** Called when search query changes */
  onSearchChange: (text: string) => void;
  /** Custom modal style */
  style?: StyleProp<ViewStyle>;
}
