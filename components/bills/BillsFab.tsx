import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface BillsFabProps {
  onPress?: () => void;
}

export default function BillsFab({ onPress }: BillsFabProps) {
  return (
    <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={onPress}>
      <MaterialIcons name="add" size={24} color={colors.onPrimaryContainer} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
