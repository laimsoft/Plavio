import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

type Props = {
  search: string;
  onSearchChange: (text: string) => void;
};

export default function BillsHeader({ search, onSearchChange }: Props) {
  return (
    <>
      <Text style={styles.pageTitle}>Bills & Subscriptions</Text>
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={22} color={colors.outline} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bills..."
          placeholderTextColor={colors.outline}
          value={search}
          onChangeText={onSearchChange}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    color: colors.onSurface,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 48,
    paddingHorizontal: 12,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceVariant,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurface,
    padding: 0,
  },
});
