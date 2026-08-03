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
        <View style={styles.iconCircle}>
          <MaterialIcons name={row.icon} size={20} color="#10b981" />
        </View>
        <View style={styles.rowText}>
          <Text style={styles.rowTitle} numberOfLines={1}>{row.title}</Text>
          <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
        </View>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={22}
        color="#cbd5e1"
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
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexShrink: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flexShrink: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
});
