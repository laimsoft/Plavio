import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { extra } from './constants';

type TaskFABProps = {
    onPress: () => void;
};

export default function TaskFAB({ onPress }: TaskFABProps) {
    return (
        <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={onPress}>
            <MaterialIcons name="add" size={26} color={extra.onPrimary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 110,
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
