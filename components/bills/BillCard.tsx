import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { Bill, STATUS_COLOR, STRIP_COLOR } from './types';
import { useSettings } from '@/contexts/SettingsContext';

type Props = {
  bill: Bill;
  currency: string;
  onEdit?: (billId: string) => void;
  onDelete?: (billId: string) => void;
  onToggleStatus?: (billId: string, newStatus: string) => void;
};

const formatCurrency = (value: number, currency: string) =>
  `${currency}${value.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function BillCard({ bill, currency, onEdit, onDelete, onToggleStatus }: Props) {
  const isPaid = bill.status === 'paid';
  const isOverdue = bill.status === 'overdue';

  const handleDelete = () => {
    Alert.alert(
      'Delete Bill',
      `Are you sure you want to delete "${bill.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => onDelete && onDelete(bill.id) 
        },
      ]
    );
  };

  const handleCardPress = () => {
    if (onToggleStatus) {
      onToggleStatus(bill.id, isPaid ? 'Pending' : 'Paid');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleCardPress}
      style={[
        styles.billCard,
        isPaid && styles.billCardPaid,
        isOverdue && styles.billCardOverdue,
      ]}
    >
      <View style={[styles.billStrip, { backgroundColor: STRIP_COLOR[bill.status] }]} />
      
      <View style={styles.billContent}>
        <View style={styles.billTopRow}>
          <View style={styles.billLeft}>
            <View style={[styles.billIconBox, bill.iconBg ? { backgroundColor: bill.iconBg } : null]}>
              <MaterialIcons name={bill.icon} size={24} color={bill.iconColor || colors.onSurface} />
            </View>
            <View style={{ justifyContent: 'center' }}>
              <Text style={[styles.billTitle, isPaid && styles.billTitlePaid]} numberOfLines={1}>
                {bill.title}
              </Text>
            </View>
          </View>
          
          <View style={styles.billRight}>
            <Text style={styles.billAmount}>{formatCurrency(bill.amount, currency)}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.billBottomRow}>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: STATUS_COLOR[bill.status] }]} />
            <Text
              style={[
                styles.billStatusText,
                { color: isPaid ? STATUS_COLOR[bill.status] : 'red' },
                !isPaid && { fontWeight: '700' },
              ]}
            >
              {bill.statusText}
            </Text>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => onEdit && onEdit(bill.id)}>
              <MaterialIcons name="edit" size={18} color={colors.onSurfaceVariant} />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
              <MaterialIcons name="delete-outline" size={18} color={colors.error} />
              <Text style={[styles.actionText, { color: colors.error }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  billCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  billCardPaid: {
    opacity: 0.7,
  },
  billCardOverdue: {
    borderColor: 'rgba(239, 68, 68, 0.4)',
    borderWidth: 1.5,
  },
  billStrip: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
  },
  billContent: {
    paddingLeft: 22,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  billTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  billLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  billIconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(196, 197, 216, 0.3)',
  },
  billTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 4,
  },
  billTitlePaid: {
    textDecorationLine: 'line-through',
    color: colors.outline,
  },
  billRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  billAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surfaceVariant,
    marginBottom: 12,
  },
  billBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  billStatusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 6,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
});
