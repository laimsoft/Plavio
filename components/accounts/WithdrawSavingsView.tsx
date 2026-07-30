import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/colors';
import { useSettings } from '../../contexts/SettingsContext';

type WithdrawSavingsViewProps = {
  initialSavings: number;
  onSave: (newSavings: number) => void;
  onBack: () => void;
};

export function WithdrawSavingsView({ initialSavings, onSave, onBack }: WithdrawSavingsViewProps) {
  const [amount, setAmount] = useState('');
  const { formatCurrency } = useSettings();

  const handleSave = () => {
    const parsedAmount = parseFloat(amount) || 0;
    onSave(parsedAmount);
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={styles.title}>Withdraw Savings</Text>
        <View style={styles.iconBtn} />
      </View>

      <Text style={styles.currentAmountText}>
        Current Savings: {formatCurrency(initialSavings)}
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount to Withdraw</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor={colors.onSurfaceVariant}
          autoFocus
        />
      </View>

      <TouchableOpacity onPress={handleSave} style={{ marginTop: 8 }}>
        <LinearGradient
          colors={['#10B981', '#06B6D4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.saveBtn}
        >
          <Text style={styles.saveBtnText}>Withdraw</Text>
        </LinearGradient>
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
  currentAmountText: {
    fontSize: 16,
    color: colors.onSurfaceVariant,
    marginBottom: 24,
    fontWeight: '500',
    textAlign: 'center',
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
    borderRadius: 100,
    padding: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
