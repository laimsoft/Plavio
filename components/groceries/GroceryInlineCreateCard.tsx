import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  initialName?: string;
  initialQuantity?: string;
  initialUnit?: string;
  onSave: (name: string, quantity: string, unit: string) => void;
  onCancel: () => void;
};

export default function GroceryInlineCreateCard({ 
  initialName = '', 
  initialQuantity = '1', 
  initialUnit = '', 
  onSave, 
  onCancel 
}: Props) {
  const [name, setName] = useState(initialName);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [unit, setUnit] = useState(initialUnit);

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
        <MaterialIcons name="close" size={16} color="#64748B" />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <View style={styles.inputsGroup}>
          <TextInput
            style={styles.nameInput}
            placeholder="Item name..."
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <View style={styles.row}>
            <TextInput
              style={styles.quantityInput}
              placeholder="Qty (e.g. 1)"
              placeholderTextColor="#94A3B8"
              value={quantity}
              keyboardType="numeric"
              onChangeText={setQuantity}
            />
            <TextInput
              style={styles.unitInput}
              placeholder="Unit (e.g. kg)"
              placeholderTextColor="#94A3B8"
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
          <MaterialIcons name="check" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#0CD2DB', 
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#0CD2DB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cancelBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
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
    color: '#1E293B',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  quantityInput: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 2,
  },
  unitInput: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 2,
  },
  saveBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
});
