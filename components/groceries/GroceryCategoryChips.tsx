import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function GroceryCategoryChips({ categories, selectedCategory, onSelectCategory }: Props) {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      contentContainerStyle={styles.chipsRow}
      renderItem={({ item }) => {
        const active = item === selectedCategory;
        return (
          <TouchableOpacity
            style={[styles.chip, active && styles.chipActive]}
            activeOpacity={0.7}
            onPress={() => onSelectCategory(item)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: {
    backgroundColor: '#0CD2DB',
    borderColor: '#0CD2DB',
    shadowColor: '#0CD2DB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  chipText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#64748B',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
