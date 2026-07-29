import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';

type Props = {
  onSave: (name: string, quantity: string, unit: string) => void;
  onCancel: () => void;
};

export default function GroceryInlineCreateCard({ onSave, onCancel }: Props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('');

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim(), quantity.trim(), unit.trim());
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cancelBtn}
        activeOpacity={0.7}
        onPress={onCancel}
      >
        <MaterialIcons name="close" size={16} color={colors.onSurfaceVariant} />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <View style={styles.inputsGroup}>
          <TextInput
            style={styles.nameInput}
            placeholder="Item name..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <View style={styles.row}>
            <TextInput
              style={styles.quantityInput}
              placeholder="Qty (e.g. 1)"
              placeholderTextColor={colors.onSurfaceVariant}
              value={quantity}
              keyboardType="numeric"
              onChangeText={setQuantity}
            />
            <TextInput
              style={styles.unitInput}
              placeholder="Unit (e.g. kg)"
              placeholderTextColor={colors.onSurfaceVariant}
              value={unit}
              onChangeText={setUnit}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, !name.trim() && styles.saveBtnDisabled]}
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={!name.trim()}
        >
          <MaterialIcons name="check" size={24} color={colors.onPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.primary, // Highlight border to show it's being edited
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  cancelBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  inputsGroup: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  nameInput: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.onSurface,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  quantityInput: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingBottom: 2,
  },
  unitInput: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    paddingBottom: 2,
  },
  saveBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
});
