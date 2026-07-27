import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

type SummaryCard = {
  key: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBg: string;
  iconColor: string;
  label: string;
  labelColor?: string;
  value: string;
  valueColor?: string;
  caption: string;
  captionColor?: string;
  primaryBg?: boolean;
};

const summaryCards: SummaryCard[] = [
  {
    key: 'tasks',
    icon: 'checklist',
    iconBg: colors.primaryContainer,
    iconColor: colors.onPrimaryContainer,
    label: 'Today',
    value: '5',
    caption: 'Pending Tasks',
  },
  {
    key: 'reminders',
    icon: 'event',
    iconBg: colors.tertiaryContainer,
    iconColor: colors.onTertiaryContainer,
    label: 'Soon',
    value: '3',
    caption: 'Reminders',
  },
  {
    key: 'expenses',
    icon: 'payments',
    iconBg: colors.errorContainer,
    iconColor: colors.onErrorContainer,
    label: 'Monthly',
    value: '$1.2k',
    caption: 'Expenses',
  },
  {
    key: 'budget',
    icon: 'account-balance-wallet',
    iconBg: colors.secondaryContainer,
    iconColor: colors.onSecondaryContainer,
    label: 'Budget',
    value: '$840',
    caption: 'Remaining',
  },
  {
    key: 'oil',
    icon: 'directions-car',
    iconBg: colors.surfaceContainerHigh,
    iconColor: colors.onSurface,
    label: 'Overdue',
    value: 'Oil',
    caption: 'Change Due',
  },
  {
    key: 'goal',
    icon: 'savings',
    iconBg: colors.primaryContainer,
    iconColor: colors.onPrimaryContainer,
    label: 'Goal',
    value: '65%',
    caption: 'Vacation Fund',
  },
];

export default function SummaryGrid() {
  return (
    <View style={styles.grid}>
      {summaryCards.map((card) => (
        <View
          key={card.key}
          style={[styles.card, card.primaryBg && styles.cardPrimary]}
        >
          <View style={styles.cardTopRow}>
            <View style={[styles.cardIconCircle, { backgroundColor: card.iconBg }]}>
              <MaterialIcons name={card.icon} size={16} color={card.iconColor} />
            </View>
            <Text style={[styles.cardLabel, card.labelColor && { color: card.labelColor }]}>
              {card.label}
            </Text>
          </View>
          <View>
            <Text style={[styles.cardValue, card.valueColor && { color: card.valueColor }]}>
              {card.value}
            </Text>
            <Text
              style={[styles.cardCaption, card.captionColor && { color: card.captionColor }]}
            >
              {card.caption}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48.5%',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    padding: 16,
    marginBottom: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardPrimary: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  cardValue: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    color: colors.onSurface,
  },
  cardCaption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
});
