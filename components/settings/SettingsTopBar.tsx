import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

export function SettingsTopBar() {
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarTitle}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fc',
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
});
