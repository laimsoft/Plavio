import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Coming Soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.onSurface,
    fontWeight: '500',
  },
});
