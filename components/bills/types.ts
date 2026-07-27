import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

// ---- Mock data (swap for real data later) ----
export const SUMMARY = {
  upcomingAmount: 130,
  upcomingSubtitle: 'Due in 7 days',
  totalMonthly: 450,
  totalMonthlySubtitle: '3/8 Paid',
};

export const FILTERS = ['All', 'Bills', 'Subscriptions', 'Paid', 'Upcoming', 'Overdue'] as const;
export type Filter = (typeof FILTERS)[number];

export type BillStatus = 'due' | 'paid' | 'overdue' | 'upcoming';

export type Bill = {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  amount: number;
  statusText: string;
  status: BillStatus;
  badgeIcon: keyof typeof MaterialIcons.glyphMap;
  badgeLabel: string;
  date: string;
};

export const BILLS: Bill[] = [
  {
    id: '1',
    icon: 'router',
    title: 'Internet',
    amount: 45.0,
    statusText: 'Due in 5 days',
    status: 'due',
    badgeIcon: 'autorenew',
    badgeLabel: 'Recurring',
    date: 'Oct 15',
  },
  {
    id: '2',
    icon: 'movie',
    title: 'Netflix',
    amount: 12.99,
    statusText: 'Paid',
    status: 'paid',
    badgeIcon: 'autorenew',
    badgeLabel: 'Recurring',
    date: 'Oct 10',
  },
  {
    id: '3',
    icon: 'bolt',
    title: 'Electricity',
    amount: 85.0,
    statusText: 'Overdue by 2 days',
    status: 'overdue',
    badgeIcon: 'receipt-long',
    badgeLabel: 'Bill',
    date: 'Oct 08',
  },
  {
    id: '4',
    icon: 'water-drop',
    title: 'Water',
    amount: 32.5,
    statusText: 'Due in 15 days',
    status: 'upcoming',
    badgeIcon: 'receipt-long',
    badgeLabel: 'Bill',
    date: 'Oct 25',
  },
];

export const STATUS_COLOR: Record<BillStatus, string> = {
  due: '#f59e0b',
  paid: '#10b981',
  overdue: colors.error,
  upcoming: colors.secondary,
};

export const STRIP_COLOR: Record<BillStatus, string> = {
  due: '#f59e0b',
  paid: '#10b981',
  overdue: colors.error,
  upcoming: colors.outline,
};
