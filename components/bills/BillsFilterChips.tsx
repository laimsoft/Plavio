import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Filter } from './types';

type Props = {
  filters: readonly Filter[];
  activeFilter: Filter;
  onSelectFilter: (filter: Filter) => void;
};

export default function BillsFilterChips({ filters, activeFilter, onSelectFilter }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}
    >
      {filters.map((filter) => {
        const active = filter === activeFilter;
        return (
          <TouchableOpacity
            key={filter}
            style={[styles.chip, active && styles.chipActive]}
            activeOpacity={0.7}
            onPress={() => onSelectFilter(filter)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    gap: 12,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  chipActive: {
    backgroundColor: '#1DD59C',
    borderColor: '#1DD59C',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  chipTextActive: {
    color: '#ffffff',
  },
});
