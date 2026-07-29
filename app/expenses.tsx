import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Expense, Tab } from '@/components/expenses/types';
import ExpenseSearchBar from '@/components/expenses/ExpenseSearchBar';
import ExpenseTabs from '@/components/expenses/ExpenseTabs';
import MonthlySummaryCard from '@/components/expenses/MonthlySummaryCard';
import RecentExpenses from '@/components/expenses/RecentExpenses';

// ---- Mock data (swap for real data later) ----
const SUMMARY = {
    monthlySpending: 1240.5,
    changePercent: 12,
    budgetRemaining: 759.5,
    budgetTotal: 2000,
};

const EXPENSES: Expense[] = [
    {
        id: '1',
        icon: 'restaurant',
        iconBg: colors.tertiaryContainer,
        iconColor: colors.onTertiaryContainer,
        title: 'Whole Foods Market',
        category: 'Groceries',
        date: 'Today',
        amount: 84.2,
    },
    {
        id: '2',
        icon: 'directions-car',
        iconBg: colors.primaryContainer,
        iconColor: colors.onPrimaryContainer,
        title: 'Uber',
        category: 'Transport',
        date: 'Yesterday',
        amount: 15.5,
    },
    {
        id: '3',
        icon: 'shopping-bag',
        iconBg: colors.secondaryContainer,
        iconColor: colors.onSecondaryContainer,
        title: 'Amazon',
        category: 'Shopping',
        date: 'Nov 12',
        amount: 129.99,
    },
    {
        id: '4',
        icon: 'local-cafe',
        iconBg: colors.tertiaryContainer,
        iconColor: colors.onTertiaryContainer,
        title: 'Starbucks',
        category: 'Dining',
        date: 'Nov 11',
        amount: 6.45,
    },
];

const formatCurrency = (value: number) =>
    `$${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

export default function ExpensesScreen() {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>('Expenses');

    const budgetUsedPercent = useMemo(
        () =>
            Math.min(
                100,
                Math.round(
                    ((SUMMARY.budgetTotal - SUMMARY.budgetRemaining) / SUMMARY.budgetTotal) * 100
                )
            ),
        []
    );

    const filteredExpenses = useMemo(() => {
        if (!search.trim()) return EXPENSES;
        return EXPENSES.filter((e) =>
            e.title.toLowerCase().includes(search.trim().toLowerCase())
        );
    }, [search]);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Page Title */}
                <Text style={styles.pageTitle}>Expense Management</Text>

                {/* Search Bar */}
                <ExpenseSearchBar value={search} onChangeText={setSearch} />

                {/* Horizontal Scrollable Tabs */}
                <ExpenseTabs activeTab={activeTab} onTabSelect={setActiveTab} />

                {/* Monthly Summary Card */}
                <MonthlySummaryCard 
                    summary={SUMMARY} 
                    budgetUsedPercent={budgetUsedPercent} 
                    formatCurrency={formatCurrency} 
                />

                {/* Recent Expenses */}
                <RecentExpenses 
                    expenses={filteredExpenses} 
                    formatCurrency={formatCurrency} 
                />

                {/* Spacer so content clears the FAB / bottom nav */}
                <View style={{ height: 88 }} />
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
                <MaterialIcons name="add" size={28} color={colors.onPrimary} />
            </TouchableOpacity>
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
        paddingTop: 20,
        gap: 24,
    },
    pageTitle: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '600',
        color: colors.onSurface,
        marginBottom: -12,
    },
    // FAB
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
});