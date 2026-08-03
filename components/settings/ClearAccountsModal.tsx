import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ClearAccountsModal({ visible, onClose, onConfirm }: Props) {
  const [inputText, setInputText] = useState('');

  const handleConfirm = () => {
    if (inputText.trim() === 'Clear Accounts') {
      onConfirm();
      setInputText('');
      onClose();
    }
  };

  const handleClose = () => {
    setInputText('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Clear Accounts</Text>
            <TouchableOpacity onPress={handleClose}>
              <MaterialIcons name="close" size={24} color="#64748b" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.description}>
            This action will wipe all your account data, including budgets, expenses, and savings.
            This action cannot be undone.
          </Text>
          
          <Text style={styles.prompt}>
            Enter the text: <Text style={styles.promptBold}>"Clear Accounts"</Text>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Type 'Clear Accounts' here"
            value={inputText}
            onChangeText={setInputText}
            autoCapitalize="words"
            placeholderTextColor="#9ca3af"
          />

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.confirmButton, 
                inputText.trim() !== 'Clear Accounts' && styles.confirmButtonDisabled
              ]} 
              onPress={handleConfirm}
              disabled={inputText.trim() !== 'Clear Accounts'}
            >
              <Text style={styles.confirmText}>Clear</Text>
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
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ef4444',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
  },
  prompt: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 12,
  },
  promptBold: {
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#f8f9fc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  cancelText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#ef4444',
  },
  confirmButtonDisabled: {
    backgroundColor: '#fca5a5',
  },
  confirmText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
