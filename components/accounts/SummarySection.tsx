import { StyleSheet, View } from 'react-native';
import { StatCard } from './StatCard';

type SummaryData = {
  totalBudget: number;
  remaining: number;
  expenses: number;
  savings: number;
};

export function SummarySection({ 
  data, 
  formatCurrency,
  onExpensePress,
  onBudgetPress,
  onSavingsPress,
}: { 
  data: SummaryData; 
  formatCurrency: (value: number) => string;
  onExpensePress?: () => void;
  onBudgetPress?: () => void;
  onSavingsPress?: () => void;
}) {
  return (
    <View style={styles.summaryGrid}>
      <StatCard
        icon="wallet"
        iconBg="#f5f3ff"
        iconColor="#a855f7"
        label="Total Budget"
        value={formatCurrency(data.totalBudget)}
        onPress={onBudgetPress}
      />
      <StatCard
        icon="savings"
        iconBg="#ecfdf5"
        iconColor="#10b981"
        label="Remaining"
        value={formatCurrency(data.remaining)}
        valueColor="#059669"
      />
      <StatCard
        icon="trending-down"
        iconBg="#fef2f2"
        iconColor="#f87171"
        label="Expenses"
        value={formatCurrency(data.expenses)}
        valueColor="#ef4444"
        onPress={onExpensePress}
      />
      <StatCard
        icon="account-balance"
        iconBg="#eff6ff"
        iconColor="#3b82f6"
        label="Savings"
        value={formatCurrency(data.savings)}
        valueColor="#2563eb"
        onPress={onSavingsPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
});
