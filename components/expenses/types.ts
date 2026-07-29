import { MaterialIcons } from '@expo/vector-icons';

export const TABS = ['Expenses', 'Bills', 'Budget', 'Savings', 'Debt'] as const;
export type Tab = (typeof TABS)[number];

export type Expense = {
    id: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    iconBg: string;
    iconColor: string;
    title: string;
    category: string;
    date: string;
    amount: number;
};
