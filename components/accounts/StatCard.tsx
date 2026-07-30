import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export type StatCardProps = {
  icon: keyof typeof MaterialIcons.glyphMap | string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  valueColor?: string;
  onPress?: () => void;
};

export function StatCard({ icon, iconBg, iconColor, label, value, valueColor, onPress }: StatCardProps) {
  const Container = onPress ? TouchableOpacity : (View as any);

  return (
    <Container 
      style={styles.statCard}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={[styles.statIconCircle, { backgroundColor: iconBg }]}>
        <MaterialIcons name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={[styles.statValue, valueColor ? { color: valueColor } : null]}>
          {value}
        </Text>
      </View>
      <View style={styles.chevronContainer}>
        <MaterialIcons name="chevron-right" size={16} color="#9ca3af" />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  statCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    justifyContent: 'space-between',
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  textContainer: {
    gap: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  chevronContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
