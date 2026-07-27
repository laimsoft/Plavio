import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';

type HeaderProps = {
  insetsTop: number;
};

export default function Header({ insetsTop }: HeaderProps) {
  return (
    <View style={[styles.header, { paddingTop: insetsTop }]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.7}>
            <MaterialIcons name="calendar-today" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Good morning, User</Text>
        </View>
        <TouchableOpacity style={styles.headerIconButton} activeOpacity={0.7}>
          <MaterialIcons name="notifications" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surfaceContainerLowest,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceVariant,
  },
  headerRow: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconButton: {
    padding: 8,
    borderRadius: 999,
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: colors.primary,
  },
});
