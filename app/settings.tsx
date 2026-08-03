import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Linking, Platform } from 'react-native';

import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard';
import { SettingsTopBar } from '@/components/settings/SettingsTopBar';
import { SettingsSection } from '@/components/settings/types';
import AboutPlavioBottomSheet from '@/components/settings/AboutPlavioBottomSheet';
import CurrencyRegionBottomSheet from '@/components/settings/CurrencyRegionBottomSheet';
import PrivacyPolicyBottomSheet from '@/components/settings/PrivacyPolicyBottomSheet';
import ClearAccountsModal from '@/components/settings/ClearAccountsModal';
import { useSettings } from '@/contexts/SettingsContext';
import { clearAccountsData } from '@/database/queries';

export default function SettingsScreen() {
  const router = useRouter();
  const { currency } = useSettings();
  const [currencySheetVisible, setCurrencySheetVisible] = useState(false);
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);
  const [aboutPlavioVisible, setAboutPlavioVisible] = useState(false);
  const [clearAccountsVisible, setClearAccountsVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleClearAccounts = async () => {
    try {
      await clearAccountsData();
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    } catch (error) {
      console.error('Failed to clear accounts data', error);
    }
  };

  const handleRateUs = () => {
    const androidPackageName = 'com.plavio';
    const playStoreUrl = `market://details?id=${androidPackageName}`;
    const playStoreWebUrl = `https://play.google.com/store/apps/details?id=${androidPackageName}`;

    if (Platform.OS === 'android') {
      Linking.canOpenURL(playStoreUrl).then((supported) => {
        if (supported) {
          Linking.openURL(playStoreUrl);
        } else {
          Linking.openURL(playStoreWebUrl);
        }
      }).catch((err) => console.error('An error occurred', err));
    } else {
      // Fallback for non-Android platforms, opening a web URL
      Linking.openURL(playStoreWebUrl).catch((err) => console.error('An error occurred', err));
    }
  };

  const sections: SettingsSection[] = [
    {
      key: 'regional',
      rows: [
        {
          icon: 'currency-exchange',
          title: 'Currency & Region',
          subtitle: `Current: ${currency}`,
          onPress: () => setCurrencySheetVisible(true),
        },
        {
          icon: 'delete-forever',
          title: 'Clear Accounts',
          subtitle: 'Wipes all account data completely',
          onPress: () => setClearAccountsVisible(true),
        },
      ],
    },
    {
      key: 'appInfo',
      rows: [
        {
          icon: 'star',
          title: 'Rate Us',
          subtitle: 'Rate Plavio on Google Play',
          onPress: handleRateUs,
        },
        {
          icon: 'shield',
          title: 'Privacy Policy',
          subtitle: 'Review how we handle your data',
          onPress: () => setPrivacyPolicyVisible(true),
        },
        {
          icon: 'info',
          title: 'About Plavio',
          subtitle: 'Version 1.0.0',
          onPress: () => setAboutPlavioVisible(true),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <SettingsTopBar />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <SettingsSectionCard key={section.key} section={section} />
        ))}
      </ScrollView>

      <CurrencyRegionBottomSheet
        visible={currencySheetVisible}
        onClose={() => setCurrencySheetVisible(false)}
      />

      <PrivacyPolicyBottomSheet
        visible={privacyPolicyVisible}
        onClose={() => setPrivacyPolicyVisible(false)}
      />

      <AboutPlavioBottomSheet
        visible={aboutPlavioVisible}
        onClose={() => setAboutPlavioVisible(false)}
      />

      <ClearAccountsModal
        visible={clearAccountsVisible}
        onClose={() => setClearAccountsVisible(false)}
        onConfirm={handleClearAccounts}
      />

      {toastVisible && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Accounts Cleared Successfully</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },
  content: {
    padding: 16,
    gap: 24,
  },
  toast: {
    position: 'absolute',
    bottom: 130,
    alignSelf: 'center',
    backgroundColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  toastText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});