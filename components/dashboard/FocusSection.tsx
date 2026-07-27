import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';

type FocusItem = {
  key: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  subtitleColor?: string;
};

const focusItems: FocusItem[] = [
  {
    key: 'proposal',
    icon: 'checklist',
    iconBg: 'rgba(47,84,235,0.2)',
    iconColor: colors.primary,
    title: 'Finalize Project Proposal',
    subtitle: 'Today, 2:00 PM',
  },
  {
    key: 'electricity',
    icon: 'receipt-long',
    iconBg: 'rgba(255,218,214,0.4)',
    iconColor: colors.onErrorContainer,
    title: 'Electricity Bill',
    subtitle: 'Due Tomorrow - $85.00',
    subtitleColor: colors.error,
  },
  {
    key: 'registration',
    icon: 'local-car-wash',
    iconBg: 'rgba(217,224,240,0.5)',
    iconColor: colors.onSecondaryContainer,
    title: 'Vehicle Registration',
    subtitle: 'In 3 Days',
  },
  {
    key: 'grocery',
    icon: 'shopping-cart',
    iconBg: 'rgba(179,61,0,0.2)',
    iconColor: colors.tertiaryContainer,
    title: 'Grocery Restock',
    subtitle: 'Weekend Plan',
  },
];

export default function FocusSection() {
  return (
    <View style={styles.focusSection}>
      <Text style={styles.sectionTitle}>Upcoming Focus</Text>
      {focusItems.map((item) => (
        <TouchableOpacity key={item.key} style={styles.focusRow} activeOpacity={0.7}>
          <View style={[styles.focusIconCircle, { backgroundColor: item.iconBg }]}>
            <MaterialIcons name={item.icon} size={22} color={item.iconColor} />
          </View>
          <View style={styles.focusTextWrapper}>
            <Text style={styles.focusTitle}>{item.title}</Text>
            <Text
              style={[
                styles.focusSubtitle,
                item.subtitleColor && { color: item.subtitleColor },
              ]}
            >
              {item.subtitle}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={22} color={colors.outline} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  focusSection: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 4,
  },
  focusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  focusIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusTextWrapper: {
    flex: 1,
  },
  focusTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.onSurface,
  },
  focusSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
