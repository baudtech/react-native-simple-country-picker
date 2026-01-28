import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import type { SearchBarProps } from '../types';

/**
 * Search bar component for filtering countries
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search by name or code',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        testID="search-bar-input"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER_COLOR}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
    </View>
  );
};

export default SearchBar;

// Design tokens
const BORDER_COLOR = '#E5E5EA';
const TEXT_COLOR = '#000000';
const PLACEHOLDER_COLOR = '#8E8E93';
const BACKGROUND_COLOR = '#F9F9F9';
const SPACING_MD = 16;
const BORDER_RADIUS = 8;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING_MD,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  } as ViewStyle,
  input: {
    height: 40,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 12,
    fontSize: 16,
    color: TEXT_COLOR,
  } as TextStyle,
});
