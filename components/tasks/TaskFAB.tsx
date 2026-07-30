import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { extra } from './constants';
import { LinearGradient } from 'expo-linear-gradient';

type TaskFABProps = {
    onPress: () => void;
};

export default function TaskFAB({ onPress }: TaskFABProps) {
    return (
        <TouchableOpacity style={styles.fabContainer} activeOpacity={0.85} onPress={onPress}>
            <LinearGradient
                colors={['#10B981', '#06B6D4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.fab}
            >
                <MaterialIcons name="add" size={32} color="#FFFFFF" />
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fabContainer: {
        position: 'absolute',
        right: 20,
        bottom: 130,
        width: 60,
        height: 60,
        borderRadius: 20,
        shadowColor: '#06B6D4',
        shadowOpacity: 0.3,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
    fab: {
        flex: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
