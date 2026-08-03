import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    onFilterPress?: () => void;
};

export default function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
    return (
        <View style={styles.searchSection}>
            <View style={styles.searchWrapper}>
                <MaterialIcons
                    name="search"
                    size={20}
                    color="#9CA3AF"
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search tasks..."
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChangeText}
                />
            </View>
            <TouchableOpacity style={styles.filterBtn} activeOpacity={0.7} onPress={onFilterPress}>
                <MaterialIcons name="tune" size={20} color="#4B5563" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchSection: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
        backgroundColor: '#F8F9FA',
        flexDirection: 'row',
        gap: 12,
    },
    searchWrapper: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: 16,
        zIndex: 1,
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        borderRadius: 16,
        paddingVertical: 14,
        paddingLeft: 44,
        paddingRight: 16,
        fontSize: 14,
        color: '#374151',
        height: 52,
    },
    filterBtn: {
        width: 52,
        height: 52,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
