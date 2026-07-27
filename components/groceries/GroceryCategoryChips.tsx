import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';

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
    backgroundColor: colors.surfaceContainer,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  chipTextActive: {
    color: colors.onPrimary,
  },
});
