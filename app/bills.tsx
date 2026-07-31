import { useMemo, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { colors } from '../constants/colors';

import { Filter, FILTERS, Bill } from '@/components/bills/types';
import BillsFilterChips from '@/components/bills/BillsFilterChips';
import BillsSummaryCards from '@/components/bills/BillsSummaryCards';
import BillCard from '@/components/bills/BillCard';
import BillsFab from '@/components/bills/BillsFab';
import AddBillModal from '@/components/bills/AddBillModal';
import { getBills, insertBill, updateBill, deleteBill, updateBillStatus, BillRow, getAccount } from '@/database/queries';
import { MaterialIcons } from '@expo/vector-icons';

const getBillIconInfo = (name: string, category: string): { icon: keyof typeof MaterialIcons.glyphMap; bg: string; color: string } => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('internet') || lowerName.includes('wifi') || lowerName.includes('broadband')) {
    return { icon: 'router', bg: '#E0E7FF', color: '#4F46E5' }; // Indigo
  }
  if (lowerName.includes('electric') || lowerName.includes('power')) {
    return { icon: 'bolt', bg: '#FEF3C7', color: '#D97706' }; // Amber
  }
  if (lowerName.includes('gas') || lowerName.includes('heat')) {
    return { icon: 'local-fire-department', bg: '#FEE2E2', color: '#DC2626' }; // Red
  }
  if (lowerName.includes('water')) {
    return { icon: 'water-drop', bg: '#DBEAFE', color: '#2563EB' }; // Blue
  }
  if (lowerName.includes('phone') || lowerName.includes('mobile')) {
    return { icon: 'phone-iphone', bg: '#F3E8FF', color: '#9333EA' }; // Purple
  }
  if (lowerName.includes('rent') || lowerName.includes('mortgage') || lowerName.includes('home')) {
    return { icon: 'home', bg: '#D1FAE5', color: '#059669' }; // Emerald
  }
  if (lowerName.includes('netflix') || lowerName.includes('movie') || lowerName.includes('tv') || lowerName.includes('stream')) {
    return { icon: 'live-tv', bg: '#FCE7F3', color: '#DB2777' }; // Pink
  }
  if (lowerName.includes('music') || lowerName.includes('spotify') || lowerName.includes('apple')) {
    return { icon: 'music-note', bg: '#DCFCE7', color: '#16A34A' }; // Green
  }
  if (lowerName.includes('gym') || lowerName.includes('fitness')) {
    return { icon: 'fitness-center', bg: '#FFEDD5', color: '#EA580C' }; // Orange
  }

  // Fallbacks
  if (category === 'Subscription') {
    return { icon: 'autorenew', bg: '#F3E8FF', color: '#9333EA' };
  }
  return { icon: 'receipt-long', bg: '#E2E8F0', color: '#475569' }; // Slate
};

