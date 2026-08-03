import GroceryFab from '@/components/groceries/GroceryFab';
import GroceryHeader from '@/components/groceries/GroceryHeader';
import GroceryItemCard, { GroceryItemType } from '@/components/groceries/GroceryItemCard';
import GroceryInlineCreateCard from '@/components/groceries/GroceryInlineCreateCard';
import GrocerySearchBar from '@/components/groceries/GrocerySearchBar';
import GroceryCategoryChips from '@/components/groceries/GroceryCategoryChips';
import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getGroceryItems, toggleGroceryItemPurchased, addGroceryItem, clearGroceryItems, deleteGroceryItem, updateGroceryItem } from '@/database/queries';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function GroceriesScreen() {
    const [items, setItems] = useState<GroceryItemType[]>([]);
    const [search, setSearch] = useState('');
    const [isCreatingInline, setIsCreatingInline] = useState(false);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [activeControl, setActiveControl] = useState<'none' | 'search' | 'filter'>('none');
    const [filterType, setFilterType] = useState<string>('All');

    const listId = 1;

    const loadItems = async () => {
        try {
            const rows = await getGroceryItems(listId);
            const formattedItems: GroceryItemType[] = rows.map((row) => ({
                id: row.id.toString(),
                name: row.name,
                note: row.notes || '',
                quantity: `${row.quantity} ${row.unit || ''}`.trim(),
                rawQuantity: row.quantity.toString(),
                unit: row.unit || '',
                categoryId: row.category_id,
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
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
            let matchesFilter = true;
            if (filterType === 'Bought') matchesFilter = item.checked;
            if (filterType === 'Remaining') matchesFilter = !item.checked;
            return matchesSearch && matchesFilter;
        });
    }, [items, search, filterType]);

    const toggleSearch = () => {
        if (activeControl === 'search') setActiveControl('none');
        else setActiveControl('search');
    };

    const toggleFilter = () => {
        if (activeControl === 'filter') setActiveControl('none');
        else setActiveControl('filter');
    };

    useEffect(() => {
        if (activeControl !== 'filter') {
            setFilterType('All');
        }
    }, [activeControl]);

    const toggleItem = async (id: string) => {
        const itemToToggle = items.find((i) => i.id === id);
        if (!itemToToggle) return;

        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
        );

        try {
            await toggleGroceryItemPurchased(Number(id), itemToToggle.checked ? 1 : 0);
            await loadItems();
        } catch (error) {
            console.error('Failed to toggle item:', error);
            await loadItems();
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

    const renderListHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <LinearGradient
                    colors={['#F0FAFA', '#E4F6F7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.heroCard}
                >
                    {/* Left: Image */}
                    <View style={styles.heroImageContainer}>
                        <Image
                            source={require('@/assets/images/groceries.png')}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Middle: Text Content */}
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroTitle}>What's on your list?</Text>
                        <Text style={styles.heroSubtitle}>Find items quickly and{'\n'}add to your groceries.</Text>
                    </View>

                    {/* Right: Actions */}
                    <View style={styles.heroActionsContainer}>
                        <TouchableOpacity activeOpacity={0.8} onPress={toggleSearch}>
                            <LinearGradient
                                colors={['#7DF08B', '#0CD2DB']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.searchButtonGradient}
                            >
                                <Feather name="search" size={20} color="#FFF" />
                            </LinearGradient>
                        </TouchableOpacity>
                        
                        <View style={styles.divider} />

                        <TouchableOpacity style={styles.filterButton} activeOpacity={0.8} onPress={toggleFilter}>
                            <Feather name="sliders" size={18} color="#10B981" />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {activeControl === 'search' && (
                    <View style={{ marginBottom: 16 }}>
                        <GrocerySearchBar search={search} onSearchChange={setSearch} />
                    </View>
                )}

                {activeControl === 'filter' && (
                    <View style={{ marginBottom: 16 }}>
                        <GroceryCategoryChips 
                            categories={['All', 'Bought', 'Remaining']} 
                            selectedCategory={filterType} 
                            onSelectCategory={setFilterType} 
                        />
                    </View>
                )}

                <View style={styles.listControls}>
                    <View style={styles.listControlsLeft}>
                        <Text style={styles.listTitle}>My Groceries</Text>
                        <LinearGradient
                            colors={['#7DF08B', '#0CD2DB']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.countBadge}
                        >
                            <Text style={styles.countText}>{filteredItems.length}</Text>
                        </LinearGradient>
                    </View>
                    <TouchableOpacity style={styles.clearButton} onPress={handleClearAll} activeOpacity={0.7}>
                        <Text style={styles.clearButtonText}>Clear All</Text>
                        <Feather name="trash-2" size={16} color="#F43F5E" />
                    </TouchableOpacity>
                </View>

                {isCreatingInline && (
                    <View style={{ marginBottom: 16 }}>
                        <GroceryInlineCreateCard 
                            onSave={handleSaveInline} 
                            onCancel={() => setIsCreatingInline(false)} 
                        />
                    </View>
                )}
            </View>
        );
    };

    const renderEmpty = () => {
        if (isCreatingInline) return null;
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Add groceries</Text>
            </View>
        );
    };

    const handleEditItem = (id: string) => {
        setEditingItemId(id);
    };

    const handleSaveEditItem = async (id: string, name: string, quantity: string, unit: string) => {
        try {
            const item = items.find(i => i.id === id);
            const parsedQuantity = quantity ? parseFloat(quantity) : 1;
            await updateGroceryItem(
                Number(id),
                name,
                isNaN(parsedQuantity) ? 1 : parsedQuantity,
                unit || null,
                item?.categoryId || null,
                item?.note || null
            );
            setEditingItemId(null);
            await loadItems();
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    const handleDeleteItem = (id: string) => {
        Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteGroceryItem(Number(id));
                            await loadItems();
                        } catch (error) {
                            console.error('Failed to delete item:', error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <GroceryHeader />

            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    editingItemId === item.id ? (
                        <GroceryInlineCreateCard 
                            initialName={item.name}
                            initialQuantity={item.rawQuantity}
                            initialUnit={item.unit}
                            onSave={(name, quantity, unit) => handleSaveEditItem(item.id, name, quantity, unit)} 
                            onCancel={() => setEditingItemId(null)} 
                        />
                    ) : (
                        <GroceryItemCard 
                            item={item} 
                            onToggle={toggleItem} 
                            onEdit={handleEditItem}
                            onDelete={handleDeleteItem}
                        />
                    )
                )}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListHeaderComponent={renderListHeader()}
                ListEmptyComponent={renderEmpty}
                showsVerticalScrollIndicator={false}
            />

            <GroceryFab onPress={() => {
                setIsCreatingInline(true);
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFB',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 120,
        flexGrow: 1,
    },
    headerContainer: {
        paddingTop: 8,
        paddingBottom: 24,
    },
    heroCard: {
        borderRadius: 20,
        padding: 12,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E8F5F5',
        marginBottom: 24,
    },
    heroImageContainer: {
        width: 64,
        zIndex: 10,
        marginRight: 12,
    },
    heroImage: {
        width: '100%',
        height: 64, 
    },
    heroTextContainer: {
        flex: 1,
        zIndex: 10,
        justifyContent: 'center',
    },
    heroTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        lineHeight: 22,
        marginBottom: 2,
    },
    heroSubtitle: {
        fontSize: 11,
        color: '#6B7280',
        lineHeight: 16,
    },
    heroActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 6,
    },
    searchButtonGradient: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#14D2D0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
    },
    divider: {
        height: 24,
        width: 1,
        backgroundColor: '#D1D5DB',
        marginHorizontal: 8,
    },
    filterButton: {
        width: 38,
        height: 38,
        backgroundColor: '#FFFFFF',
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    listControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    listControlsLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    listTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1E293B',
    },
    countBadge: {
        borderRadius: 12,
        height: 24,
        minWidth: 24,
        paddingHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginTop: -4,
    },
    countText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    clearButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#FFF1F2',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFE4E6',
    },
    clearButtonText: {
        color: '#F43F5E',
        fontSize: 14,
        fontWeight: '600',
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
        color: '#94A3B8',
    },
});