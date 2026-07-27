import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';

export type GroceryItemType = {
  id: string;
  name: string;
  note: string;
  quantity: string;
  category: string;
  checked: boolean;
};

type Props = {
  item: GroceryItemType;
  onToggle: (id: string) => void;
};

export default function GroceryItemCard({ item, onToggle }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onToggle(item.id)}
    >
      <TouchableOpacity
        style={[styles.checkbox, item.checked && styles.checkboxChecked]}
        activeOpacity={0.7}
        onPress={() => onToggle(item.id)}
      >
        {item.checked && <MaterialIcons name="check" size={14} color={colors.onPrimary} />}
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <View style={styles.cardTextGroup}>
          <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>
            {item.name}
          </Text>
          <Text style={styles.itemNote}>{item.note}</Text>
        </View>
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTextGroup: {
    flexDirection: 'column',
    flex: 1,
    paddingRight: 8,
  },
  itemName: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.onSurface,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: colors.onSurfaceVariant,
  },
  itemNote: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
  },
  quantityBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.secondary,
  },
});
