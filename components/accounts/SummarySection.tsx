import { StyleSheet, View } from 'react-native';
import { StatCard } from './StatCard';
import { colors } from '../../constants/colors';

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
  onSavingPress
}: { 
  data: SummaryData; 
  formatCurrency: (value: number) => string;
  onExpensePress?: () => void;
  onBudgetPress?: () => void;
  onSavingPress?: () => void;
}) {
  return (
    <View style={styles.summaryGrid}>
      <StatCard
        icon="account-balance-wallet"
        iconBg={colors.primaryContainer}
        iconColor={colors.onPrimaryContainer}
        label="Total Budget"
        value={formatCurrency(data.totalBudget)}
        onPress={onBudgetPress}
      />
      <StatCard
        icon="savings"
        iconBg={colors.surfaceVariant}
        iconColor={colors.onSurface}
        label="Remaining"
        value={formatCurrency(data.remaining)}
        valueColor={colors.primary}
      />
      <StatCard
        icon="trending-down"
        iconBg={colors.errorContainer}
        iconColor={colors.onErrorContainer}
        label="Expenses"
        value={formatCurrency(data.expenses)}
        onPress={onExpensePress}
      />
      <StatCard
        icon="payments"
        iconBg={colors.secondaryContainer}
        iconColor={colors.onSecondaryContainer}
        label="Savings"
        value={formatCurrency(data.savings)}
        onPress={onSavingPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
