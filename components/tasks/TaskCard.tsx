import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { extra } from './constants';
import { Task } from './types';

type TaskCardProps = {
    task: Task;
    onToggle: (id: string) => void;
};

export default function TaskCard({ task, onToggle }: TaskCardProps) {
    return (
        <View style={[styles.taskCard, task.completed && styles.taskCardCompleted]}>
            <TouchableOpacity
                style={[styles.checkbox, task.completed && styles.checkboxChecked]}
                activeOpacity={0.7}
                onPress={() => onToggle(task.id)}
            >
                {task.completed && (
                    <MaterialIcons name="check" size={14} color={extra.onPrimary} />
                )}
            </TouchableOpacity>

            <View style={styles.taskTextWrapper}>
                <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
                    {task.title}
                </Text>

                {task.completed ? (
                    <Text style={styles.completedLabel}>{task.completedLabel}</Text>
                ) : (
                    <View style={styles.metaRow}>
                        <View style={styles.metaGroup}>
                            <MaterialIcons
                                name={task.dueIcon}
                                size={16}
                                color={task.dueColor ?? colors.onSurfaceVariant}
                            />
                            <Text style={[styles.metaText, task.dueColor && { color: task.dueColor }]}>
                                {task.dueLabel}
                            </Text>
                        </View>

                        {task.priority && (
                            <>
                                <View style={styles.dot} />
                                <View
                                    style={[
                                        styles.priorityBadge,
                                        {
                                            backgroundColor:
                                                task.priority === 'High' ? extra.errorContainer : extra.primaryFixed,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.priorityText,
                                            { color: task.priority === 'High' ? extra.error : colors.primary },
                                        ]}
                                    >
                                        {task.priority}
                                    </Text>
                                </View>
                            </>
                        )}
                    </View>
                )}
            </View>

            {task.trailingIcon && (
                <View style={styles.trailingIconCircle}>
                    <MaterialIcons
                        name={task.trailingIcon}
                        size={18}
                        color={colors.onSurfaceVariant}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    taskCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
        backgroundColor: colors.surfaceContainerLowest,
        borderWidth: 1,
        borderColor: extra.surfaceContainerHigh,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
    },
    taskCardCompleted: {
        opacity: 0.7,
    },
    checkbox: {
        marginTop: 2,
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: extra.outlineVariant,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    taskTextWrapper: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
        color: extra.onSurface,
        marginBottom: 4,
    },
    taskTitleCompleted: {
        textDecorationLine: 'line-through',
    },
    completedLabel: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.onSurfaceVariant,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        flexWrap: 'wrap',
    },
    metaGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.onSurfaceVariant,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: extra.outlineVariant,
        marginHorizontal: 2,
    },
    priorityBadge: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    priorityText: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0.5,
        fontWeight: '500',
    },
    trailingIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: extra.surfaceContainer,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
