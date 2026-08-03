import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { useCallback, useState } from 'react';
import { useFocusEffect, useRouter } from 'expo-router';
import { getTasks, getAccountTransactions } from '../../database/queries';
import { useSettings } from '../../contexts/SettingsContext';

export default function SummaryGrid() {
  const router = useRouter();
  const { formatCurrency } = useSettings();
  const [totalTasks, setTotalTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [remaining, setRemaining] = useState(0);

  const loadData = async () => {
    try {
      const tasks = await getTasks();
      setTotalTasks(tasks.length);
      setPendingTasks(tasks.filter(t => t.completed === 0).length);

      const rows = await getAccountTransactions();
      let totalBudget = 0;
      let totalExpenses = 0;
      let savings = 0;

      rows.forEach((row) => {
        if (row.transaction_type === 'Budget') totalBudget += row.amount;
        else if (row.transaction_type === 'Expense') totalExpenses += row.amount;
        else if (row.transaction_type === 'Saving') savings += row.amount;
        else if (row.transaction_type === 'Transfer') savings -= row.amount;
      });

      setExpenses(totalExpenses);
      setRemaining(totalBudget - totalExpenses - savings);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <View style={styles.grid}>
      {/* Stat Card 1 - Budget Remaining */}
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => router.navigate('/accounts')}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: '#e0e7ff' }]}>
            <MaterialIcons name="account-balance-wallet" size={20} color="#6366f1" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.label}>Budget Remaining</Text>
            <Text style={[styles.value, { color: '#4f46e5', fontSize: 14 }]}>
              {formatCurrency(remaining)}
            </Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.caption}>From Budget</Text>
          <View style={styles.detailButton}>
            <MaterialIcons name="chevron-right" size={14} color="#94a3b8" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Stat Card 2 - Total Expenses */}
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => router.navigate('/accounts')}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: '#fee2e2' }]}>
            <MaterialIcons name="credit-card" size={20} color="#ef4444" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.label}>Total Expenses</Text>
            <Text style={[styles.value, { color: '#ef4444', fontSize: 14 }]}>
              {formatCurrency(expenses)}
            </Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.caption}>This Month</Text>
          <View style={[styles.detailButton, { borderColor: '#fca5a5', backgroundColor: '#fef2f2' }]}>
            <MaterialIcons name="chevron-right" size={14} color="#ef4444" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Stat Card 3 - All Time Tasks */}
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => router.navigate('/tasks')}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: '#eff6ff' }]}>
            <MaterialIcons name="format-list-bulleted" size={20} color="#3b82f6" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.label}>All Time Tasks</Text>
            <Text style={styles.value}>{totalTasks}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.caption}>Total Tasks</Text>
          <View style={styles.detailButton}>
            <MaterialIcons name="chevron-right" size={14} color="#94a3b8" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Stat Card 4 - To Do */}
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => router.navigate('/tasks')}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: '#ffedd5' }]}>
            <MaterialIcons name="assignment" size={20} color="#f97316" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.label}>To Do</Text>
            <Text style={styles.value}>{pendingTasks}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.caption}>Pending Tasks</Text>
          <View style={styles.detailButton}>
            <MaterialIcons name="chevron-right" size={14} color="#94a3b8" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 2,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  detailButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
