import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Transaction = {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  date: string;
  tag: string;
  amount: number;
};

const getStyleForTag = (tag: string) => {
  switch (tag) {
    case 'Budget':
      return { iconBg: '#f5f3ff', iconColor: '#a855f7', amountColor: '#059669', tagBg: '#f3e8ff', tagColor: '#9333ea' };
    case 'Expense':
      return { iconBg: '#fef2f2', iconColor: '#f87171', amountColor: '#ef4444', tagBg: '#fee2e2', tagColor: '#ef4444' };
    case 'Transfer':
      return { iconBg: '#f0fdfa', iconColor: '#14b8a6', amountColor: '#2563eb', tagBg: '#ccfbf1', tagColor: '#0d9488' };
    case 'Saving':
      return { iconBg: '#eff6ff', iconColor: '#3b82f6', amountColor: '#059669', tagBg: '#dbeafe', tagColor: '#2563eb' };
    default:
      return { iconBg: '#f3f4f6', iconColor: '#9ca3af', amountColor: '#374151', tagBg: '#f3f4f6', tagColor: '#374151' };
  }
};

export function RecentTransactions({ transactions, formatCurrency, onSeeAllPress }: { transactions: Transaction[], formatCurrency: (value: number) => string, onSeeAllPress?: () => void }) {
  return (
    <View style={styles.transactionsSection}>
      <View style={styles.transactionsHeaderRow}>
        <Text style={styles.cardTitle}>Recent Transactions</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onSeeAllPress}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {transactions.map((tx, index) => {
          const style = getStyleForTag(tx.tag);
          const isLast = index === transactions.length - 1;
          return (
            <View key={tx.id} style={[styles.transactionCard, isLast && { borderBottomWidth: 0 }]}>
              <View style={[styles.transactionLeft, { flex: 1 }]}>
                <View style={[styles.transactionIconCircle, { backgroundColor: style.iconBg }]}>
                  <MaterialIcons
                    name={tx.icon}
                    size={20}
                    color={style.iconColor}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.transactionTitle} numberOfLines={1}>{tx.title}</Text>
                  <Text style={styles.transactionDate}>{tx.date}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={[styles.transactionAmount, { color: style.amountColor }]}>
                  {tx.amount < 0 ? '-' : ''}{formatCurrency(Math.abs(tx.amount))}
                </Text>
                <View style={[styles.tagPill, { backgroundColor: style.tagBg }]}>
                  <Text style={[styles.tagPillText, { color: style.tagColor }]}>{tx.tag}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionsSection: {
    gap: 16,
    paddingBottom: 20,
  },
  transactionsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
  listContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    overflow: 'hidden',
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 12,
  },
  transactionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  tagPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  tagPillText: {
    fontSize: 10,
    fontWeight: '500',
  },
});
