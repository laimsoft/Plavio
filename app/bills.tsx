import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { colors } from '../constants/colors';

import { BILLS, Filter, FILTERS } from '@/components/bills/types';
import BillsHeader from '@/components/bills/BillsHeader';
import BillsFilterChips from '@/components/bills/BillsFilterChips';
import BillsSummaryCards from '@/components/bills/BillsSummaryCards';
import BillCard from '@/components/bills/BillCard';
import BillsFab from '@/components/bills/BillsFab';

export default function BillsScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filteredBills = useMemo(() => {
    return BILLS.filter((bill) => {
      const matchesSearch = bill.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Paid' && bill.status === 'paid') ||
        (activeFilter === 'Overdue' && bill.status === 'overdue') ||
        (activeFilter === 'Upcoming' &&
          (bill.status === 'due' || bill.status === 'upcoming')) ||
        (activeFilter === 'Bills' && bill.badgeLabel === 'Bill') ||
        (activeFilter === 'Subscriptions' && bill.badgeLabel === 'Recurring');

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BillsHeader search={search} onSearchChange={setSearch} />
        <BillsFilterChips
          filters={FILTERS}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
        />
        <BillsSummaryCards />

        <View style={{ gap: 16 }}>
          {filteredBills.map((bill) => (
            <BillCard key={bill.id} bill={bill} />
          ))}
        </View>

        {/* Spacer so content clears the FAB */}
        <View style={{ height: 72 }} />
      </ScrollView>

      <BillsFab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 20,
  },
});