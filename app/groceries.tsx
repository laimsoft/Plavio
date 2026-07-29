import GroceryFab from '@/components/groceries/GroceryFab';
import GroceryHeader from '@/components/groceries/GroceryHeader';
import GroceryItemCard, { GroceryItemType } from '@/components/groceries/GroceryItemCard';
import GrocerySearchBar from '@/components/groceries/GrocerySearchBar';
import { colors } from '@/constants/colors';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getGroceryItems, toggleGroceryItemPurchased, addGroceryItem, clearGroceryItems } from '@/database/queries';
import GroceryInlineCreateCard from '@/components/groceries/GroceryInlineCreateCard';
import { initDatabase } from '@/database/schema';

export default function GroceriesScreen() {
    const [items, setItems] = useState<GroceryItemType[]>([]);
    const [search, setSearch] = useState('');
    
    const [isCreatingInline, setIsCreatingInline] = useState(false);

    const listId = 1; // Default list ID

    const loadItems = async () => {
        try {
            const rows = await getGroceryItems(listId);
            const formattedItems: GroceryItemType[] = rows.map((row) => ({
                id: row.id.toString(),
                name: row.name,
                note: row.notes || '',
                quantity: `${row.quantity} ${row.unit || ''}`.trim(),
                category: row.category_name || 'Uncategorized',
                checked: row.purchased === 1,
            }));
            setItems(formattedItems);
        } catch (error) {
            console.error('Failed to load grocery items:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadItems();
        }, [])
    );

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        });
    }, [items, search]);

    const toggleItem = async (id: string) => {
        const itemToToggle = items.find((i) => i.id === id);
        if (!itemToToggle) return;

        // Optimistic UI update
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
        );

        try {
            await toggleGroceryItemPurchased(Number(id), itemToToggle.checked ? 1 : 0);
            await loadItems(); // Refresh to ensure correct sorting and DB state
        } catch (error) {
            console.error('Failed to toggle item:', error);
            await loadItems(); // Revert on failure
        }
    };

    const handleSaveInline = async (name: string, quantity: string, unit: string) => {
        try {
            const parsedQuantity = quantity ? parseFloat(quantity) : 1;
            await addGroceryItem(
                listId,
                name,
                isNaN(parsedQuantity) ? 1 : parsedQuantity,
                unit || null,
                null,
                null
            );
            setIsCreatingInline(false);
            await loadItems();
        } catch (err) {
            console.error('Failed to save inline item:', err);
        }
    };

    const handleClearAll = () => {
        Alert.alert(
            'Clear Groceries',
            'Are you sure you want to delete all grocery items? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await clearGroceryItems(listId);
                            await loadItems();
                        } catch (error) {
                            console.error('Failed to clear items:', error);
                        }
                    }
                }
            ]
        );
    };

    const renderHeader = () => {
        if (!isCreatingInline) return null;
        return (
            <View style={{ marginBottom: 8 }}>
                <GroceryInlineCreateCard 
                    onSave={handleSaveInline} 
                    onCancel={() => setIsCreatingInline(false)} 
                />
            </View>
        );
    };

    const renderEmpty = () => {
        if (isCreatingInline) return null;
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Add grocries</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <GroceryHeader />

            <View style={styles.searchSection}>
                <GrocerySearchBar search={search} onSearchChange={setSearch} />
                <View style={styles.categoriesRow}>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn} activeOpacity={0.7}>
                        <Text style={styles.clearBtnText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <GroceryItemCard item={item} onToggle={toggleItem} />}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}
            />

            <GroceryFab onPress={() => {
                setIsCreatingInline(true);
                // Optional: Scroll to top when creating inline
            }} />
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
        paddingBottom: 8,
        backgroundColor: colors.background,
    },
    categoriesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
    },
    clearBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: colors.errorContainer,
    },
    clearBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.onErrorContainer,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
        flexGrow: 1,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.onSurfaceVariant,
    },
});