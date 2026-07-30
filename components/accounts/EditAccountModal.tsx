import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
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
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showModal, setShowModal] = useState(visible);

  const keyboardVisibleRef = useRef(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => { keyboardVisibleRef.current = true; });
    const hideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => { keyboardVisibleRef.current = false; });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.spring(slideAnim, { toValue: 1, useNativeDriver: true, bounciness: 4 })
      ]).start();
    } else {
      const animateClose = () => {
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 250, useNativeDriver: true })
        ]).start(() => {
          setShowModal(false);
          setView('menu');
        });
      };

      if (keyboardVisibleRef.current) {
        Keyboard.dismiss();
        setTimeout(animateClose, Platform.OS === 'ios' ? 250 : 150);
      } else {
        animateClose();
      }
    }
  }, [visible, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const backdropOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  if (!showModal) return null;

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
      visible={showModal}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000', opacity: backdropOpacity }]} />
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%' }}
        >
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
            {renderContent()}
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FAFBFF',
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
