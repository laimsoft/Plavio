import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

type AddExpenseViewProps = {
  onSave: (name: string, amount: number) => void;
  onBack: () => void;
};

export function AddExpenseView({ onSave, onBack }: AddExpenseViewProps) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSave = () => {
    const parsedAmount = parseFloat(amount) || 0;
    const finalName = name.trim() || 'Expense';
    if (parsedAmount > 0) {
      onSave(finalName, parsedAmount);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Expense</Text>
        <View style={styles.iconBtn} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Expense Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Groceries"
          placeholderTextColor={colors.onSurfaceVariant}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor={colors.onSurfaceVariant}
        />
      </View>

      <TouchableOpacity 
        style={[styles.saveBtn, (!amount || !name.trim()) && styles.saveBtnDisabled]} 
        onPress={handleSave}
        disabled={!amount || !name.trim()}
      >
        <Text style={styles.saveBtnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.onSurface,
  },
  iconBtn: {
    padding: 4,
    width: 32,
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.onSurface,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