export default function BillsScreen() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [dbBills, setDbBills] = useState<BillRow[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBillId, setEditingBillId] = useState<string | null>(null);
  const [currency, setCurrency] = useState('£');

  const fetchBills = async () => {
    try {
      const data = await getBills();
      setDbBills(data);
      const account = await getAccount();
      if (account && account.currency) {
        setCurrency(account.currency);
      }
    } catch (e) {
      console.error('Failed to fetch bills', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBills();
    }, [])
  );

  const { upcomingAmount, totalMonthly } = useMemo(() => {
    let upcoming = 0;
    let monthly = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayMs = today.getTime();
    
    const sevenDaysFromNow = new Date(todayMs + 7 * 24 * 60 * 60 * 1000);
    const sevenDaysMs = sevenDaysFromNow.getTime();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    dbBills.forEach((bill) => {
      const parts = bill.due_date.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        const dueDate = new Date(year, month - 1, day);
        const dueDateMs = dueDate.getTime();

        if (dueDate.getMonth() === currentMonth && dueDate.getFullYear() === currentYear) {
          if (bill.status === 'Paid') {
            monthly += bill.amount;
          }
        }

        if (bill.repeat_type !== 'None' && dueDateMs >= todayMs && dueDateMs <= sevenDaysMs && bill.status !== 'Paid') {
          upcoming += bill.amount;
        }
      }
    });

    return { upcomingAmount: upcoming, totalMonthly: monthly };
  }, [dbBills]);

  const mappedBills = useMemo<Bill[]>(() => {
    return dbBills.map(row => {
      let status: 'due' | 'paid' | 'overdue' | 'upcoming' = 'upcoming';
      if (row.status === 'Paid') status = 'paid';
      else if (row.status === 'Overdue') status = 'overdue';
      else {
        const today = new Date().toISOString().split('T')[0];
        if (row.due_date < today) {
           status = 'overdue';
        } else {
           status = 'upcoming';
        }
      }

      const iconInfo = getBillIconInfo(row.name, row.category);

      return {
        id: row.id.toString(),
        icon: iconInfo.icon,
        iconBg: iconInfo.bg,
        iconColor: iconInfo.color,
        title: row.name,
        amount: row.amount,
        statusText: row.status === 'Paid' ? 'Paid' : `Unpaid (Due ${row.due_date})`,
        status: status,
        badgeIcon: row.repeat_type === 'None' ? 'receipt-long' : 'autorenew',
        badgeLabel: row.repeat_type === 'None' ? 'Bill' : 'Recurring',
        category: row.category,
        date: row.due_date,
      };
    });
  }, [dbBills]);

  const filteredBills = useMemo(() => {
    return mappedBills.filter((bill) => {
      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Bills' && bill.category === 'Bills') ||
        (activeFilter === 'Subscriptions' && bill.category === 'Subscription') ||
        (activeFilter === 'Paid' && bill.status === 'paid') ||
        (activeFilter === 'Unpaid' && bill.status !== 'paid');

      return matchesFilter;
    });
  }, [activeFilter, mappedBills]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BillsFilterChips
          filters={FILTERS}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />
        <BillsSummaryCards upcomingAmount={upcomingAmount} totalMonthly={totalMonthly} currency={currency} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bills</Text>
          <View style={styles.sortDropdown}>
            <Text style={styles.sortText}>Due Date</Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color="#888" />
          </View>
        </View>

        <View style={{ gap: 16 }}>
          {filteredBills.map((bill) => (
            <BillCard 
              key={bill.id} 
              bill={bill} 
              currency={currency}
              onEdit={(id) => {
                setEditingBillId(id);
                setModalVisible(true);
              }}
              onDelete={async (id) => {
                await deleteBill(parseInt(id, 10));
                fetchBills();
              }}
              onToggleStatus={async (id, newStatus) => {
                await updateBillStatus(parseInt(id, 10), newStatus);
                fetchBills();
              }}
            />
          ))}
        </View>

        {/* Spacer so content clears the FAB */}
        <View style={{ height: 72 }} />
      </ScrollView>

      <BillsFab onPress={() => {
        setEditingBillId(null);
        setModalVisible(true);
      }} />

      <AddBillModal
        visible={modalVisible}
        initialData={
          editingBillId
            ? (() => {
                const row = dbBills.find((b) => b.id.toString() === editingBillId);
                return row
                  ? {
                      id: row.id.toString(),
                      name: row.name,
                      category: row.category,
                      amount: row.amount,
                      dueDate: row.due_date,
                      repeatType: row.repeat_type,
                      status: row.status,
                    }
                  : null;
              })()
            : null
        }
        onClose={() => {
          setModalVisible(false);
          setEditingBillId(null);
        }}
        onSave={async (name, category, amount, dueDate, repeatType, status) => {
          if (editingBillId) {
            await updateBill(parseInt(editingBillId, 10), name, category, amount, dueDate, repeatType, status);
          } else {
            await insertBill(name, category, amount, dueDate, repeatType, status);
          }
          fetchBills();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 20,
  },
});