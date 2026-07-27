import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';

export type OverviewItem = {
  label: string;
  percent: number;
  color: keyof typeof colors;
};

export function FinancialOverview({ data }: { data: OverviewItem[] }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.cardTitle, { marginBottom: 8 }]}>
        Financial Overview
      </Text>
      {data.map((item) => (
        <View key={item.label} style={styles.overviewItem}>
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>{item.label}</Text>
            <Text style={styles.overviewPercent}>{item.percent}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${item.percent}%`,
                  backgroundColor: colors[item.color],
                },
              ]}
            />
          </View>
        </View>
      ))}
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
  overviewItem: {
    width: '100%',
    gap: 8,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  overviewLabel: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    fontWeight: '500',
    color: colors.onSurface,
  },
  overviewPercent: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
});
