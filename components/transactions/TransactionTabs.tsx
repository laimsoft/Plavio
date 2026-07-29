import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { Tab, TABS } from './types';

type Props = {
    activeTab: Tab;
    onTabSelect: (tab: Tab) => void;
};

export default function TransactionTabs({ activeTab, onTabSelect }: Props) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabRow}
        >
            {TABS.map((tab) => {
                const active = tab === activeTab;
                return (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tabChip, active && styles.tabChipActive]}
                        activeOpacity={0.8}
                        onPress={() => onTabSelect(tab)}
                    >
                        <Text style={[styles.tabChipText, active && styles.tabChipTextActive]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tabRow: {
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 4,
    },
    tabChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: colors.surfaceContainer,
    },
    tabChipActive: {
        backgroundColor: colors.primary,
    },
    tabChipText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
        color: colors.onSurfaceVariant,
    },
    tabChipTextActive: {
        color: colors.onPrimary,
    },
});
