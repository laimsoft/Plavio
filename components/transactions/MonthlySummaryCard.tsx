import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

type Props = {
    title: string;
    amount: number;
    changePercent?: number;
    progress?: {
        label: string;
        remainingAmount: number;
        totalAmount: number;
        percent: number;
    } | null;
    formatCurrency: (val: number) => string;
};

export default function MonthlySummaryCard({ title, amount, changePercent = 0, progress, formatCurrency }: Props) {
    return (
        <View style={styles.summaryCard}>
            <View style={styles.summaryHeaderRow}>
                <View>
                    <Text style={styles.summaryLabel}>{title}</Text>
                    <Text style={styles.summaryValue}>
                        {formatCurrency(amount)}
                    </Text>
                </View>
                <View style={styles.trendBadge}>
                    <MaterialIcons name="trending-up" size={16} color={colors.onErrorContainer} />
                    <Text style={styles.trendBadgeText}>+{changePercent}%</Text>
                </View>
            </View>

            {progress && (
                <View style={styles.summaryProgressSection}>
                    <View style={styles.summaryProgressLabels}>
                        <Text style={styles.summaryProgressLabel}>{progress.label}</Text>
                        <Text style={styles.summaryProgressValue}>
                            {formatCurrency(progress.remainingAmount)}
                        </Text>
                    </View>
                    <View style={styles.progressTrack}>
                        <View
                            style={[styles.progressFill, { width: `${progress.percent}%` }]}
                        />
                    </View>
                    <View style={styles.summaryFooterRow}>
                        <Text style={styles.summaryFooterText}>$0</Text>
                        <Text style={styles.summaryFooterText}>
                            {formatCurrency(progress.totalAmount)} Total
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    summaryCard: {
        backgroundColor: colors.surfaceContainerLowest,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.surfaceVariant,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
    },
    summaryHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    summaryLabel: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
        fontWeight: '500',
        color: colors.onSurfaceVariant,
        textTransform: 'uppercase',
    },
    summaryValue: {
        fontSize: 40,
        lineHeight: 48,
        letterSpacing: -0.4,
        fontWeight: '700',
        color: colors.onSurface,
        marginTop: 4,
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: colors.errorContainer,
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    trendBadgeText: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
        fontWeight: '500',
        color: colors.onErrorContainer,
    },
    summaryProgressSection: {
        marginTop: 16,
    },
    summaryProgressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryProgressLabel: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
        color: colors.onSurfaceVariant,
    },
    summaryProgressValue: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
        fontWeight: '600',
        color: colors.onSurface,
    },
    progressTrack: {
        width: '100%',
        height: 8,
        backgroundColor: colors.surfaceVariant,
        borderRadius: 999,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 999,
        backgroundColor: colors.primary,
    },
    summaryFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    summaryFooterText: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
        color: colors.onSurfaceVariant,
    },
});
