import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';

type FABProps = {
  insetsBottom: number;
};

export default function FAB({ insetsBottom }: FABProps) {
  return (
    <TouchableOpacity
      style={[styles.fab, { bottom: 24 + insetsBottom }]}
      activeOpacity={0.85}
    >
      <MaterialIcons name="add" size={26} color={colors.onPrimary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 24,
    width: 56,

    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
});
