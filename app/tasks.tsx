import CreateTaskModal from '@/components/tasks/CreateTaskModal';
import TaskCard from '@/components/tasks/TaskCard';
import TaskFAB from '@/components/tasks/TaskFAB';
import TaskFilters from '@/components/tasks/TaskFilters';
import { Task } from '@/components/tasks/types';
import { colors } from '@/constants/colors';
import {
    CategoryRow,
    TaskRow,
    createCategory,
    createTask,
    deleteTask,
    getCategories,
    getTasks,
    toggleTaskCompletion,
    updateTask
} from '@/database/queries';
import { initDatabase } from '@/database/schema';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const mapTaskRowToTask = (row: TaskRow): Task => ({
    id: String(row.id),
    title: row.title,
    categoryId: row.category_id,
    dueLabel: row.dueLabel || '',
    dueIcon: (row.dueIcon as any) || 'schedule',
    dueColor: row.dueColor || undefined,
    priority: row.priority as any,
    trailingIcon: row.trailingIcon as any,
    completed: row.completed === 1,
    completedLabel: row.completedLabel || undefined,
});

export default function TasksScreen() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [categories, setCategories] = useState<CategoryRow[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    useEffect(() => {
        const setup = async () => {
            await loadData();
            setIsReady(true);
        };
        setup();
    }, []);

    useEffect(() => {
        if (isReady) {
            loadTasks(activeCategoryId);
        }
    }, [activeCategoryId]);

    const loadData = async () => {
        const cats = await getCategories();
        setCategories(cats);
        if (cats.length > 0 && activeCategoryId === null) {
            // Default to 'All' which is usually the first inserted
            const allCat = cats.find(c => c.name === 'All') || cats[0];
            setActiveCategoryId(allCat.id);
        } else {
            await loadTasks(activeCategoryId);
        }
    };

    const loadTasks = async (categoryId: number | null) => {
        if (!categoryId) return;
        // If it's the 'All' category, fetch all tasks
        const selectedCat = categories.find(c => c.id === categoryId);
        const fetchCategoryId = selectedCat?.name === 'All' ? undefined : categoryId;

        const taskRows = await getTasks(fetchCategoryId);
        setTasks(taskRows.map(mapTaskRowToTask));
    };

    const handleToggleTask = async (id: string) => {
        const numericId = parseInt(id, 10);
        const task = tasks.find((t) => t.id === id);
        if (task) {
            // Optimistic update
            setTasks((prev) =>
                prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
            );
            await toggleTaskCompletion(numericId, task.completed);
        }
    };

    const handleSaveTask = async (title: string, categoryId: number | null, priority: string | null, taskId?: string) => {
        if (taskId) {
            await updateTask(parseInt(taskId, 10), title, categoryId, priority);
        } else {
            await createTask(title, categoryId, priority);
        }
        setModalVisible(false);
        setTaskToEdit(null);
        await loadTasks(activeCategoryId);
    };

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setModalVisible(true);
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTask(parseInt(id, 10));
        await loadTasks(activeCategoryId);
    };

    const handleCreateCategory = async (name: string) => {
        const newCat = await createCategory(name);
        setCategories((prev) => [...prev, newCat]);
    };

    if (!isReady) {
        return (
            <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: colors.onSurfaceVariant }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <TaskFilters
                categories={categories}
                activeCategoryId={activeCategoryId}
                onCategorySelect={setActiveCategoryId}
            />

            <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            >
                {tasks.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No tasks yet.</Text>
                    </View>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={handleToggleTask}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                        />
                    ))
                )}

                <View style={{ height: 80 }} />
            </ScrollView>

            <TaskFAB onPress={() => { setTaskToEdit(null); setModalVisible(true); }} />

            <CreateTaskModal
                visible={modalVisible}
                categories={categories.filter(c => c.name !== 'All')}
                initialTask={taskToEdit}
                onClose={() => { setModalVisible(false); setTaskToEdit(null); }}
                onSave={handleSaveTask}
                onCreateCategory={handleCreateCategory}
            />
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
    emptyState: {
        paddingVertical: 32,
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 16,
        color: colors.onSurfaceVariant,
    },
});