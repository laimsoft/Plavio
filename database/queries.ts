import { getDatabase } from './db';
import { Task } from '@/components/tasks/types';

export type CategoryRow = {
  id: number;
  name: string;
};

export type AccountRow = {
  id: number;
  total_budget: number;
  current_balance: number;
  remaining_balance: number;
  total_savings: number;
  currency: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
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

export const getAccount = async (): Promise<AccountRow | null> => {
  const db = await getDatabase();
  return await db.getFirstAsync<AccountRow>('SELECT * FROM accounts LIMIT 1');
};

export const updateAccount = async (
  totalBudget: number,
  totalSavings: number
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE accounts SET total_budget = ?, total_savings = ?, updated_at = CURRENT_TIMESTAMP WHERE id = (SELECT id FROM accounts LIMIT 1)',
    totalBudget,
    totalSavings
  );
};
