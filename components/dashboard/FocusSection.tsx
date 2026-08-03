import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../constants/colors';
import { getTasks, TaskRow } from '../../database/queries';

export default function FocusSection() {
  const [focusItems, setFocusItems] = useState<TaskRow[]>([]);
  const router = useRouter();

  const loadTasks = async () => {
    try {
      const allTasks = await getTasks();
      const pendingTasks = allTasks.filter(t => t.completed === 0);

      const priorityWeight = (p: string | null) => {
        if (!p) return 0;
        const lower = p.toLowerCase();
        if (lower === 'high') return 3;
        if (lower === 'medium') return 2;
        if (lower === 'low') return 1;
        return 0;
      };

      pendingTasks.sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority));

      // Show exactly 3 items as requested
      setFocusItems(pendingTasks.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const getPriorityBg = (priority: string | null) => {
    if (!priority) return colors.primaryContainer;
    const lower = priority.toLowerCase();
    if (lower === 'high') return colors.errorContainer;
    if (lower === 'medium') return colors.tertiaryContainer;
    return colors.primaryContainer;
  };

  return (
    <View style={styles.focusSection}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Upcoming Focus</Text>
        <TouchableOpacity onPress={() => router.navigate('/tasks')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {focusItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No tasks yet.</Text>
        </View>
      ) : (
        focusItems.map((item) => (
          <TouchableOpacity
            key={item.id.toString()}
            style={styles.focusRow}
            activeOpacity={0.7}
            onPress={() => router.navigate('/tasks')}
          >
            <View style={[styles.focusIconCircle, { backgroundColor: getPriorityBg(item.priority) }]}>
              <MaterialIcons
                name={item.priority?.toLowerCase() === 'high' ? 'priority-high' : 'checklist'}
                size={22}
                color="#ffffff"
              />
            </View>
            <View style={styles.focusTextWrapper}>
              <Text style={styles.focusTitle} numberOfLines={1}>{item.title}</Text>
              <Text
                style={[
                  styles.focusSubtitle,
                  item.priority?.toLowerCase() === 'high' && { color: colors.error },
                ]}
              >
                {item.priority ? `${item.priority} Priority` : 'Task'}
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={colors.outline} />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  focusSection: {
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.onSurface,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  focusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  focusIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusTextWrapper: {
    flex: 1,
  },
  focusTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: colors.onSurface,
  },
  focusSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
    borderStyle: 'dashed',
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },
});
