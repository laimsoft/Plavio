import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from './types';

type TaskCardProps = {
    task: Task;
    onToggle: (id: string) => void;
    onEdit?: (task: Task) => void;
    onDelete?: (id: string) => void;
};

export default function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
    return (
        <TouchableOpacity 
            style={[styles.taskCard, task.completed && styles.taskCardCompleted]}
            activeOpacity={0.8}
            onPress={() => onToggle(task.id)}
        >
            <LinearGradient
                colors={['#10B981', '#06B6D4']}
                style={styles.cardGradientBorder}
            />

            <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
                {task.completed && (
                    <MaterialIcons name="check" size={14} color="#FFFFFF" />
                )}
            </View>

            <View style={styles.taskContentWrapper}>
                <View style={styles.headerRow}>
                    <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
                        {task.title}
                    </Text>
                    <View style={styles.actionsContainer}>
                        {onEdit && (
                            <TouchableOpacity onPress={() => onEdit(task)} style={styles.actionBtn}>
                                <MaterialIcons name="edit" size={18} color="#6B7280" />
                            </TouchableOpacity>
                        )}
                        {onDelete && (
                            <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.actionBtn}>
                                <MaterialIcons name="delete-outline" size={18} color="#F87171" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {!task.completed && (
                    <View style={styles.badgesRow}>
                        {task.categoryId && (
                            <View style={styles.categoryBadge}>
                                <MaterialIcons name="person" size={10} color="#10B981" />
                                <Text style={styles.categoryBadgeText}>Personal</Text>
                                <View style={styles.categoryDot} />
                            </View>
                        )}
                        {task.priority && (
                            <View style={styles.priorityBadge}>
                                <MaterialIcons name={task.priority === 'High' ? 'arrow-upward' : 'remove'} size={10} color={task.priority === 'High' ? '#EF4444' : '#F97316'} />
                                <Text style={[styles.priorityBadgeText, { color: task.priority === 'High' ? '#EF4444' : '#F97316' }]}>{task.priority}</Text>
                            </View>
                        )}
                    </View>
                )}

                {task.completed ? (
                    <Text style={styles.completedLabel}>{task.completedLabel}</Text>
                ) : (
                    <View style={styles.footerRow}>
                        <View style={styles.metaGroup}>
                        </View>
                        {task.trailingIcon && !onEdit && !onDelete && (
                            <MaterialIcons name={task.trailingIcon} size={16} color="#9CA3AF" />
                        )}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    taskCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
    },
    taskCardCompleted: {
        opacity: 0.7,
    },
    cardGradientBorder: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 6,
    },
    checkbox: {
        marginTop: 2,
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#10B981',
        borderColor: '#10B981',
    },
    taskContentWrapper: {
        flex: 1,
        flexDirection: 'column',
        gap: 6,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    taskTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
        flex: 1,
    },
    taskTitleCompleted: {
        textDecorationLine: 'line-through',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionBtn: {
        padding: 0,
    },
    badgesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    categoryBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: '#ECFDF5',
        borderWidth: 1,
        borderColor: '#D1FAE5',
        borderRadius: 999,
    },
    categoryBadgeText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#10B981',
    },
    categoryDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#10B981',
        marginLeft: 2,
    },
    priorityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 2,
        backgroundColor: '#FEF2F2',
        borderWidth: 1,
        borderColor: '#FEE2E2',
        borderRadius: 999,
    },
    priorityBadgeText: {
        fontSize: 10,
        fontWeight: '500',
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
    },
    metaGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#9CA3AF',
    },
    metaDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#D1D5DB',
    },
    completedLabel: {
        fontSize: 14,
        lineHeight: 20,
        color: '#9CA3AF',
    },
});
