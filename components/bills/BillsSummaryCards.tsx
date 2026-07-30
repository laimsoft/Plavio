import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type SummaryProps = {
  upcomingAmount: number;
  totalMonthly: number;
  currency: string;
};

export default function BillsSummaryCards({ upcomingAmount, totalMonthly, currency }: SummaryProps) {
  return (
    <View style={styles.summaryGrid}>
      <View style={[styles.summaryCard, styles.upcomingCard]}>
        <View style={styles.headerRow}>
          <View style={[styles.iconCircle, styles.upcomingIconCircle]}>
            <MaterialIcons name="calendar-today" size={16} color="#059669" />
          </View>
          <Text style={styles.label}>{'Upcoming\nPayments'}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{`${currency} ${upcomingAmount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}</Text>
          <Text style={styles.subtitleUpcoming}>Due in 7 days</Text>
        </View>
      </View>

      <View style={[styles.summaryCard, styles.monthlyCard]}>
        <View style={styles.headerRow}>
          <View style={[styles.iconCircle, styles.monthlyIconCircle]}>
            <MaterialIcons name="account-balance-wallet" size={16} color="#2563EB" />
          </View>
          <Text style={styles.label}>{'Total Monthly\nBills'}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{`${currency} ${totalMonthly.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}</Text>
          <Text style={styles.subtitleMonthly}>This Month</Text>
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
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  upcomingCard: {
    backgroundColor: '#F0FDF4',
  },
  monthlyCard: {
    backgroundColor: '#F0F9FF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingIconCircle: {
    backgroundColor: '#DCFCE7',
  },
  monthlyIconCircle: {
    backgroundColor: '#DBEAFE',
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
    color: '#333333',
    flexShrink: 1,
  },
  amountContainer: {
    gap: 4,
  },
  amountText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111111',
  },
  subtitleUpcoming: {
    fontSize: 13,
    fontWeight: '500',
    color: '#059669',
  },
  subtitleMonthly: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3B82F6',
  },
});
