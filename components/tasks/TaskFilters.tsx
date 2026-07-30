import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { extra } from './constants';
import { LinearGradient } from 'expo-linear-gradient';

import { CategoryRow } from '@/database/queries';

type TaskFiltersProps = {
    categories: CategoryRow[];
    activeCategoryId: number | null;
    onCategorySelect: (categoryId: number) => void;
};

export default function TaskFilters({ categories, activeCategoryId, onCategorySelect }: TaskFiltersProps) {
    return (
        <View style={styles.filterSection}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryRow}
            >
                {categories.map((category) => {
                    const active = category.id === activeCategoryId;
                    return active ? (
                        <TouchableOpacity
                            key={category.id}
                            activeOpacity={0.7}
                            onPress={() => onCategorySelect(category.id)}
                        >
                            <LinearGradient
                                colors={['#10B981', '#06B6D4']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.categoryChipActive}
                            >
                                <Text style={styles.categoryLabelActive}>
                                    {category.name}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryChip}
                            activeOpacity={0.7}
                            onPress={() => onCategorySelect(category.id)}
                        >
                            <Text style={styles.categoryLabel}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    filterSection: {
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 8,
        backgroundColor: '#F8F9FA',
    },
    categoryRow: {
        flexDirection: 'row',
        gap: 12,
        paddingBottom: 8,
    },
    categoryChip: {
        backgroundColor: '#f3f4f6',
        borderRadius: 999,
        paddingHorizontal: 24,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryChipActive: {
        borderRadius: 999,
        paddingHorizontal: 24,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    categoryLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    categoryLabelActive: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
    },
});
