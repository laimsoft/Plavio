import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { Transaction } from './types';

type Props = {
    transactions: Transaction[];
    title?: string;
    formatCurrency: (val: number) => string;
};

export default function RecentTransactions({ transactions, title, formatCurrency }: Props) {
    return (
        <View style={{ gap: 16 }}>
            <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>{title || 'Recent Transactions'}</Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
            </View>

            <View style={{ gap: 4 }}>
                {transactions.map((transaction) => (
                    <TouchableOpacity
                        key={transaction.id}
                        style={styles.expenseRow}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[styles.expenseIconCircle, { backgroundColor: transaction.iconBg }]}
                        >
                            <MaterialIcons
                                name={transaction.icon}
                                size={22}
                                color={transaction.iconColor}
                            />
                        </View>
                        <View style={styles.expenseInfo}>
                            <Text style={styles.expenseTitle}>{transaction.title}</Text>
                            <Text style={styles.expenseSubtitle}>
                                {transaction.category} • {transaction.date}
                            </Text>
                        </View>
                        <Text style={styles.expenseAmount}>
                            {formatCurrency(transaction.amount)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
        color: colors.onSurface,
    },
    seeAllText: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.1,
        fontWeight: '500',
        color: colors.primary,
    },
    expenseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: colors.surfaceContainerLowest,
        padding: 12,
        borderRadius: 8,
    },
    expenseIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    expenseInfo: {
        flex: 1,
    },
    expenseTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.onSurface,
    },
    expenseSubtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.onSurfaceVariant,
        marginTop: 2,
    },
    expenseAmount: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        color: colors.onSurface,
    },
});
