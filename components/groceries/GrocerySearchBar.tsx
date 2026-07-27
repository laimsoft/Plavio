import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '@/constants/colors';

type Props = {
  search: string;
  onSearchChange: (text: string) => void;
};

export default function GrocerySearchBar({ search, onSearchChange }: Props) {
  return (
    <View style={styles.searchBar}>
      <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        placeholderTextColor={colors.onSurfaceVariant}
        value={search}
        onChangeText={onSearchChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurface,
    padding: 0,
  },
});
