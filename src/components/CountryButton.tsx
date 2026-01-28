import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import type { CountryButtonProps } from '../types';

/**
 * Button component that triggers the country picker modal
 */
const CountryButton: React.FC<CountryButtonProps> = ({
  selectedCountry,
  onPress,
  withCountryNameButton = false,
  withFlag = false,
  withCallingCode = false,
  style,
  renderChevron,
  renderFlag,
  placeholder = 'Select Country',
  countryNameStyle,
}) => {
  return (
    <TouchableOpacity
      testID="country-button"
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {withFlag && selectedCountry && (
          <>
            {renderFlag ? (
              renderFlag(selectedCountry)
            ) : (
              <Text style={styles.flag}>{selectedCountry.flag}</Text>
            )}
          </>
        )}
        {withCountryNameButton && selectedCountry && (
          <Text
            style={[styles.countryName, countryNameStyle]}
            numberOfLines={1}
          >
            {selectedCountry.name}
          </Text>
        )}
        {withCallingCode && selectedCountry && (
          <Text
            style={[styles.countryName, countryNameStyle]}
            numberOfLines={1}
          >
            {selectedCountry.callingCode}
          </Text>
        )}
        {!selectedCountry && (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
        {renderChevron ? (
          renderChevron()
        ) : (
          <Text style={styles.chevron}>▼</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CountryButton;

// Design tokens
const PRIMARY_COLOR = '#007AFF';
const TEXT_COLOR = '#000000';
const PLACEHOLDER_COLOR = '#8E8E93';
const BORDER_COLOR = '#E5E5EA';
const SPACING_MD = 16;
const SPACING_SM = 8;
const BORDER_RADIUS = 8;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACING_MD,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    minHeight: 48,
    justifyContent: 'center',
  } as ViewStyle,
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  flag: {
    fontSize: 24,
    marginRight: SPACING_SM,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: TEXT_COLOR,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
    color: PLACEHOLDER_COLOR,
  },
  chevron: {
    fontSize: 12,
    color: PRIMARY_COLOR,
    marginLeft: SPACING_SM,
  },
});
