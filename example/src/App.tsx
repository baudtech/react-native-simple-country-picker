import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CountryPicker, { type Country } from 'react-native-country-picker';

export default function App() {
  const [country1, setCountry1] = useState<Country | null>(null);
  const [country2, setCountry2] = useState<Country | null>(null);
  const [country3, setCountry3] = useState<Country | null>(null);

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
            onSelect={(country) => {
              console.log('Selected country:', country);
            }}
          />
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
});
