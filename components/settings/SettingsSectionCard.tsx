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
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceVariant,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
});
