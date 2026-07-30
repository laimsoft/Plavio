import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
                if (active) {
                    return (
                        <TouchableOpacity key={tab} activeOpacity={0.8} onPress={() => onTabSelect(tab)}>
                            <LinearGradient
                                colors={['#10B981', '#06B6D4']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.tabChipActive}
                            >
                                <Text style={styles.tabChipTextActive}>
                                    {tab}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    );
                }
                return (
                    <TouchableOpacity
                        key={tab}
                        style={styles.tabChip}
                        activeOpacity={0.8}
                        onPress={() => onTabSelect(tab)}
                    >
                        <Text style={styles.tabChipText}>
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
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 999,
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
