import { MaterialIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

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
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const onDayPress = (day: any) => {
    setDueDate(day.dateString);
    setShowDatePicker(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={{ flexShrink: 1 }}
          >
            <View style={styles.header}>
              <Text style={styles.title}>{initialData ? 'Edit Bill' : 'Add New Bill'}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <MaterialIcons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Bill Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Electricity Bill"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Category</Text>
              <View style={styles.categoriesContainer}>
                {PRESET_CATEGORIES.map((cat) => {
                  const isActive = category === cat && !isAddingCategory;
                  return isActive ? (
                    <TouchableOpacity
                      key={cat}
                      activeOpacity={0.7}
                      onPress={() => {
                        setCategory(cat);
                        setIsAddingCategory(false);
                      }}
                    >
                      <LinearGradient
                        colors={['#10B981', '#06B6D4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.categoryChipActive}
                      >
                        <Text style={styles.categoryChipTextActive}>{cat}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={cat}
                      style={styles.categoryChip}
                      onPress={() => {
                        setCategory(cat);
                        setIsAddingCategory(false);
                      }}
                    >
                      <Text style={styles.categoryChipText}>{cat}</Text>
                    </TouchableOpacity>
                  );
                })}
                {isAddingCategory ? (
                  <TouchableOpacity activeOpacity={0.7} onPress={() => setIsAddingCategory(true)}>
                    <LinearGradient
                      colors={['#10B981', '#06B6D4']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.categoryChipActive}
                    >
                      <Text style={styles.categoryChipTextActive}>+ Add</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.categoryChip}
                    onPress={() => setIsAddingCategory(true)}
                  >
                    <Text style={styles.categoryChipText}>+ Add</Text>
                  </TouchableOpacity>
                )}
              </View>

              {isAddingCategory && (
                <TextInput
                  style={styles.input}
                  placeholder="Custom category"
                  placeholderTextColor="#9CA3AF"
                  value={customCategory}
                  onChangeText={setCustomCategory}
                />
              )}

              <Text style={styles.label}>Status</Text>
              <View style={styles.categoriesContainer}>
                {['Pending', 'Paid'].map((st) => {
                  const isActive = status === st;
                  return isActive ? (
                    <TouchableOpacity
                      key={st}
                      activeOpacity={0.7}
                      onPress={() => setStatus(st)}
                    >
                      <LinearGradient
                        colors={['#10B981', '#06B6D4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.categoryChipActive}
                      >
                        <Text style={styles.categoryChipTextActive}>{st === 'Pending' ? 'Unpaid' : 'Paid'}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      key={st}
                      style={styles.categoryChip}
                      onPress={() => setStatus(st)}
                    >
                      <Text style={styles.categoryChipText}>{st === 'Pending' ? 'Unpaid' : 'Paid'}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor="#9CA3AF"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />

              <Text style={styles.label}>Due Date</Text>
              <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                <Text style={{ color: dueDate ? '#1F2937' : '#9CA3AF', fontSize: 16 }}>
                  {dueDate || 'Select Date'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} onPress={handleSave}>
                <LinearGradient
                    colors={['#10B981', '#06B6D4']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Save Bill</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <TouchableOpacity
          style={styles.datePickerOverlay}
          activeOpacity={1}
          onPress={() => setShowDatePicker(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.datePickerPopup}>
              <Calendar
                current={dueDate || undefined}
                onDayPress={onDayPress}
                markedDates={{
                  [dueDate]: { selected: true, selectedColor: '#10B981' }
                }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#6B7280',
                  selectedDayBackgroundColor: '#10B981',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#06B6D4',
                  dayTextColor: '#1F2937',
                  textDisabledColor: '#D1D5DB',
                  dotColor: '#10B981',
                  selectedDotColor: '#ffffff',
                  arrowColor: '#10B981',
                  monthTextColor: '#1F2937',
                  textDayFontWeight: '500',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '600',
                  textDayFontSize: 14,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 14
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    flexShrink: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
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
    color: '#1F2937',
  },
  closeBtn: {
    padding: 4,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: -8,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  datePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  datePickerPopup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    overflow: 'hidden',
    paddingBottom: 8,
  },
  saveButton: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryChipActive: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
  },
});
