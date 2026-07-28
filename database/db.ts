import * as SQLite from 'expo-sqlite';

let dbInstance: SQLite.SQLiteDatabase | null = null;

/**
 * Initializes and returns the SQLite database instance.
 * The database 'plavio.db' is automatically created in the app's document directory if it doesn't exist.
 */
export const getDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('plavio.db');
  }
  return dbInstance;
};

/**
 * Synchronous alternative to get the database instance.
 * Useful if you want to initialize it synchronously, though async is often preferred.
 */
export const getDatabaseSync = () => {
  if (!dbInstance) {
    dbInstance = SQLite.openDatabaseSync('plavio.db');
  }
  return dbInstance;
};
