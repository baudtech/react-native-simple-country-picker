import React, { memo } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import type { CountryItemProps } from '../types';
import { getCountryName } from '../utils/translations';

/**
 * Memoized country list item component
 * Fixed height for FlatList getItemLayout optimization
 */
const CountryItem: React.FC<CountryItemProps> = ({
  country,
  onPress,
  withFlag = false,
  withCallingCode = false,
  language,
}) => {
  const displayName = getCountryName(country, language);

  return (
    <TouchableOpacity
      testID={`country-item-${country.code}`}
      onPress={() => onPress(country)}
      activeOpacity={0.7}
    >
      <View style={styles.container}>
        {withFlag && <Text style={styles.flag}>{country.flag}</Text>}
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {displayName}
        </Text>
        {withCallingCode && (
          <Text style={styles.callingCode}>{country.callingCode}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Memoize to prevent unnecessary re-renders during scrolling
export default memo(CountryItem);

// Design tokens
const ITEM_HEIGHT = 60;
const BORDER_COLOR = '#E5E5EA';
const TEXT_COLOR = '#000000';
const TEXT_SECONDARY_COLOR = '#8E8E93';
const SPACING_MD = 16;
const SPACING_SM = 8;

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING_MD,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
  flag: {
    fontSize: 32,
    marginRight: SPACING_SM,
    width: 40,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: TEXT_COLOR,
  },
  callingCode: {
    fontSize: 14,
    color: TEXT_SECONDARY_COLOR,
    marginLeft: SPACING_SM,
  },
});

// Export ITEM_HEIGHT for FlatList getItemLayout
export { ITEM_HEIGHT };
