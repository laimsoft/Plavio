import { getDatabase } from './db';

/**
 * Run this function when the app starts to initialize the database tables.
 * We will populate this with CREATE TABLE statements later.
 */
export const initDatabase = async () => {
  console.log('Opening database...');
  const db = await getDatabase();
  
  await db.execAsync(`PRAGMA journal_mode = WAL;`);
  await db.execAsync(`PRAGMA foreign_keys = ON;`);

  console.log('Creating tables...');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS bills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      amount REAL NOT NULL CHECK(amount >= 0),
      due_date DATE NOT NULL,
      repeat_type TEXT NOT NULL DEFAULT 'Monthly'
          CHECK(repeat_type IN (
              'None',
              'Weekly',
              'Monthly',
              'Quarterly',
              'Yearly',
              'Custom'
          )),
      reminder_days INTEGER DEFAULT 3,
      status TEXT NOT NULL DEFAULT 'Pending'
          CHECK(status IN (
              'Pending',
              'Paid',
              'Overdue'
          )),
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );
  `);

  await db.execAsync(`
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
    );

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

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS grocery_lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `);

  console.log('Creating grocery_items...');
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS grocery_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        list_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        quantity REAL NOT NULL DEFAULT 1,
        unit TEXT,
        category_id INTEGER,
        purchased INTEGER NOT NULL DEFAULT 0 CHECK(purchased IN (0,1)),
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (list_id) REFERENCES grocery_lists(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE CASCADE
      );
    `);
  } catch (err) {
    console.error('Error creating grocery_items:', err);
    throw err;
  }

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

  // Insert default grocery list
  const listCountResult = await db.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM grocery_lists');
  if (listCountResult && listCountResult.count === 0) {
    await db.runAsync("INSERT INTO grocery_lists (name) VALUES ('Default List')");
  }

  // Verify tables exist
  const tables = await db.getAllAsync<{ name: string }>("SELECT name FROM sqlite_master WHERE type='table'");
  console.log('Found tables in database:', tables.map((t) => t.name).join(', '));

  const groceryItemsExists = tables.some((t) => t.name === 'grocery_items');
  if (!groceryItemsExists) {
    const errorMsg = 'CRITICAL ERROR: grocery_items table does not exist after initialization.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  console.log('Database initialized successfully.');
};
