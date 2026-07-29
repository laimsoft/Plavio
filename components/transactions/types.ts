import { MaterialIcons } from '@expo/vector-icons';

export const TABS = ['Budget', 'Expense', 'Saving'] as const;
export type Tab = (typeof TABS)[number];

export type Transaction = {
    id: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    iconBg: string;
    iconColor: string;
    title: string;
    category: string;
    date: string;
    amount: number;
};
