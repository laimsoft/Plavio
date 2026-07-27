import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { extra } from './constants';

type TaskFiltersProps = {
    categories: string[];
    activeCategory: string;
    onCategorySelect: (category: string) => void;
};

export default function TaskFilters({ categories, activeCategory, onCategorySelect }: TaskFiltersProps) {
    return (
        <View style={styles.searchSection}>
            <View style={styles.searchWrapper}>
                <MaterialIcons
                    name="search"
                    size={20}
                    color={colors.onSurfaceVariant}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search tasks..."
                    placeholderTextColor={colors.onSurfaceVariant}
                />
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryRow}
            >
                {categories.map((category) => {
                    const active = category === activeCategory;
                    return (
                        <TouchableOpacity
                            key={category}
                            style={[styles.categoryChip, active && styles.categoryChipActive]}
                            activeOpacity={0.7}
                            onPress={() => onCategorySelect(category)}
                        >
                            <Text
                                style={[styles.categoryLabel, active && styles.categoryLabelActive]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    searchSection: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        backgroundColor: colors.background,
    },
    searchWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: 16,
        zIndex: 1,
    },
    searchInput: {
        backgroundColor: extra.surfaceContainerLow,
        borderWidth: 1,
        borderColor: extra.outlineVariant,
        borderRadius: 999,
        paddingVertical: 12,
        paddingLeft: 48,
        paddingRight: 16,
        fontSize: 14,
        color: extra.onSurface,
    },
    categoryRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
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
