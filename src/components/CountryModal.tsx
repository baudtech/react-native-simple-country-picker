import React, { useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  type ViewStyle,
  type ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CountryModalProps, Country } from '../types';
import CountryItem, { ITEM_HEIGHT } from './CountryItem';
import SearchBar from './SearchBar';
import { getTranslations } from '../utils/translations';

/**
 * Modal component containing the country list with header and optional search
 */
const CountryModal: React.FC<CountryModalProps> = ({
  visible,
  onClose,
  countries,
  onSelectCountry,
  withFilter = false,
  withFlag = false,
  withCallingCode = false,
  searchQuery,
  onSearchChange,
  style,
  renderHeader,
  language,
  translations: customTranslations,
}) => {
  // Get translations
  const translations = getTranslations(language, customTranslations);

  // Memoized render function for FlatList performance
  const renderItem: ListRenderItem<Country> = useCallback(
    ({ item }) => (
      <CountryItem
        country={item}
        onPress={onSelectCountry}
        withFlag={withFlag}
        withCallingCode={withCallingCode}
        language={language}
      />
    ),
    [onSelectCountry, withFlag, withCallingCode, language]
  );

  // Memoized key extractor
  const keyExtractor = useCallback((item: Country) => item.code, []);

  // Memoized getItemLayout for performance
  const getItemLayout = useCallback(
    (_data: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <Modal
      testID="country-modal"
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, style]}>
          {/* Header with close button */}
          {renderHeader ? (
            renderHeader(onClose)
          ) : (
            <View style={styles.header}>
              <Text style={styles.title}>{translations.headerTitle}</Text>
              <TouchableOpacity
                testID="close-button"
                onPress={onClose}
                style={styles.closeButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Optional search bar */}
          {withFilter && (
            <SearchBar
              value={searchQuery}
              onChangeText={onSearchChange}
              placeholder={translations.searchPlaceholder}
            />
          )}

          {/* Country list */}
          <FlatList
            testID="country-list"
            data={countries}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            initialNumToRender={15}
            maxToRenderPerBatch={5}
            windowSize={10}
            removeClippedSubviews={true}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {translations.noCountriesFound}
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default CountryModal;

// Design tokens
const TEXT_COLOR = '#000000';
const TEXT_SECONDARY_COLOR = '#8E8E93';
const BORDER_COLOR = '#E5E5EA';
const PRIMARY_COLOR = '#007AFF';
const SPACING_MD = 16;
const SPACING_LG = 24;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  } as ViewStyle,
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING_MD,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  } as ViewStyle,
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  closeButton: {
    position: 'absolute',
    right: SPACING_MD,
    top: 12,
    padding: 4,
  } as ViewStyle,
  closeButtonText: {
    fontSize: 24,
    color: PRIMARY_COLOR,
    fontWeight: '400',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING_LG,
  } as ViewStyle,
  emptyText: {
    fontSize: 16,
    color: TEXT_SECONDARY_COLOR,
  },
});
