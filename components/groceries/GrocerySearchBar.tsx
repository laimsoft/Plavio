import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  search: string;
  onSearchChange: (text: string) => void;
};

export default function GrocerySearchBar({ search, onSearchChange }: Props) {
  return (
    <View style={styles.searchBar}>
      <MaterialIcons name="search" size={20} color="#94A3B8" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search items..."
        placeholderTextColor="#94A3B8"
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
    borderColor: '#E8F5F5',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#1E293B',
    padding: 0,
  },
});
