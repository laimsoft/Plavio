import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface BillsFabProps {
  onPress?: () => void;
}

export default function BillsFab({ onPress }: BillsFabProps) {
  return (
    <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={onPress}>
      <MaterialIcons name="add" size={32} color="#ffffff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 110,
    marginBottom: 16,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#1DD59C',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1DD59C',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
