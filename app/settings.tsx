import { colors } from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SettingsSectionCard } from '@/components/settings/SettingsSectionCard';
import { SettingsTopBar } from '@/components/settings/SettingsTopBar';
import { SettingsSection } from '@/components/settings/types';

export default function SettingsScreen() {
  const router = useRouter();

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
          subtitle: 'Set default currency for expenses',
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
        },
        {
          icon: 'info',
          title: 'About LifeHub',
          subtitle: 'Version 2.4.1 (Build 492)',
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