import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { addGroceryItem } from '@/database/queries';

// Reuse styling constants
const extra = {
  surfaceContainerLow: '#F7F2FA', // Match from tasks/constants.ts roughly or just use colors
  outlineVariant: '#CAC4D0',
  onSurface: '#1D1B20',
  surfaceContainerHigh: '#ECE6F0',
  onPrimary: '#FFFFFF',
};

// ==========================================
// Add Item Modal
// ==========================================
type AddItemModalProps = {
  visible: boolean;
  onClose: () => void;
  onItemAdded: () => void;
  listId: number;
};

export function AddItemModal({ visible, onClose, onItemAdded, listId }: AddItemModalProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState<number | null>(null);
  const [note, setNote] = useState('');

  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      const parsedQuantity = quantity ? parseFloat(quantity) : 1;
      await addGroceryItem(
        listId,
        name.trim(),
        isNaN(parsedQuantity) ? 1 : parsedQuantity,
        unit.trim() || null,
        category,
        note.trim() || null
      );
      onItemAdded();
      handleClose();
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };

  const handleClose = () => {
    setName('');
    setQuantity('');
    setUnit('');
    setNote('');
    setCategory(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>New Grocery Item</Text>
            <TouchableOpacity onPress={handleClose}>
              <MaterialIcons name="close" size={24} color={extra.onSurface} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Apples"
              placeholderTextColor={colors.onSurfaceVariant}
              value={name}
              onChangeText={setName}
            />

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.label}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 2"
                  placeholderTextColor={colors.onSurfaceVariant}
                  value={quantity}
                  keyboardType="numeric"
                  onChangeText={setQuantity}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.label}>Unit (optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. kg, lb"
                  placeholderTextColor={colors.onSurfaceVariant}
                  value={unit}
                  onChangeText={setUnit}
                />
              </View>
            </View>

            <Text style={styles.label}>Note (optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Any details..."
              placeholderTextColor={colors.onSurfaceVariant}
              value={note}
              onChangeText={setNote}
            />

            <TouchableOpacity
              style={[styles.saveBtn, !name.trim() && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={!name.trim()}
            >
              <Text style={styles.saveBtnText}>Save Item</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ==========================================
// Quantity Management Modal
// ==========================================
type BasicModalProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
};

export function PlaceholderModal({ visible, onClose, title }: BasicModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.content, { minHeight: 300 }]}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color={extra.onSurface} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="construction" size={48} color={colors.primaryContainer} style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 16, color: colors.onSurfaceVariant, textAlign: 'center' }}>
              Management screen for {title} will be implemented here.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: extra.onSurface,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    marginBottom: 8,
  },
  input: {
    backgroundColor: extra.surfaceContainerLow,
    borderWidth: 1,
    borderColor: extra.outlineVariant,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: extra.onSurface,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnText: {
    color: extra.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
