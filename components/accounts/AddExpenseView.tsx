import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

type AddExpenseViewProps = {
  onBack: () => void;
};

export function AddExpenseView({ onBack }: AddExpenseViewProps) {
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
          <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Expense</Text>
        <View style={styles.iconBtn} />
      </View>

      <View style={styles.placeholderContainer}>
        <MaterialIcons name="construction" size={48} color={colors.primary} style={styles.icon} />
        <Text style={styles.placeholderTitle}>Coming Soon</Text>
        <Text style={styles.placeholderText}>The add expense feature is currently under development and will be available in a future update.</Text>
      </View>
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
  placeholderContainer: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
  },
  icon: {
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.onSurface,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
});
