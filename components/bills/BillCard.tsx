import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Bill } from './types';
import { useSettings } from '../../contexts/SettingsContext';

type Props = {
  bill: Bill;
  onEdit?: (billId: string) => void;
  onDelete?: (billId: string) => void;
  onToggleStatus?: (billId: string, newStatus: string) => void;
};

export default function BillCard({ bill, onEdit, onDelete, onToggleStatus }: Props) {
  const { formatCurrency } = useSettings();
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

  const statusColor = isPaid ? '#12D18E' : '#FF4267';
  
  // Format the date string from 2025-05-02 to May 2, 2025
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const displayDate = formatDate(bill.date);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleCardPress}
      style={styles.cardWrapper}
    >
      <View style={[styles.cardContainer, isPaid && styles.cardContainerPaid]}>
        <View style={[styles.strip, { backgroundColor: statusColor }]} />
        
        <View style={styles.cardInner}>
          <View style={styles.leftCol}>
            <View style={[styles.iconBox, bill.iconBg ? { backgroundColor: bill.iconBg } : null]}>
              <MaterialIcons name={bill.icon} size={28} color={bill.iconColor || '#444'} />
            </View>
            
            <View style={styles.middleCol}>
              <Text style={styles.title} numberOfLines={1}>{bill.title}</Text>
              
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {isPaid ? 'Paid' : 'Unpaid'}
                </Text>
              </View>
              
              <View style={styles.dateRow}>
                <MaterialIcons name="calendar-today" size={12} color="#888" />
                <Text style={styles.dateText}>
                  {`${isPaid ? 'Paid on' : 'Due on'} ${displayDate}`}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.rightCol}>
            <View style={styles.amountRow}>
              <Text style={styles.amountText}>{formatCurrency(bill.amount)}</Text>
              <MaterialIcons name="chevron-right" size={20} color="#888" style={{marginLeft: 4}} />
            </View>
            
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionBtnEdit} onPress={() => onEdit && onEdit(bill.id)}>
                <MaterialIcons name="edit" size={16} color="#12D18E" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.actionBtnDelete} onPress={handleDelete}>
                <MaterialIcons name="delete-outline" size={16} color="#FF4267" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    marginBottom: 4,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardContainerPaid: {
    opacity: 0.85,
  },
  strip: {
    width: 5,
  },
  cardInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  leftCol: {
    flexDirection: 'row',
    flex: 1,
    gap: 16,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleCol: {
    justifyContent: 'center',
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  actionBtnEdit: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8FAF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnDelete: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFEBF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

