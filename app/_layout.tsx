import BottomNav from '@/components/common/BottomNav';
import Header from '@/components/common/Header';
import { colors } from '@/constants/colors';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { initDatabase } from '@/database/schema';
import { SettingsProvider } from '@/contexts/SettingsContext';

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const setupDb = async () => {
      try {
        await initDatabase();
        setDbReady(true);
      } catch (error) {
        console.error('Database initialization failed:', error);
      }
    };
    setupDb();
  }, []);

  if (!dbReady) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.onSurfaceVariant }}>Initializing Database...</Text>
      </View>
    );
  }

  return (
    <SettingsProvider>
      <View style={styles.container}>
        <Header insetsTop={insets.top} />
        <View style={[styles.content, { paddingTop: insets.top + 80 }]}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        <BottomNav insetsBottom={insets.bottom} />
        <StatusBar style="auto" />
      </View>
    </SettingsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
