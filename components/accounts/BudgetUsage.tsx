import { StyleSheet, Text, View } from 'react-native';
import { CircularProgress } from './CircularProgress';
import { colors } from '../../constants/colors';

export function BudgetUsage({ usagePercent, expenses, remaining }: { usagePercent: number, expenses: number, remaining: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Budget Usage</Text>
      <View style={styles.usageRingWrapper}>
        <CircularProgress percent={usagePercent} size={160} strokeWidth={12} />
        <View style={styles.usageRingLabel}>
          <Text style={styles.usagePercentText}>{usagePercent}%</Text>
          <Text style={styles.usageSubText}>Used</Text>
        </View>
      </View>
      <View style={styles.usageFooterRow}>
        <View>
          <Text style={styles.usageFooterLabel}>Budget Used</Text>
          <Text style={styles.usageFooterValue}>
            £{expenses.toLocaleString('en-GB')}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.usageFooterLabel}>Remaining</Text>
          <Text style={[styles.usageFooterValue, { color: colors.primary }]}>
            £{remaining.toLocaleString('en-GB')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceVariant,
    padding: 24,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardTitle: {
    alignSelf: 'flex-start',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.onSurface,
  },
  usageRingWrapper: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  usageRingLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usagePercentText: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    color: colors.onSurface,
  },
  usageSubText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  usageFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  usageFooterLabel: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  usageFooterValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.onSurface,
    marginTop: 2,
  },
});
