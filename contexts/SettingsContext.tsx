import React, { createContext, useContext, useEffect, useState } from 'react';
import { getSettings, updateCurrency as dbUpdateCurrency, SettingsRow } from '@/database/queries';

interface SettingsContextData {
  currency: string;
  updateCurrency: (newCurrency: string) => Promise<void>;
  formatCurrency: (value: number) => string;
  isReady: boolean;
}

const SettingsContext = createContext<SettingsContextData | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsRow | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSettings();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setIsReady(true);
      }
    };
    loadSettings();
  }, []);

  const updateCurrency = async (newCurrency: string) => {
    try {
      await dbUpdateCurrency(newCurrency);
      setSettings((prev) => prev ? { ...prev, currency: newCurrency } : null);
    } catch (error) {
      console.error('Error updating currency:', error);
    }
  };

  const formatCurrency = (value: number) => {
    const curr = settings?.currency || 'PKR';
    // Use the exact currency provided by SQLite
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: curr,
    }).format(value);
  };

  return (
    <SettingsContext.Provider value={{ currency: settings?.currency || 'PKR', updateCurrency, formatCurrency, isReady }}>
      {children}
    </SettingsContext.Provider>
  );
};
