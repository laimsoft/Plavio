import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  InteractionManager,
  Text,
} from 'react-native';
import { RecentTransactions, Transaction } from '../components/accounts/RecentTransactions';
import { SummarySection } from '../components/accounts/SummarySection';
import { EditAccountModal } from '../components/accounts/EditAccountModal';
import { useSettings } from '../contexts/SettingsContext';
import { getAccountTransactions, AccountTransactionRow, insertAccountTransaction } from '../database/queries';

const mapRowToTransaction = (row: AccountTransactionRow): Transaction => {
  let icon = 'receipt';
  if (row.transaction_type === 'Budget') icon = 'assignment';
  else if (row.transaction_type === 'Expense') icon = 'smartphone';
  else if (row.transaction_type === 'Saving') icon = 'savings';
  else if (row.transaction_type === 'Transfer') icon = 'swap-horiz';

  return {
    id: String(row.id),
    icon: icon as any,
    title: row.transaction_name,
    date: row.transaction_date,
    tag: row.transaction_type,
    amount: row.transaction_type === 'Expense' ? -row.amount : row.amount,
  };
};

export default function AccountsScreen() {
  const router = useRouter();
  const { formatCurrency } = useSettings();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({
    totalBudget: 0,
    remaining: 0,
    expenses: 0,
    savings: 0,
  });

  const loadData = useCallback(async () => {
    try {
      const rows = await getAccountTransactions();
      
      let totalBudget = 0;
      let expenses = 0;
      let savings = 0;

      rows.forEach((row) => {
        if (row.transaction_type === 'Budget') totalBudget += row.amount;
        else if (row.transaction_type === 'Expense') expenses += row.amount;
        else if (row.transaction_type === 'Saving') savings += row.amount;
        else if (row.transaction_type === 'Transfer') savings -= row.amount; // Withdraw Saving
      });

      setSummary({
        totalBudget,
        expenses,
        savings,
        remaining: totalBudget - expenses - savings,
      });

      setTransactions(rows.slice(0, 4).map(mapRowToTransaction));
    } catch (error) {
      console.error("Failed to load accounts data", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        loadData();
      });
      return () => task.cancel();
    }, [loadData])
  );

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleAddTransaction = async (name: string, type: 'Budget' | 'Saving' | 'Transfer' | 'Expense', amount: number) => {
    if (amount <= 0) return;
    try {
      const today = new Date().toISOString().split('T')[0];
      await insertAccountTransaction(name, type, amount, today, 'Via Update Account Modal');
      await loadData(); // Refresh data
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };



  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>Total Balance</Text>
          <Text style={styles.heroBalance}>{formatCurrency(summary.totalBudget)}</Text>
          <View style={styles.heroPill}>
            <MaterialIcons name="arrow-upward" size={12} color="#047857" />
            <Text style={styles.heroPillText}>12% vs last month</Text>
          </View>
        </View>

        {/* Summary Section (Bento Grid) */}
        <SummarySection
          data={summary}
          formatCurrency={formatCurrency}
          onExpensePress={() => router.push({ pathname: '/transactions' as any, params: { type: 'Expense' } })}
          onBudgetPress={() => router.push({ pathname: '/transactions' as any, params: { type: 'Budget' } })}
          onSavingsPress={() => router.push({ pathname: '/transactions' as any, params: { type: 'Saving' } })}
        />

        {/* Recent Transactions */}
        <RecentTransactions 
          transactions={transactions} 
          formatCurrency={formatCurrency} 
          onSeeAllPress={() => router.push('/transactions')}
        />

        {/* Spacer so content clears the FAB */}
        <View style={{ height: 72 }} />
      </ScrollView>

      {/* Contextual FAB */}
      <TouchableOpacity 
        style={styles.fabContainer} 
        activeOpacity={0.85}
        onPress={() => setIsEditModalVisible(true)}
      >
        <LinearGradient
          colors={['#10B981', '#06B6D4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fab}
        >
          <MaterialIcons name="add" size={24} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>

      <EditAccountModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleAddTransaction}
        initialBudget={summary.totalBudget}
        initialSavings={summary.savings}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 24,
  },
  heroCard: {
    backgroundColor: '#e6f7f5',
    borderRadius: 32,
    padding: 24,
    marginBottom: 8,
  },
  heroLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  heroBalance: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(209, 250, 229, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
    gap: 4,
  },
  heroPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#047857',
  },
  // FAB
  fabContainer: {
    position: 'absolute',
    right: 24,
    bottom: 112,
    width: 56,
    height: 56,
    borderRadius: 16,
    shadowColor: '#06B6D4',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  fab: {
    flex: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});