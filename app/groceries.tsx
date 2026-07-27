import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { colors } from '@/constants/colors';
import GroceryItemCard, { GroceryItemType } from '@/components/groceries/GroceryItemCard';
import GroceryHeader from '@/components/groceries/GroceryHeader';
import GrocerySearchBar from '@/components/groceries/GrocerySearchBar';
import GroceryCategoryChips from '@/components/groceries/GroceryCategoryChips';
import GroceryFab from '@/components/groceries/GroceryFab';

const CATEGORIES = ['All', 'Produce', 'Dairy', 'Bakery', 'Frozen', 'Cleaning', 'Snacks'];

const INITIAL_ITEMS: GroceryItemType[] = [
  {
    id: '1',
    name: 'Organic Milk',
    note: 'Whole milk only',
    quantity: '2 Gallons',
    category: 'Dairy',
    checked: false,
  },
  {
    id: '2',
    name: 'Avocados',
    note: 'Ripe ones if possible',
    quantity: '4 Items',
    category: 'Produce',
    checked: false,
  },
  {
    id: '3',
    name: 'Sourdough Bread',
    note: 'From the bakery section',
    quantity: '1 Loaf',
    category: 'Bakery',
    checked: false,
  },
  {
    id: '4',
    name: 'Paper Towels',
    note: 'Large rolls',
    quantity: '6 Pack',
    category: 'Cleaning',
    checked: true,
  },
  {
    id: '5',
    name: 'Free Range Eggs',
    note: 'Large',
    quantity: '1 Dozen',
    category: 'Dairy',
    checked: false,
  },
];

export default function GroceriesScreen() {
  const [items, setItems] = useState<GroceryItemType[]>(INITIAL_ITEMS);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, search, selectedCategory]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  return (
    <View style={styles.container}>
      <GroceryHeader />

      <View style={styles.searchSection}>
        <GrocerySearchBar search={search} onSearchChange={setSearch} />
        <GroceryCategoryChips 
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GroceryItemCard item={item} onToggle={toggleItem} />}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />

      <GroceryFab />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchSection: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
});