import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';
import { AddBudgetView } from './AddBudgetView';
import { AddSavingsView } from './AddSavingsView';
import { WithdrawSavingsView } from './WithdrawSavingsView';
import { AddExpenseView } from './AddExpenseView';

type EditAccountModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string, type: 'Budget' | 'Saving' | 'Transfer' | 'Expense', amount: number) => void;
  initialBudget: number;
  initialSavings: number;
};

export function EditAccountModal({
  visible,
  onClose,
  onSave,
  initialBudget,
  initialSavings,
}: EditAccountModalProps) {
  const [view, setView] = useState<'menu' | 'budget' | 'savings' | 'withdraw-savings' | 'expense'>('menu');

  useEffect(() => {
    if (visible) {
      setView('menu');
    }
  }, [visible]);

  const renderContent = () => {
    switch (view) {
      case 'budget':
        return (
          <AddBudgetView
            initialBudget={initialBudget}
            onSave={(amount) => {
              onSave('Added Budget', 'Budget', amount);
              onClose();
            }}
            onBack={() => setView('menu')}
          />
        );
      case 'savings':
        return (
          <AddSavingsView
            initialSavings={initialSavings}
            onSave={(amount) => {
              onSave('Added Savings', 'Saving', amount);
              onClose();
            }}
            onBack={() => setView('menu')}
          />
        );
      case 'withdraw-savings':
        return (
          <WithdrawSavingsView
            initialSavings={initialSavings}
            onSave={(amount) => {
              onSave('Withdrew Savings', 'Transfer', amount);
              onClose();
            }}
            onBack={() => setView('menu')}
          />
        );
      case 'expense':
        return (
          <AddExpenseView 
            onSave={(name, amount) => {
              onSave(name, 'Expense', amount);
              onClose();
            }}
            onBack={() => setView('menu')} 
          />
        );
      case 'menu':
      default:
        return (
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Update Account</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.menuOption} onPress={() => setView('budget')}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.primaryContainer }]}>
                <MaterialIcons name="account-balance-wallet" size={24} color={colors.onPrimaryContainer} />
              </View>
              <Text style={styles.menuOptionText}>Add Budget</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={() => setView('savings')}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.secondaryContainer }]}>
                <MaterialIcons name="payments" size={24} color={colors.onSecondaryContainer} />
              </View>
              <Text style={styles.menuOptionText}>Add Savings</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={() => setView('withdraw-savings')}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.surfaceVariant }]}>
                <MaterialIcons name="money-off" size={24} color={colors.onSurfaceVariant} />
              </View>
              <Text style={styles.menuOptionText}>Withdraw Savings</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuOption} onPress={() => setView('expense')}>
              <View style={[styles.menuIconContainer, { backgroundColor: colors.errorContainer }]}>
                <MaterialIcons name="trending-down" size={24} color={colors.onErrorContainer} />
              </View>
              <Text style={styles.menuOptionText}>Add Expense</Text>
              <MaterialIcons name="chevron-right" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        );
    }
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
        <View style={styles.modalContainer}>
          {renderContent()}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
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
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceVariant,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.onSurface,
  },
});
