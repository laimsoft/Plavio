import { MaterialIcons } from '@expo/vector-icons';

export type Priority = 'High' | 'Medium' | null;

export type Task = {
    id: string;
    title: string;
    categoryId?: number | null;
    dueLabel: string;
    dueIcon: keyof typeof MaterialIcons.glyphMap;
    dueColor?: string;
    priority: Priority;
    trailingIcon?: keyof typeof MaterialIcons.glyphMap;
    completed: boolean;
    completedLabel?: string;
};
