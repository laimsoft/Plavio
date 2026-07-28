import { getDatabase } from './db';
import { Task } from '@/components/tasks/types';

export type CategoryRow = {
  id: number;
  name: string;
};

export type TaskRow = {
  id: number;
  title: string;
  category_id: number | null;
  dueLabel: string | null;
  dueIcon: string | null;
  dueColor: string | null;
  priority: string | null;
  trailingIcon: string | null;
  completed: number;
  completedLabel: string | null;
};

export const getCategories = async (): Promise<CategoryRow[]> => {
  const db = await getDatabase();
  return await db.getAllAsync<CategoryRow>('SELECT * FROM categories ORDER BY id ASC');
};

export const createCategory = async (name: string): Promise<CategoryRow> => {
  const db = await getDatabase();
  const result = await db.runAsync('INSERT INTO categories (name) VALUES (?)', name);
  return { id: result.lastInsertRowId, name };
};

export const getTasks = async (categoryId?: number): Promise<TaskRow[]> => {
  const db = await getDatabase();
  if (categoryId) {
    return await db.getAllAsync<TaskRow>('SELECT * FROM tasks WHERE category_id = ? ORDER BY id DESC', categoryId);
  }
  return await db.getAllAsync<TaskRow>('SELECT * FROM tasks ORDER BY id DESC');
};

export const createTask = async (
  title: string,
  categoryId: number | null,
  priority: string | null
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO tasks (title, category_id, priority, completed) VALUES (?, ?, ?, 0)`,
    title,
    categoryId,
    priority
  );
};

export const toggleTaskCompletion = async (id: number, currentStatus: boolean): Promise<void> => {
  const db = await getDatabase();
  const newStatus = currentStatus ? 0 : 1;
  await db.runAsync('UPDATE tasks SET completed = ? WHERE id = ?', newStatus, id);
};

export const updateTask = async (
  id: number,
  title: string,
  categoryId: number | null,
  priority: string | null
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE tasks SET title = ?, category_id = ?, priority = ? WHERE id = ?',
    title,
    categoryId,
    priority,
    id
  );
};

export const deleteTask = async (id: number): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM tasks WHERE id = ?', id);
};
