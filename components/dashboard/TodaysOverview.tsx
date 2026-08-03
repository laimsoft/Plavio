import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getTasks } from '../../database/queries';

export default function TodaysOverview() {
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  const loadTasks = async () => {
    try {
      const allTasks = await getTasks();
      const completedTasks = allTasks.filter(t => t.completed === 1).length;
      const pendingTasks = allTasks.filter(t => t.completed === 0).length;
      setCompleted(completedTasks);
      setPending(pendingTasks);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const total = completed + pending;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  // Actually the design shows 100% hardcoded or calculated. We will calculate it.
  const displayProgress = total === 0 ? 0 : progress;

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>Today's Overview</Text>
        <View style={styles.dateContainer}>
          <MaterialIcons name="calendar-today" size={14} color="#14b8a6" />
          <Text style={styles.dateText}>May 2, 2025</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.iconCircle, { backgroundColor: '#dcfce7' }]}>
            <MaterialIcons name="check" size={16} color="#22c55e" />
          </View>
          <Text style={styles.statValue}>{completed}</Text>
          <Text style={styles.statLabel}>Tasks Completed</Text>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.iconCircle, { backgroundColor: '#ffedd5' }]}>
            <MaterialIcons name="access-time" size={16} color="#f97316" />
          </View>
          <Text style={styles.statValue}>{pending}</Text>
          <Text style={styles.statLabel}>Tasks Pending</Text>
        </View>

        <View style={styles.statItem}>
          <View style={[styles.iconCircle, { backgroundColor: '#eff6ff' }]}>
            <MaterialIcons name="play-arrow" size={16} color="#3b82f6" />
          </View>
          <Text style={styles.statValue}>{displayProgress}%</Text>
          <Text style={styles.statLabel}>Daily Progress</Text>
          <View style={styles.progressLine} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4faeb',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#e5f5d8',
    borderWidth: 1,
  },
  leftContent: {
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#14b8a6',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 20,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748b',
    textAlign: 'center',
    width: 50,
  },
  progressLine: {
    position: 'absolute',
    bottom: -12,
    width: '100%',
    height: 4,
    backgroundColor: '#14b8a6',
    borderRadius: 2,
  },
});
