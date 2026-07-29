import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RecentTransactions, Transaction } from '../components/accounts/RecentTransactions';
import { SummarySection } from '../components/accounts/SummarySection';
import { colors } from '../constants/colors';

// ---- Mock data (swap for real data later) ----
const SUMMARY = {
  totalBudget: 3500.0,
  remaining: 1250.0,
  expenses: 2250.0,
  savings: 500.0,
};

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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Section (Bento Grid) */}
        <SummarySection 
          data={SUMMARY} 
          formatCurrency={formatCurrency} 
          onExpensePress={() => router.push('/expenses')}
        />

        {/* Recent Transactions */}
        <RecentTransactions transactions={TRANSACTIONS} formatCurrency={formatCurrency} />

        {/* Spacer so content clears the FAB */}
        <View style={{ height: 72 }} />
      </ScrollView>

      {/* Contextual FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <MaterialIcons name="add" size={28} color={colors.onPrimary} />
      </TouchableOpacity>
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