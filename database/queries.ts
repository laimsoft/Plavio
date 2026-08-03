import { getDatabase } from './db';

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

export type AccountTransactionRow = {
  id: number;
  transaction_name: string;
  description: string | null;
  transaction_type: string;
  category_id: number | null;
  amount: number;
  transaction_date: string;
  created_at: string;
  updated_at: string;
};

export type SettingsRow = {
  id: number;
  currency: string;
  theme: string;
  date_format: string;
  time_format: string;
  language: string;
  notification_enabled: number;
  created_at: string;
  updated_at: string;
};

export const getSettings = async (): Promise<SettingsRow | null> => {
  const db = await getDatabase();
  return await db.getFirstAsync<SettingsRow>('SELECT * FROM settings LIMIT 1');
};

export const updateCurrency = async (newCurrency: string): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync('UPDATE settings SET currency = ?, updated_at = CURRENT_TIMESTAMP WHERE id = (SELECT id FROM settings LIMIT 1)', newCurrency);
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

export const getAccountTransactions = async (transactionType?: string): Promise<AccountTransactionRow[]> => {
  const db = await getDatabase();
  if (transactionType) {
    return await db.getAllAsync<AccountTransactionRow>(
      'SELECT * FROM account_transactions WHERE transaction_type = ? ORDER BY transaction_date DESC, id DESC',
      transactionType
    );
  }
  return await db.getAllAsync<AccountTransactionRow>('SELECT * FROM account_transactions ORDER BY transaction_date DESC, id DESC');
};

export const insertAccountTransaction = async (
  name: string,
  type: string,
  amount: number,
  date: string,
  description?: string,
  categoryId?: number
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO account_transactions (transaction_name, transaction_type, amount, transaction_date, description, category_id) VALUES (?, ?, ?, ?, ?, ?)`,
    name,
    type,
    amount,
    date,
    description || null,
    categoryId || null
  );
};

export type GroceryItemRow = {
  id: number;
  list_id: number;
  name: string;
  quantity: number;
  unit: string | null;
  category_id: number | null;
  purchased: number;
  notes: string | null;
  created_at: string;
  category_name?: string | null;
};

export const getGroceryItems = async (listId: number): Promise<GroceryItemRow[]> => {
  const db = await getDatabase();
  return await db.getAllAsync<GroceryItemRow>(
    `SELECT 
      gi.*, 
      c.name as category_name 
     FROM grocery_items gi 
     LEFT JOIN categories c ON gi.category_id = c.id 
     WHERE gi.list_id = ? 
     ORDER BY gi.purchased ASC, gi.created_at ASC`,
    listId
  );
};

export const addGroceryItem = async (
  listId: number,
  name: string,
  quantity: number,
  unit: string | null,
  categoryId: number | null,
  notes: string | null
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO grocery_items (list_id, name, quantity, unit, category_id, notes, purchased) 
     VALUES (?, ?, ?, ?, ?, ?, 0)`,
    listId,
    name,
    quantity,
    unit,
    categoryId,
    notes
  );
};

export const updateGroceryItem = async (
  id: number,
  name: string,
  quantity: number,
  unit: string | null,
  categoryId: number | null,
  notes: string | null
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    `UPDATE grocery_items 
     SET name = ?, quantity = ?, unit = ?, category_id = ?, notes = ? 
     WHERE id = ?`,
    name,
    quantity,
    unit,
    categoryId,
    notes,
    id
  );
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

export const deleteGroceryItem = async (id: number): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM grocery_items WHERE id = ?', id);
};

export const toggleGroceryItemPurchased = async (id: number, currentPurchased: number): Promise<void> => {
  const db = await getDatabase();
  const newStatus = currentPurchased ? 0 : 1;
  await db.runAsync('UPDATE grocery_items SET purchased = ? WHERE id = ?', newStatus, id);
};

export const clearGroceryItems = async (listId: number): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM grocery_items WHERE list_id = ?', listId);
};

export type BillRow = {
  id: number;
  name: string;
  category: string;
  amount: number;
  due_date: string;
  repeat_type: string;
  reminder_days: number;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export const getBills = async (): Promise<BillRow[]> => {
  const db = await getDatabase();
  return await db.getAllAsync<BillRow>('SELECT * FROM bills ORDER BY due_date ASC');
};

export const insertBill = async (
  name: string,
  category: string,
  amount: number,
  due_date: string,
  repeat_type: string = 'Monthly',
  status: string = 'Pending',
  notes?: string
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO bills (name, category, amount, due_date, repeat_type, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    name,
    category,
    amount,
    due_date,
    repeat_type,
    status,
    notes || null
  );
};

export const deleteBill = async (id: number): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM bills WHERE id = ?', id);
};

export const updateBill = async (
  id: number,
  name: string,
  category: string,
  amount: number,
  due_date: string,
  repeat_type: string = 'Monthly',
  status: string = 'Pending',
  notes?: string
): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    `UPDATE bills SET name = ?, category = ?, amount = ?, due_date = ?, repeat_type = ?, status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    name,
    category,
    amount,
    due_date,
    repeat_type,
    status,
    notes || null,
    id
  );
};

export const updateBillStatus = async (id: number, status: string): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE bills SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    status,
    id
  );
};

export const clearAccountsData = async (): Promise<void> => {
  const db = await getDatabase();
  await db.runAsync('DELETE FROM account_transactions');
  await db.runAsync('UPDATE accounts SET total_budget = 0, current_balance = 0, remaining_balance = 0, total_savings = 0');
};
