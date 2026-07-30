import { CategoryRow } from '@/database/queries';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Keyboard,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Task } from './types';

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

    const slideAnim = useRef(new Animated.Value(0)).current;
    const [showModal, setShowModal] = useState(visible);
    const [kbHeight, setKbHeight] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSub = Keyboard.addListener(showEvent, (e) => {
            setKbHeight(e.endCoordinates.height);
        });
        const hideSub = Keyboard.addListener(hideEvent, () => {
            setKbHeight(0);
        });
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            Animated.spring(slideAnim, {
                toValue: 1,
                useNativeDriver: true,
                bounciness: 4,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }).start(() => {
                setShowModal(false);
            });
        }
    }, [visible, slideAnim]);

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

    const translateY = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0], // Slide up from bottom
    });

    if (!showModal) return null;

    const OBSCURED_HEIGHT = 190; // Height of priority and save button sections
    const bottomMargin = kbHeight > 0 
        ? (Platform.OS === 'ios' ? kbHeight - OBSCURED_HEIGHT : -OBSCURED_HEIGHT) 
        : 0;

    return (
        <Modal visible={showModal} animationType="fade" transparent onRequestClose={onClose}>
            <View style={styles.overlay}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <View style={StyleSheet.absoluteFillObject} />
                </TouchableWithoutFeedback>
                <Animated.View style={[styles.content, { transform: [{ translateY }], marginBottom: bottomMargin }]}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{initialTask ? 'Edit Task' : 'New Task'}</Text>
                        <TouchableOpacity onPress={() => { resetForm(); onClose(); }}>
                            <MaterialIcons name="close" size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Task Title"
                        placeholderTextColor="#9CA3AF"
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
                                placeholderTextColor="#9CA3AF"
                                value={newCategoryName}
                                onChangeText={setNewCategoryName}
                            />
                            <TouchableOpacity activeOpacity={0.7} onPress={handleCreateCategory}>
                                <LinearGradient
                                    colors={['#10B981', '#06B6D4']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.saveCategoryBtn}
                                >
                                    <Text style={styles.saveCategoryBtnText}>Add</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelCategoryBtn} onPress={() => setIsCreatingCategory(false)}>
                                <MaterialIcons name="close" size={24} color="#EF4444" />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                            {categories.map((cat) => {
                                const isActive = selectedCategoryId === cat.id;
                                return isActive ? (
                                    <TouchableOpacity
                                        key={cat.id}
                                        activeOpacity={0.7}
                                        onPress={() => setSelectedCategoryId(cat.id)}
                                    >
                                        <LinearGradient
                                            colors={['#10B981', '#06B6D4']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.chipActive}
                                        >
                                            <Text style={styles.chipTextActive}>{cat.name}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={styles.chip}
                                        onPress={() => setSelectedCategoryId(cat.id)}
                                    >
                                        <Text style={styles.chipText}>{cat.name}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                            <TouchableOpacity
                                style={[styles.chip, styles.chipNew]}
                                onPress={() => setIsCreatingCategory(true)}
                            >
                                <MaterialIcons name="add" size={16} color="#10B981" />
                                <Text style={[styles.chipText, { color: '#10B981', marginLeft: 4 }]}>New</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )}

                    <Text style={styles.sectionTitle}>Priority</Text>
                    <View style={styles.priorityRow}>
                        {['High', 'Medium', 'None'].map((p) => {
                            const pValue = p === 'None' ? null : p;
                            const isActive = priority === pValue;
                            return isActive ? (
                                <TouchableOpacity
                                    key={p}
                                    activeOpacity={0.7}
                                    onPress={() => setPriority(pValue)}
                                >
                                    <LinearGradient
                                        colors={['#10B981', '#06B6D4']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.chipActive}
                                    >
                                        <Text style={styles.chipTextActive}>{p}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    key={p}
                                    style={styles.chip}
                                    onPress={() => setPriority(pValue)}
                                >
                                    <Text style={styles.chipText}>{p}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleSave}
                        disabled={!title.trim()}
                    >
                        <LinearGradient
                            colors={['#10B981', '#06B6D4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.saveBtn}
                        >
                            <Text style={styles.saveBtnText}>Save Task</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
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
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
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
        color: '#1F2937',
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1F2937',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 12,
    },
    categoryScroll: {
        marginBottom: 24,
        flexGrow: 0,
    },
    chip: {
        backgroundColor: '#F3F4F6',
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipActive: {
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    chipNew: {
        backgroundColor: '#ECFDF5',
        borderWidth: 1,
        borderColor: '#10B981',
    },
    chipText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    chipTextActive: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    newCategoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 8,
    },
    saveCategoryBtn: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveCategoryBtnText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    cancelCategoryBtn: {
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priorityRow: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    saveBtn: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    saveBtnDisabled: {
        opacity: 0.5,
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
