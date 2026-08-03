import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
import { SettingsSection } from './types';
import { SettingsRowItem } from './SettingsRowItem';

type Props = {
  section: SettingsSection;
};

export function SettingsSectionCard({ section }: Props) {
  return (
    <View style={styles.card}>
      {section.rows.map((row, index) => (
        <SettingsRowItem 
          key={row.title} 
          row={row} 
          isLast={index === section.rows.length - 1} 
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
});
