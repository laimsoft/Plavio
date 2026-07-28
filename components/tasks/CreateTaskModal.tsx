import { colors } from '@/constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { extra } from './constants';
import { CategoryRow } from '@/database/queries';
import { Task } from './types';
import { useEffect } from 'react';

type CreateTaskModalProps = {
    visible: boolean;
    categories: CategoryRow[];
    initialTask?: Task | null;
    onClose: () => void;
    onSave: (title: string, categoryId: number | null, priority: string | null, taskId?: string) => void;
    onCreateCategory: (name: string) => void;
};

export default function CreateTaskModal({
    visible,
    categories,
    initialTask,
    onClose,
    onSave,
    onCreateCategory,
}: CreateTaskModalProps) {
    const [title, setTitle] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [priority, setPriority] = useState<string | null>(null);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        if (visible && initialTask) {
            setTitle(initialTask.title);
            setSelectedCategoryId(initialTask.categoryId ?? null);
            setPriority(initialTask.priority);
        } else if (visible) {
            resetForm();
        }
    }, [visible, initialTask]);

    const handleSave = () => {
        if (!title.trim()) return;
        onSave(title, selectedCategoryId, priority, initialTask?.id);
        resetForm();
    };

    const resetForm = () => {
        setTitle('');
        setSelectedCategoryId(null);
        setPriority(null);
        setIsCreatingCategory(false);
        setNewCategoryName('');
    };

    const handleCreateCategory = () => {
        if (newCategoryName.trim()) {
            onCreateCategory(newCategoryName.trim());
            setNewCategoryName('');
            setIsCreatingCategory(false);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{initialTask ? 'Edit Task' : 'New Task'}</Text>
                        <TouchableOpacity onPress={() => { resetForm(); onClose(); }}>
                            <MaterialIcons name="close" size={24} color={extra.onSurface} />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Task Title"
                        placeholderTextColor={colors.onSurfaceVariant}
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                    />

                    <Text style={styles.sectionTitle}>Category</Text>
                    {isCreatingCategory ? (
                        <View style={styles.newCategoryRow}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginBottom: 0 }]}
                                placeholder="Category Name"
                                placeholderTextColor={colors.onSurfaceVariant}
                                value={newCategoryName}
                                onChangeText={setNewCategoryName}
                            />
                            <TouchableOpacity style={styles.saveCategoryBtn} onPress={handleCreateCategory}>
                                <Text style={styles.saveCategoryBtnText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelCategoryBtn} onPress={() => setIsCreatingCategory(false)}>
                                <MaterialIcons name="close" size={20} color={colors.error} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                            {categories.map((cat) => (
                                <TouchableOpacity
                                    key={cat.id}
                                    style={[styles.chip, selectedCategoryId === cat.id && styles.chipActive]}
                                    onPress={() => setSelectedCategoryId(cat.id)}
                                >
                                    <Text style={[styles.chipText, selectedCategoryId === cat.id && styles.chipTextActive]}>
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity
                                style={[styles.chip, styles.chipNew]}
                                onPress={() => setIsCreatingCategory(true)}
                            >
                                <MaterialIcons name="add" size={16} color={colors.primary} />
                                <Text style={[styles.chipText, { color: colors.primary, marginLeft: 4 }]}>New</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )}

                    <Text style={styles.sectionTitle}>Priority</Text>
                    <View style={styles.priorityRow}>
                        {['High', 'Medium', 'None'].map((p) => {
                            const pValue = p === 'None' ? null : p;
                            const isActive = priority === pValue;
                            return (
                                <TouchableOpacity
                                    key={p}
                                    style={[styles.chip, isActive && styles.chipActive]}
                                    onPress={() => setPriority(pValue)}
                                >
                                    <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{p}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={[styles.saveBtn, !title.trim() && styles.saveBtnDisabled]}
                        onPress={handleSave}
                        disabled={!title.trim()}
                    >
                        <Text style={styles.saveBtnText}>Save Task</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: extra.onSurface,
    },
    input: {
        backgroundColor: extra.surfaceContainerLow,
        borderWidth: 1,
        borderColor: extra.outlineVariant,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: extra.onSurface,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.onSurfaceVariant,
        marginBottom: 12,
    },
    categoryScroll: {
        marginBottom: 24,
        flexGrow: 0,
    },
    chip: {
        backgroundColor: extra.surfaceContainerHigh,
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipActive: {
        backgroundColor: colors.primary,
    },
    chipNew: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    chipText: {
        fontSize: 14,
        fontWeight: '500',
        color: extra.onSurface,
    },
    chipTextActive: {
        color: extra.onPrimary,
    },
    newCategoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 8,
    },
    saveCategoryBtn: {
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
    },
    saveCategoryBtnText: {
        color: extra.onPrimary,
        fontWeight: 'bold',
    },
    cancelCategoryBtn: {
        padding: 12,
    },
    priorityRow: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    saveBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    saveBtnDisabled: {
        opacity: 0.5,
    },
    saveBtnText: {
        color: extra.onPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
