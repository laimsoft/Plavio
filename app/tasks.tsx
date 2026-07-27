import TaskCard from '@/components/tasks/TaskCard';
import TaskFAB from '@/components/tasks/TaskFAB';
import TaskFilters from '@/components/tasks/TaskFilters';
import { extra } from '@/components/tasks/constants';
import { Task } from '@/components/tasks/types';
import { colors } from '@/constants/colors';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Review Project Proposal',
        dueLabel: 'Today, 5:00 PM',
        dueIcon: 'schedule',
        dueColor: extra.error,
        priority: 'High',
        completed: false,
    },
    {
        id: '2',
        title: 'Buy Groceries',
        dueLabel: 'Tomorrow, Morning',
        dueIcon: 'calendar-today',
        priority: 'Medium',
        trailingIcon: 'shopping-cart',
        completed: false,
    },
    {
        id: '3',
        title: 'Schedule Oil Change',
        dueLabel: '',
        dueIcon: 'schedule',
        priority: null,
        completed: true,
        completedLabel: 'Completed Yesterday',
    },
];

const categories = ['All', 'Personal', 'Work', 'Shopping', 'Car', 'Home'];

export default function TasksScreen() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [activeCategory, setActiveCategory] = useState('All');

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        );
    };

    return (
        <View style={styles.screen}>
            <TaskFilters
                categories={categories}
                activeCategory={activeCategory}
                onCategorySelect={setActiveCategory}
            />

            <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onToggle={toggleTask} />
                ))}

                {/* Spacer so the last card clears the FAB */}
                <View style={{ height: 80 }} />
            </ScrollView>

            <TaskFAB />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 16,
    },
});