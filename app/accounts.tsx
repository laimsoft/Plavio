import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  InteractionManager,
} from 'react-native';
import { RecentTransactions, Transaction } from '../components/accounts/RecentTransactions';
import { SummarySection } from '../components/accounts/SummarySection';
import { EditAccountModal } from '../components/accounts/EditAccountModal';
import { colors } from '../constants/colors';
import { getAccountTransactions, AccountTransactionRow } from '../database/queries';

const mapRowToTransaction = (row: AccountTransactionRow): Transaction => {
  return {
    id: String(row.id),
    icon: 'receipt', // Default icon
    title: row.transaction_name,
    date: row.transaction_date,
    tag: row.transaction_type,
    amount: row.transaction_type === 'Expense' ? -row.amount : row.amount,
  };
};

const formatCurrency = (value: number) =>
  `£${Math.abs(value).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function AccountsScreen() {
  const router = useRouter();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalBudget: 0,
    remaining: 0,
    expenses: 0,
    savings: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        const loadData = async () => {
          try {
            const rows = await getAccountTransactions();
            
            let totalBudget = 0;
            let expenses = 0;
            let savings = 0;

            rows.forEach((row) => {
              if (row.transaction_type === 'Budget') totalBudget += row.amount;
              else if (row.transaction_type === 'Expense') expenses += row.amount;
              else if (row.transaction_type === 'Saving') savings += row.amount;
            });

            setSummary({
              totalBudget,
              expenses,
              savings,
              remaining: totalBudget - expenses - savings,
            });

            setTransactions(rows.slice(0, 5).map(mapRowToTransaction));
          } catch (error) {
            console.error("Failed to load accounts data", error);
          }
        };

        loadData();
      });
      return () => task.cancel();
    }, [])
  );

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
          data={summary}
          formatCurrency={formatCurrency}
          onExpensePress={() => router.push({ pathname: '/transactions', params: { type: 'Expense' } })}
          onBudgetPress={() => router.push({ pathname: '/transactions', params: { type: 'Budget' } })}
          onSavingPress={() => router.push({ pathname: '/transactions', params: { type: 'Saving' } })}
        />

        {/* Recent Transactions */}
        <RecentTransactions transactions={transactions} formatCurrency={formatCurrency} />

        {/* Spacer so content clears the FAB */}
        <View style={{ height: 72 }} />
      </ScrollView>

      {/* Contextual FAB */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.85}
        onPress={() => router.push('/add-transaction' as any)}
      >
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