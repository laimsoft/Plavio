import MonthlySummaryCard from '@/components/transactions/MonthlySummaryCard';
import RecentTransactions from '@/components/transactions/RecentTransactions';
import TransactionSearchBar from '@/components/transactions/TransactionSearchBar';
import TransactionTabs from '@/components/transactions/TransactionTabs';
import { Tab, Transaction } from '@/components/transactions/types';
import { colors } from '@/constants/colors';
import { AccountTransactionRow, getAccountTransactions } from '@/database/queries';
import { initDatabase } from '@/database/schema';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    InteractionManager,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';



const formatCurrency = (value: number) =>
    `$${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

const mapRowToTransaction = (row: AccountTransactionRow): Transaction => {
    return {
        id: String(row.id),
        icon: 'receipt',
        iconBg: colors.primaryContainer,
        iconColor: colors.onPrimaryContainer,
        title: row.transaction_name,
        category: row.transaction_type,
        date: row.transaction_date,
        amount: row.amount,
    };
};

export default function TransactionsScreen() {
    const router = useRouter();
    const { type } = useLocalSearchParams<{ type: string }>();
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<Tab>((type as Tab) || 'Expense');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState<{
        title: string;
        amount: number;
        changePercent: number;
        progress: { label: string; remainingAmount: number; totalAmount: number; percent: number; } | null;
    }>({
        title: 'MONTHLY SPENDING',
        amount: 0,
        changePercent: 0,
        progress: null,
    });
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const setup = async () => {
            await initDatabase();
            setIsReady(true);
        };
        setup();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (isReady) {
                const loadTransactions = async () => {
                    const rows = await getAccountTransactions(activeTab);
                    setTransactions(rows.map(mapRowToTransaction));
                };

                const loadSummary = async () => {
                    const allRows = await getAccountTransactions();
                    let monthlySpending = 0;
                    let budgetTotal = 0;
                    let savingTotal = 0;

                    allRows.forEach(row => {
                        if (row.transaction_type === 'Budget') budgetTotal += row.amount;
                        else if (row.transaction_type === 'Expense') monthlySpending += row.amount;
                        else if (row.transaction_type === 'Saving') savingTotal += row.amount;
                    });

                    let title = 'MONTHLY SPENDING';
                    let amount = 0;
                    let progress = null;

                    if (activeTab === 'Expense') {
                        title = 'TOTAL EXPENSE';
                        amount = monthlySpending;
                        const percent = budgetTotal > 0 ? Math.min(100, Math.round((monthlySpending / budgetTotal) * 100)) : 0;
                        progress = {
                            label: 'Budget Remaining',
                            remainingAmount: budgetTotal - monthlySpending,
                            totalAmount: budgetTotal,
                            percent,
                        };
                    } else if (activeTab === 'Budget') {
                        title = 'TOTAL BUDGET';
                        amount = budgetTotal;
                    } else if (activeTab === 'Saving') {
                        title = 'TOTAL SAVINGS';
                        amount = savingTotal;
                    }

                    setSummary({
                        title,
                        amount,
                        changePercent: 0,
                        progress,
                    });
                };

                const task = InteractionManager.runAfterInteractions(() => {
                    loadTransactions();
                    loadSummary();
                });
                return () => task.cancel();
            }
        }, [activeTab, isReady])
    );

    const filteredTransactions = useMemo(() => {
        if (!search.trim()) return transactions;
        return transactions.filter((t) =>
            t.title.toLowerCase().includes(search.trim().toLowerCase())
        );
    }, [search, transactions]);

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.pageTitle}>Account Transactions</Text>

                <TransactionSearchBar value={search} onChangeText={setSearch} />

                <TransactionTabs activeTab={activeTab} onTabSelect={setActiveTab} />

                <MonthlySummaryCard
                    title={summary.title}
                    amount={summary.amount}
                    changePercent={summary.changePercent}
                    progress={summary.progress}
                    formatCurrency={formatCurrency}
                />

                <RecentTransactions
                    title={`Recent ${activeTab}s`}
                    transactions={filteredTransactions}
                    formatCurrency={formatCurrency}
                />

                {/* Spacer so content clears the FAB / bottom nav */}
                <View style={{ height: 88 }} />
            </ScrollView>
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