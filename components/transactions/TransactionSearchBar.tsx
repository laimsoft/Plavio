import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

type Props = {
    value: string;
    onChangeText: (text: string) => void;
};

export default function TransactionSearchBar({ value, onChangeText }: Props) {
    return (
        <View style={styles.searchBar}>
            <MaterialIcons name="search" size={22} color={colors.onSurfaceVariant} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search transactions..."
                placeholderTextColor={colors.onSurfaceVariant}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 48,
        paddingHorizontal: 12,
        backgroundColor: colors.surfaceContainerLow,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.outlineVariant,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        color: colors.onSurface,
        padding: 0,
    },
});
