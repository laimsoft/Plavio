import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '@/constants/colors';

export default function GroceryHeader() {
  const router = useRouter();

  return (
    <View style={styles.screenHeader}>
      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
      <Text style={styles.screenTitle}>Grocery List</Text>
      <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
        <MaterialIcons name="more-vert" size={24} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenHeader: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '700',
    color: colors.primary,
  },
});
