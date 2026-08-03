import { colors } from '@/constants/colors';
import { useSettings } from '@/contexts/SettingsContext';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const REGIONS = [
  // Asia
  { region: 'Pakistan', currency: 'PKR' },
  { region: 'India', currency: 'INR' },
  { region: 'Bangladesh', currency: 'BDT' },
  { region: 'Sri Lanka', currency: 'LKR' },
  { region: 'Nepal', currency: 'NPR' },
  { region: 'Bhutan', currency: 'BTN' },
  { region: 'Afghanistan', currency: 'AFN' },
  { region: 'China', currency: 'CNY' },
  { region: 'Japan', currency: 'JPY' },
  { region: 'South Korea', currency: 'KRW' },
  { region: 'North Korea', currency: 'KPW' },
  { region: 'Singapore', currency: 'SGD' },
  { region: 'Malaysia', currency: 'MYR' },
  { region: 'Thailand', currency: 'THB' },
  { region: 'Indonesia', currency: 'IDR' },
  { region: 'Vietnam', currency: 'VND' },
  { region: 'Philippines', currency: 'PHP' },
  { region: 'Cambodia', currency: 'KHR' },
  { region: 'Laos', currency: 'LAK' },
  { region: 'Myanmar', currency: 'MMK' },
  { region: 'Brunei', currency: 'BND' },
  { region: 'Taiwan', currency: 'TWD' },
  { region: 'Hong Kong', currency: 'HKD' },
  { region: 'Macau', currency: 'MOP' },
  { region: 'Mongolia', currency: 'MNT' },

  // Middle East
  { region: 'United Arab Emirates', currency: 'AED' },
  { region: 'Saudi Arabia', currency: 'SAR' },
  { region: 'Qatar', currency: 'QAR' },
  { region: 'Kuwait', currency: 'KWD' },
  { region: 'Bahrain', currency: 'BHD' },
  { region: 'Oman', currency: 'OMR' },
  { region: 'Jordan', currency: 'JOD' },
  { region: 'Lebanon', currency: 'LBP' },
  { region: 'Iran', currency: 'IRR' },
  { region: 'Iraq', currency: 'IQD' },
  { region: 'Turkey', currency: 'TRY' },

  // Europe
  { region: 'United Kingdom', currency: 'GBP' },
  { region: 'Ireland', currency: 'EUR' },
  { region: 'Germany', currency: 'EUR' },
  { region: 'France', currency: 'EUR' },
  { region: 'Italy', currency: 'EUR' },
  { region: 'Spain', currency: 'EUR' },
  { region: 'Portugal', currency: 'EUR' },
  { region: 'Netherlands', currency: 'EUR' },
  { region: 'Belgium', currency: 'EUR' },
  { region: 'Austria', currency: 'EUR' },
  { region: 'Switzerland', currency: 'CHF' },
  { region: 'Sweden', currency: 'SEK' },
  { region: 'Norway', currency: 'NOK' },
  { region: 'Denmark', currency: 'DKK' },
  { region: 'Finland', currency: 'EUR' },
  { region: 'Poland', currency: 'PLN' },
  { region: 'Czech Republic', currency: 'CZK' },
  { region: 'Hungary', currency: 'HUF' },
  { region: 'Romania', currency: 'RON' },
  { region: 'Bulgaria', currency: 'BGN' },
  { region: 'Ukraine', currency: 'UAH' },
  { region: 'Russia', currency: 'RUB' },
  { region: 'Greece', currency: 'EUR' },

  // North America
  { region: 'United States', currency: 'USD' },
  { region: 'Canada', currency: 'CAD' },
  { region: 'Mexico', currency: 'MXN' },
  { region: 'Jamaica', currency: 'JMD' },
  { region: 'Cuba', currency: 'CUP' },
  { region: 'Dominican Republic', currency: 'DOP' },

  // South America
  { region: 'Brazil', currency: 'BRL' },
  { region: 'Argentina', currency: 'ARS' },
  { region: 'Chile', currency: 'CLP' },
  { region: 'Colombia', currency: 'COP' },
  { region: 'Peru', currency: 'PEN' },
  { region: 'Uruguay', currency: 'UYU' },
  { region: 'Paraguay', currency: 'PYG' },
  { region: 'Bolivia', currency: 'BOB' },
  { region: 'Ecuador', currency: 'USD' },
  { region: 'Venezuela', currency: 'VES' },

  // Africa
  { region: 'South Africa', currency: 'ZAR' },
  { region: 'Nigeria', currency: 'NGN' },
  { region: 'Egypt', currency: 'EGP' },
  { region: 'Kenya', currency: 'KES' },
  { region: 'Ethiopia', currency: 'ETB' },
  { region: 'Ghana', currency: 'GHS' },
  { region: 'Morocco', currency: 'MAD' },
  { region: 'Algeria', currency: 'DZD' },
  { region: 'Tunisia', currency: 'TND' },
  { region: 'Uganda', currency: 'UGX' },
  { region: 'Tanzania', currency: 'TZS' },

  // Oceania
  { region: 'Australia', currency: 'AUD' },
  { region: 'New Zealand', currency: 'NZD' },
  { region: 'Fiji', currency: 'FJD' },
  { region: 'Papua New Guinea', currency: 'PGK' },
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CurrencyRegionBottomSheet({ visible, onClose }: Props) {
  const { currency, updateCurrency } = useSettings();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const [showModal, setShowModal] = useState(visible);
  const [searchQuery, setSearchQuery] = useState('');

  // Find current region by currency or default to Pakistan
  const initialRegion = REGIONS.find(r => r.currency === currency) || REGIONS[0];
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      // Reset state when opening
      setSearchQuery('');
      const currentRegion = REGIONS.find(r => r.currency === currency) || REGIONS[0];
      setSelectedRegion(currentRegion);

      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setShowModal(false);
      });
    }
  }, [visible, slideAnim, currency]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0], // Slide up from bottom
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(1 - gestureState.dy / 600);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          onClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 1,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    })
  ).current;

  const filteredRegions = REGIONS.filter((item) =>
    item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasChanges = selectedRegion.currency !== currency;

  const handleSave = async () => {
    if (hasChanges) {
      await updateCurrency(selectedRegion.currency);
    }
    onClose();
  };

  if (!showModal) return null;

  return (
    <Modal visible={showModal} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[styles.sheetContainer, { transform: [{ translateY }] }]}
          >
                <View style={styles.dragHandle} {...panResponder.panHandlers} />

                <Text style={styles.title}>Currency & Region</Text>

                <View style={styles.previewContainer}>
                  <View style={styles.previewBox}>
                    <Text style={styles.previewLabel}>Region:</Text>
                    <Text style={styles.previewValue}>{selectedRegion.region}</Text>
                  </View>
                  <View style={styles.previewDivider} />
                  <View style={styles.previewBox}>
                    <Text style={styles.previewLabel}>Currency:</Text>
                    <Text style={styles.previewValue}>{selectedRegion.currency}</Text>
                  </View>
                </View>

                <View style={styles.searchContainer}>
                  <MaterialIcons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search region or currency..."
                    placeholderTextColor="#94A3B8"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <MaterialIcons name="close" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                  )}
                </View>

                <FlatList
                  data={filteredRegions}
                  keyExtractor={(item) => item.currency + item.region}
                  style={styles.list}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => {
                    const isSelected = selectedRegion.region === item.region;
                    return (
                      <TouchableOpacity
                        style={[styles.row, isSelected && styles.rowSelected]}
                        onPress={() => setSelectedRegion(item)}
                      >
                        <Text style={[styles.rowText, isSelected && styles.rowTextSelected]}>
                          {item.region} ({item.currency})
                        </Text>
                        {isSelected && (
                          <MaterialIcons name="check" size={20} color="#10B981" />
                        )}
                      </TouchableOpacity>
                    );
                  }}
                />

                <View style={styles.actions}>
                  <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.saveButton, !hasChanges && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={!hasChanges}
                  >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    height: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 24,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
  },
  previewContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  previewBox: {
    flex: 1,
    alignItems: 'center',
  },
  previewDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 16,
  },
  previewLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  previewValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  list: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  rowSelected: {
    backgroundColor: '#ECFDF5',
  },
  rowText: {
    fontSize: 16,
    color: '#1E293B',
  },
  rowTextSelected: {
    fontWeight: '600',
    color: '#065F46',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  saveButton: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
