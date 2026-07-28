import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { SettingsRow } from './types';

type Props = {
  row: SettingsRow;
  isLast: boolean;
};

export function SettingsRowItem({ row, isLast }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.row,
        !isLast && styles.rowDivider,
      ]}
      activeOpacity={0.7}
      onPress={row.onPress}
    >
      <View style={styles.rowLeft}>
        <MaterialIcons name={row.icon} size={24} color={colors.primary} />
        <View style={styles.rowText}>
          <Text style={styles.rowTitle}>{row.title}</Text>
          <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
        </View>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={22}
        color={colors.outlineVariant}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceVariant,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexShrink: 1,
  },
  rowText: {
    flexShrink: 1,
  },
  rowTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.onSurface,
  },
  rowSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
