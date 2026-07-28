import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { extra } from './constants';

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
                    return (
                        <TouchableOpacity
                            key={category.id}
                            style={[styles.categoryChip, active && styles.categoryChipActive]}
                            activeOpacity={0.7}
                            onPress={() => onCategorySelect(category.id)}
                        >
                            <Text
                                style={[styles.categoryLabel, active && styles.categoryLabelActive]}
                            >
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
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: colors.background,
    },
    categoryRow: {
        flexDirection: 'row',
        gap: 8,
        paddingBottom: 4,
    },
    categoryChip: {
        backgroundColor: extra.surfaceContainerHigh,
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    categoryChipActive: {
        backgroundColor: colors.primary,
    },
    categoryLabel: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.1,
        fontWeight: '500',
        color: extra.onSurface,
    },
    categoryLabelActive: {
        color: extra.onPrimary,
    },
});
