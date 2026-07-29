import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { getTasks, getAccountTransactions, getAccount } from '../../database/queries';

type SummaryCard = {
  key: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBg: string;
  iconColor: string;
  label: string;
  labelColor?: string;
  value: string;
  valueColor?: string;
  caption: string;
  captionColor?: string;
  primaryBg?: boolean;
};

export default function SummaryGrid() {
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

  const summaryCards: SummaryCard[] = [
    {
      key: 'total_tasks',
      icon: 'format-list-numbered',
      iconBg: colors.primaryContainer,
      iconColor: colors.onPrimaryContainer,
      label: 'All Time',
      value: totalTasks.toString(),
      caption: 'Total Tasks',
    },
    {
      key: 'tasks',
      icon: 'checklist',
      iconBg: colors.tertiaryContainer,
      iconColor: colors.onTertiaryContainer,
      label: 'To Do',
      value: pendingTasks.toString(),
      caption: 'Pending Tasks',
    },
    {
      key: 'expenses',
      icon: 'payments',
      iconBg: colors.errorContainer,
      iconColor: colors.onErrorContainer,
      label: 'Total',
      value: `$${expenses.toFixed(2)}`,
      caption: 'Expenses',
    },
    {
      key: 'budget',
      icon: 'account-balance-wallet',
      iconBg: colors.secondaryContainer,
      iconColor: colors.onSecondaryContainer,
      label: 'Budget',
      value: `$${remaining.toFixed(2)}`,
      caption: 'Remaining',
    },
  ];

  return (
    <View style={styles.grid}>
      {summaryCards.map((card) => (
        <View
          key={card.key}
          style={[styles.card, card.primaryBg && styles.cardPrimary]}
        >
          <View style={styles.cardTopRow}>
            <View style={[styles.cardIconCircle, { backgroundColor: card.iconBg }]}>
              <MaterialIcons name={card.icon} size={16} color={card.iconColor} />
            </View>
            <Text style={[styles.cardLabel, card.labelColor && { color: card.labelColor }]}>
              {card.label}
            </Text>
          </View>
          <View>
            <Text style={[styles.cardValue, card.valueColor && { color: card.valueColor }]}>
              {card.value}
            </Text>
            <Text
              style={[styles.cardCaption, card.captionColor && { color: card.captionColor }]}
            >
              {card.caption}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48.5%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    padding: 16,
    marginBottom: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardPrimary: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  cardValue: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.onSurface,
  },
  cardCaption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
});
