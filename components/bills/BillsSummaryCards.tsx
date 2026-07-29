import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

type SummaryProps = {
  upcomingAmount: number;
  totalMonthly: number;
  currency: string;
};

export default function BillsSummaryCards({ upcomingAmount, totalMonthly, currency }: SummaryProps) {
  return (
    <View style={styles.summaryGrid}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryIconRow}>
          <View style={styles.summaryIconCircle}>
            <MaterialIcons
              name="schedule"
              size={16}
              color={colors.onSecondaryContainer}
            />
          </View>
          <Text style={styles.summaryLabel}>Upcoming Payments</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.summaryValue}>{currency}{upcomingAmount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</Text>
          <Text style={styles.summarySubtitle}>Due in 7 days</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryIconRow}>
          <View style={styles.summaryIconCircle}>
            <MaterialIcons
              name="payments"
              size={16}
              color={colors.onSecondaryContainer}
            />
          </View>
          <Text style={styles.summaryLabel}>Total Monthly Bills</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.summaryValue}>{currency}{totalMonthly.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</Text>
          <Text style={styles.summarySubtitle}>This Month</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.outlineVariant,
    padding: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  summaryIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  summaryValue: {
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.4,
    fontWeight: '700',
    color: colors.onSurface,
  },
  summarySubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.secondary,
    marginTop: 2,
  },
});
