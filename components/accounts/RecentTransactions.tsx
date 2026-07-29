import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';

export type Transaction = {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  date: string;
  tag: string;
  amount: number;
};

export function RecentTransactions({ transactions, formatCurrency }: { transactions: Transaction[], formatCurrency: (value: number) => string }) {
  return (
    <View style={styles.transactionsSection}>
      <View style={styles.transactionsHeaderRow}>
        <Text style={styles.cardTitle}>Recent Transactions</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={{ gap: 8 }}>
        {transactions.map((tx) => (
          <View key={tx.id} style={styles.transactionCard}>
            <View style={styles.transactionLeft}>
              <View style={styles.transactionIconCircle}>
                <MaterialIcons
                  name={tx.icon}
                  size={20}
                  color={colors.onSurfaceVariant}
                />
              </View>
              <View>
                <Text style={styles.transactionTitle}>{tx.title}</Text>
                <View style={styles.transactionMetaRow}>
                  <Text style={styles.transactionMetaText}>{tx.date}</Text>
                  <View style={styles.dot} />
                  <View style={styles.tagPill}>
                    <Text style={styles.tagPillText}>{tx.tag}</Text>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.transactionAmount}>
              {formatCurrency(tx.amount)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.onSurface,
  },
  transactionsSection: {
    gap: 16,
  },
  transactionsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
  },
  seeAllText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: '500',
    color: colors.primary,
  },
  transactionCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceVariant,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.onSurface,
  },
  transactionMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  transactionMetaText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceVariant,
  },
  tagPill: {
    backgroundColor: colors.secondaryContainer,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagPillText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSecondaryContainer,
  },
  transactionAmount: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.error,
  },
});
