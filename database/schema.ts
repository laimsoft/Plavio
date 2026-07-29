import { getDatabase } from './db';

/**
 * Run this function when the app starts to initialize the database tables.
 * We will populate this with CREATE TABLE statements later.
 */
export const initDatabase = async () => {
  const db = await getDatabase();
  
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category_id INTEGER,
      dueLabel TEXT,
      dueIcon TEXT,
      dueColor TEXT,
      priority TEXT,
      trailingIcon TEXT,
      completed INTEGER DEFAULT 0,
      completedLabel TEXT,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    );

    CREATE TABLE IF NOT EXISTS account_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      transaction_name TEXT NOT NULL,
      description TEXT,
      transaction_type TEXT NOT NULL
          CHECK(transaction_type IN (
              'Budget',
              'Expense',
              'Saving',
              'Income',
              'Debt',
              'Loan',
              'Transfer'
          )),
      category_id INTEGER,
      amount REAL NOT NULL
          CHECK(amount > 0),
      transaction_date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        total_budget REAL NOT NULL DEFAULT 0
            CHECK(total_budget >= 0),
        current_balance REAL NOT NULL DEFAULT 0,
        remaining_balance REAL NOT NULL DEFAULT 0,
        total_savings REAL NOT NULL DEFAULT 0
            CHECK(total_savings >= 0),
        currency TEXT NOT NULL DEFAULT 'PKR',
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert default categories if none exist
  const countResult = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM categories');
  if (countResult && countResult.count === 0) {
    await db.execAsync(`
      INSERT INTO categories (name) VALUES ('All');
      INSERT INTO categories (name) VALUES ('Personal');
      INSERT INTO categories (name) VALUES ('Work');
      INSERT INTO categories (name) VALUES ('Shopping');
    `);
  }

  // Insert default account if none exists
  const accountCountResult = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM accounts');
  if (accountCountResult && accountCountResult.count === 0) {
    await db.execAsync(`
      INSERT INTO accounts (total_budget, total_savings, currency) VALUES (0, 0, 'PKR');
    `);
  }

  console.log('Database initialized');
};
