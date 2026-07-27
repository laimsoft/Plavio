import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../constants/colors';

export default function SearchBar() {
  return (
    <View style={styles.searchWrapper}>
      <MaterialIcons
        name="search"
        size={22}
        color={colors.onSurfaceVariant}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks, bills, or notes..."
        placeholderTextColor={`${colors.onSurfaceVariant}b3`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    paddingVertical: 12,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 16,
    color: colors.onSurface,
  },
});
