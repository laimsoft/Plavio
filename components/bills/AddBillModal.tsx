import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

interface AddBillModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, category: string, amount: number, dueDate: string, repeatType: string, status: string) => void;
  initialData?: {
    id: string;
    name: string;
    category: string;
    amount: number;
    dueDate: string;
    repeatType: string;
    status: string;
  } | null;
}

const PRESET_CATEGORIES = ['Bills', 'Subscription'];

export default function AddBillModal({ visible, onClose, onSave, initialData }: AddBillModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Bills');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [repeatType, setRepeatType] = useState('Monthly');
  const [status, setStatus] = useState('Pending');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  useEffect(() => {
    if (visible) {
      if (initialData) {
        setName(initialData.name);
        setAmount(initialData.amount.toString());
        setDueDate(initialData.dueDate);
        setRepeatType(initialData.repeatType);
        setStatus(initialData.status);
        
        if (PRESET_CATEGORIES.includes(initialData.category)) {
          setCategory(initialData.category);
          setIsAddingCategory(false);
          setCustomCategory('');
        } else {
          setCategory('');
          setIsAddingCategory(true);
          setCustomCategory(initialData.category);
        }
      } else {
        setName('');
        setCategory('Bills');
        setAmount('');
        setDueDate('');
        setRepeatType('Monthly');
        setStatus('Pending');
        setIsAddingCategory(false);
        setCustomCategory('');
      }
    }
  }, [visible, initialData]);

  const handleSave = () => {
    const finalCategory = isAddingCategory && customCategory.trim() !== '' ? customCategory.trim() : category;
    if (!name || !finalCategory || !amount || !dueDate) {
      // Basic validation
      return;
    }
    onSave(name, finalCategory, parseFloat(amount), dueDate, repeatType, status);
    setName('');
    setCategory('Bills');
    setCustomCategory('');
    setIsAddingCategory(false);
    setAmount('');
    setDueDate('');
    setRepeatType('Monthly');
    setStatus('Pending');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>
        
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{initialData ? 'Edit Bill' : 'Add New Bill'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Bill Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Electricity Bill"
              placeholderTextColor={colors.onSurfaceVariant}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.categoriesContainer}>
              {PRESET_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    category === cat && !isAddingCategory && styles.categoryChipActive,
                  ]}
                  onPress={() => {
                    setCategory(cat);
                    setIsAddingCategory(false);
                  }}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat && !isAddingCategory && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[
                  styles.categoryChip,
                  isAddingCategory && styles.categoryChipActive,
                ]}
                onPress={() => setIsAddingCategory(true)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isAddingCategory && styles.categoryChipTextActive,
                  ]}
                >
                  + Add
                </Text>
              </TouchableOpacity>
            </View>

            {isAddingCategory && (
              <TextInput
                style={styles.input}
                placeholder="Custom category"
                placeholderTextColor={colors.onSurfaceVariant}
                value={customCategory}
                onChangeText={setCustomCategory}
              />
            )}

            <Text style={styles.label}>Status</Text>
            <View style={styles.categoriesContainer}>
              {['Pending', 'Paid'].map((st) => (
                <TouchableOpacity
                  key={st}
                  style={[
                    styles.categoryChip,
                    status === st && styles.categoryChipActive,
                  ]}
                  onPress={() => setStatus(st)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      status === st && styles.categoryChipTextActive,
                    ]}
                  >
                    {st === 'Pending' ? 'Unpaid' : 'Paid'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor={colors.onSurfaceVariant}
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                />

                <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={colors.onSurfaceVariant}
                  value={dueDate}
                  onChangeText={setDueDate}
                />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>Save Bill</Text>
                </TouchableOpacity>
              </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.onSurface,
  },
  closeBtn: {
    padding: 4,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurface,
    marginBottom: -8,
  },
  input: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.onSurfaceVariant,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
});
