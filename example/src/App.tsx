import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import CountryPicker, {
  type Country,
  type CountryPickerRef,
} from 'react-native-simple-country-picker';

export default function App() {
  const [country1, setCountry1] = useState<Country | null>(null);
  const [country2, setCountry2] = useState<Country | null>(null);
  const [country3, setCountry3] = useState<Country | null>(null);
  const [country4, setCountry4] = useState<Country | null>(null);
  const [country5, setCountry5] = useState<Country | null>(null);
  const [country6, setCountry6] = useState<Country | null>(null);
  const [country7, setCountry7] = useState<Country | null>(null);
  const [country8, setCountry8] = useState<Country | null>(null);
  const [language, setLanguage] = useState<string>('en');

  // Ref for imperative control
  const pickerRef = useRef<CountryPickerRef>(null);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Country Picker Examples</Text>

        {/* Example 1: Full featured */}
        <View style={styles.example}>
          <Text style={styles.label}>Full Featured</Text>
          <Text style={styles.description}>
            All props enabled: flag, name, filter, calling code
          </Text>
          <CountryPicker
            withCountryNameButton
            withFlag
            withFilter
            withCallingCode
            onSelect={setCountry1}
            onOpen={() => console.log('Modal opened')}
            onClose={() => console.log('Modal closed')}
            countryCode="US"
          />
          {country1 && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Selected: {country1.flag} {country1.name}
              </Text>
              <Text style={styles.resultDetail}>
                Code: {country1.code} | Calling: {country1.callingCode}
              </Text>
              {country1.currency && (
                <Text style={styles.resultDetail}>
                  Currency: {country1.currency}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Example 2: Minimal - Flag button only */}
        <View style={styles.example}>
          <Text style={styles.label}>Minimal - Flag Only</Text>
          <Text style={styles.description}>
            Simple flag button without country name
          </Text>
          <CountryPicker withFlag onSelect={setCountry2} />
          {country2 && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Selected: {country2.flag} {country2.name}
              </Text>
            </View>
          )}
        </View>

        {/* Example 3: Filtered countries */}
        <View style={styles.example}>
          <Text style={styles.label}>European Countries Only</Text>
          <Text style={styles.description}>
            Using countryCodes prop to whitelist specific countries
          </Text>
          <CountryPicker
            withCountryNameButton
            withFlag
            withFilter
            onSelect={setCountry3}
            countryCodes={['GB', 'FR', 'DE', 'IT', 'ES', 'PT', 'NL', 'BE']}
          />
          {country3 && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Selected: {country3.flag} {country3.name}
              </Text>
            </View>
          )}
        </View>

        {/* Example 4: With calling codes but no filter */}
        <View style={styles.example}>
          <Text style={styles.label}>With Calling Codes</Text>
          <Text style={styles.description}>
            Shows calling codes in the list without search filter
          </Text>
          <CountryPicker
            withCountryNameButton
            withFlag
            withCallingCode
            onSelect={setCountry4}
          />
          {country4 && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Selected: {country4.flag} {country4.name}
              </Text>
            </View>
          )}
        </View>

        {/* Example 5: Fully Customized */}
        <View style={styles.example}>
          <Text style={styles.label}>Fully Customized</Text>
          <Text style={styles.description}>
            Custom header, chevron, and flag rendering
          </Text>
          <CountryPicker
            withCountryNameButton
            withFlag
            withFilter
            onSelect={setCountry5}
            renderChevron={() => (
              <View style={styles.customChevron}>
                <Text style={styles.chevronText}>▾</Text>
              </View>
            )}
            renderFlag={(country: Country) => (
              <View style={styles.customFlag}>
                <Text style={styles.customFlagText}>{country.code}</Text>
              </View>
            )}
            renderHeader={(onClose: () => void) => (
              <View style={styles.customHeader}>
                <Text style={styles.customHeaderTitle}>
                  Choose Your Country
                </Text>
                <TouchableOpacity
                  onPress={onClose}
                  style={styles.customCloseButton}
                >
                  <Text style={styles.customCloseButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
            buttonStyle={styles.customButton}
          />
          {country5 && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Selected: {country5.flag} {country5.name}
              </Text>
              <Text style={styles.resultDetail}>Code: {country5.code}</Text>
            </View>
          )}
        </View>

        {/* Example 6: With Language Prop (Spanish) */}
        <View style={styles.example}>
          <Text style={styles.label}>
            Translated UI & Country Names (Spanish)
          </Text>
          <Text style={styles.description}>
            Using language="es" to display Spanish translations for UI strings
            and country names
          </Text>
          <CountryPicker
            withCountryNameButton
            withFlag
            withFilter
            onSelect={setCountry6}
            language="es"
            countryCode="ES"
          />
          {country6 && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Seleccionado: {country6.flag} {country6.name}
              </Text>
              <Text style={styles.resultDetail}>
                The country name and search placeholder are in Spanish
              </Text>
            </View>
          )}
        </View>

        {/* Language Selector */}
        <View style={styles.languageSelector}>
          <Text style={styles.languageSelectorLabel}>
            UI Language: {language.toUpperCase()}
          </Text>
          <View style={styles.languageButtonsRow}>
            {['en', 'es', 'fr', 'de'].map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[
                  styles.languageButton,
                  language === lang && styles.languageButtonActive,
                ]}
                onPress={() => setLanguage(lang)}
              >
                <Text
                  style={[
                    styles.languageButtonText,
                    language === lang && styles.languageButtonTextActive,
                  ]}
                >
                  {lang.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Example 7: Dynamic Language Switching */}
        <View style={styles.example}>
          <Text style={styles.label}>Dynamic Language Switching</Text>
          <Text style={styles.description}>
            Language changes with the selector above. Try selecting a language
            first!
          </Text>
          <CountryPicker
            withCountryNameButton
            withFlag
            withFilter
            onSelect={setCountry7}
            language={language}
            countryCode="US"
          />
          {country7 && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Selected: {country7.flag} {country7.name}
              </Text>
              <Text style={styles.resultDetail}>
                Current UI Language: {language.toUpperCase()}
              </Text>
              <Text style={styles.resultDetail}>
                The search placeholder and other UI strings change based on the
                selected language
              </Text>
            </View>
          )}
        </View>

        {/* Example 8: Imperative Ref Control */}
        <View style={styles.example}>
          <Text style={styles.label}>Imperative Ref Control</Text>
          <Text style={styles.description}>
            Open the modal programmatically using a ref without clicking the
            button
          </Text>
          <View style={styles.imperativeExample}>
            <CountryPicker
              ref={pickerRef}
              withCountryNameButton
              withFlag
              withFilter
              onSelect={setCountry8}
              countryCode="CA"
            />
            <Button
              title="Open Modal Programmatically"
              onPress={() => pickerRef.current?.open()}
            />
          </View>
          {country8 && (
            <View style={styles.result}>
              <Text style={styles.resultText}>
                Selected: {country8.flag} {country8.name}
              </Text>
              <Text style={styles.resultDetail}>
                You can use ref.current.open() and ref.current.close() to
                control the modal
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
    textAlign: 'center',
  },
  languageSelector: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#E8F4F8',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0084FF',
  },
  languageSelectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  languageButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  languageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#CCC',
  },
  languageButtonActive: {
    backgroundColor: '#0084FF',
    borderColor: '#0084FF',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  languageButtonTextActive: {
    color: '#FFFFFF',
  },
  example: {
    marginBottom: 32,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  result: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  resultDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  customButton: {
    backgroundColor: '#F8F9FA',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  customChevron: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  chevronText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  customFlag: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  customFlagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#007AFF',
    borderBottomWidth: 0,
  },
  customHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  customCloseButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  customCloseButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  imperativeExample: {
    gap: 12,
  },
});
