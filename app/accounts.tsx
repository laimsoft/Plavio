import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RecentTransactions, Transaction } from '../components/accounts/RecentTransactions';
import { SummarySection } from '../components/accounts/SummarySection';
import { EditAccountModal } from '../components/accounts/EditAccountModal';
import { colors } from '../constants/colors';
import { getAccount, updateAccount, AccountRow } from '../database/queries';

const MOCK_EXPENSES = 2250.0; // Keeping expenses hardcoded for now

const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    icon: 'shopping-cart',
    title: 'Grocery Shopping',
    date: 'Today',
    tag: 'Food',
    amount: -45.0,
  },
  {
    id: '2',
    icon: 'directions-car',
    title: 'Oil Change',
    date: 'Yesterday',
    tag: 'Auto',
    amount: -80.0,
  },
  {
    id: '3',
    icon: 'restaurant',
    title: 'Dinner',
    date: 'Oct 12',
    tag: 'Dining',
    amount: -25.0,
  },
];

const formatCurrency = (value: number) =>
  `£${Math.abs(value).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function AccountsScreen() {
  const router = useRouter();

  const [account, setAccount] = useState<AccountRow | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const fetchAccount = async () => {
    try {
      const data = await getAccount();
      setAccount(data);
    } catch (error) {
      console.error('Failed to fetch account:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAccount();
    }, [])
  );

  const handleSaveAccount = async (budget: number, savings: number) => {
    try {
      await updateAccount(budget, savings);
      await fetchAccount(); // Refresh data
    } catch (error) {
      console.error('Failed to update account:', error);
    }
  };

  const totalBudget = account?.total_budget || 0;
  const savings = account?.total_savings || 0;
  const remaining = Math.max(0, totalBudget - savings - MOCK_EXPENSES);

  const summaryData = {
    totalBudget,
    remaining,
    expenses: MOCK_EXPENSES,
    savings,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Section (Bento Grid) */}
        <SummarySection 
          data={summaryData} 
          formatCurrency={formatCurrency} 
          onExpensePress={() => router.push('/expenses')}
          onBudgetPress={() => setIsEditModalVisible(true)}
          onSavingsPress={() => setIsEditModalVisible(true)}
        />

        {/* Recent Transactions */}
        <RecentTransactions transactions={TRANSACTIONS} formatCurrency={formatCurrency} />

        {/* Spacer so content clears the FAB */}
        <View style={{ height: 72 }} />
      </ScrollView>

      {/* Contextual FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => setIsEditModalVisible(true)}>
        <MaterialIcons name="add" size={28} color={colors.onPrimary} />
      </TouchableOpacity>

      <EditAccountModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleSaveAccount}
        initialBudget={totalBudget}
        initialSavings={savings}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 24,
  },
  // FAB
  fab: {
    position: 'absolute',
    right: 8,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primaryContainer,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});