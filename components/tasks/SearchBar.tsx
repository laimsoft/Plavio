import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';
import { extra } from './constants';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
    return (
        <View style={styles.searchSection}>
            <View style={styles.searchWrapper}>
                <MaterialIcons
                    name="search"
                    size={20}
                    color={colors.onSurfaceVariant}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search tasks..."
                    placeholderTextColor={colors.onSurfaceVariant}
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchSection: {
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor: colors.background,
    },
    searchWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: 16,
        zIndex: 1,
    },
    searchInput: {
        backgroundColor: extra.surfaceContainerLow,
        borderWidth: 1,
        borderColor: extra.outlineVariant,
        borderRadius: 999,
        paddingVertical: 12,
        paddingLeft: 48,
        paddingRight: 16,
        fontSize: 14,
        color: extra.onSurface,
    },
});
