import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard';
import { SettingsTopBar } from '@/components/settings/SettingsTopBar';
import { SettingsSection } from '@/components/settings/types';
import AboutPlavioBottomSheet from '@/components/settings/AboutPlavioBottomSheet';
import CurrencyRegionBottomSheet from '@/components/settings/CurrencyRegionBottomSheet';
import PrivacyPolicyBottomSheet from '@/components/settings/PrivacyPolicyBottomSheet';
import { useSettings } from '@/contexts/SettingsContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { currency } = useSettings();
  const [currencySheetVisible, setCurrencySheetVisible] = useState(false);
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);
  const [aboutPlavioVisible, setAboutPlavioVisible] = useState(false);

  const sections: SettingsSection[] = [
    {
      key: 'appearance',
      rows: [
        {
          icon: 'dark-mode',
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark themes',
        },
      ],
    },
    {
      key: 'notifications',
      rows: [
        {
          icon: 'notifications',
          title: 'Push Notifications',
          subtitle: 'Manage alerts and daily reminders',
        },
      ],
    },
    {
      key: 'regional',
      rows: [
        {
          icon: 'currency-exchange',
          title: 'Currency & Region',
          subtitle: `Current: ${currency}`,
          onPress: () => setCurrencySheetVisible(true),
        },
      ],
    },
    {
      key: 'appInfo',
      rows: [
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    gap: 24,
  },
});