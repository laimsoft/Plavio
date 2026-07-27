import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { Bill, STATUS_COLOR, STRIP_COLOR } from './types';

type Props = {
  bill: Bill;
};

const formatCurrency = (value: number) =>
  `£${value.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function BillCard({ bill }: Props) {
  const isPaid = bill.status === 'paid';
  const isOverdue = bill.status === 'overdue';

  return (
    <View
      style={[
        styles.billCard,
        isPaid && styles.billCardPaid,
        isOverdue && styles.billCardOverdue,
      ]}
    >
      <View style={[styles.billStrip, { backgroundColor: STRIP_COLOR[bill.status] }]} />
      <View
        style={[
          styles.billCardInner,
          isOverdue && styles.billCardInnerOverdue,
        ]}
      >
        <View style={styles.billLeft}>
          <View style={styles.billIconBox}>
            <MaterialIcons name={bill.icon} size={22} color={colors.onSurface} />
          </View>
          <View>
            <Text style={[styles.billTitle, isPaid && styles.billTitlePaid]}>
              {bill.title}
            </Text>
            <View style={styles.billMetaRow}>
              <Text style={styles.billAmount}>{formatCurrency(bill.amount)}</Text>
              <View style={styles.dot} />
              <Text
                style={[
                  styles.billStatusText,
                  { color: STATUS_COLOR[bill.status] },
                  isOverdue && { fontWeight: '700' },
                ]}
              >
                {bill.statusText}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.billRight}>
          <View style={styles.badge}>
            <MaterialIcons
              name={bill.badgeIcon}
              size={12}
              color={colors.onSurface}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.badgeText}>{bill.badgeLabel}</Text>
          </View>
          <Text
            style={[
              styles.billDate,
              isOverdue && { color: colors.error },
            ]}
          >
            {bill.date}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  billCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  billCardPaid: {
    opacity: 0.7,
  },
  billCardOverdue: {
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  billStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
  },
  billCardInner: {
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  billCardInnerOverdue: {
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexShrink: 1,
  },
  billIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(196, 197, 216, 0.3)',
  },
  billTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.onSurface,
  },
  billTitlePaid: {
    textDecorationLine: 'line-through',
    color: colors.outline,
  },
  billMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  billAmount: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
  },
  billStatusText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.outline,
  },
  billRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: colors.surfaceContainerHigh,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurface,
  },
  billDate: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
});
