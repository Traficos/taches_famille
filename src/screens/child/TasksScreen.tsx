import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';
import { getTasksForChild, getFreeTasks, completeTask, isTaskCompletedToday, claimFreeTask, isTaskScheduledToday, Task } from '../../api/tasks';
import { updateChildPoints, updateAnimalStage, getProfileById } from '../../api/profiles';
import { getStageForPoints } from '../../constants/animals';
import TaskCard from '../../components/TaskCard';
import PointsBadge from '../../components/PointsBadge';
import CelebrationOverlay from '../../components/CelebrationOverlay';
import TasksProgress from '../../components/TasksProgress';
import { AnimalAnimated } from '../../components/AnimalAnimated';
import { AnimalSVG } from '../../components/AnimalSVG';
import { AnimalType, AnimalStage } from '../../constants/animals';

interface TaskWithStatus extends Task {
  completedToday: boolean;
}

export default function TasksScreen() {
  const { currentProfile, setCurrentProfile } = useProfile();
  const theme = useTheme();
  const [myTasks, setMyTasks] = useState<TaskWithStatus[]>([]);
  const [freeTasks, setFreeTasks] = useState<TaskWithStatus[]>([]);
  const [celebration, setCelebration] = useState<number | null>(null);

  const loadTasks = useCallback(async () => {
    if (!currentProfile) return;
    const mine = await getTasksForChild(currentProfile.id);
    const free = await getFreeTasks();

    const mineToday = mine.filter(isTaskScheduledToday);
    const freeToday = free.filter(isTaskScheduledToday);

    const myWithStatus = await Promise.all(
      mineToday.map(async t => ({
        ...t,
        completedToday: await isTaskCompletedToday(t.id, currentProfile.id),
      }))
    );
    const freeWithStatus = await Promise.all(
      freeToday.map(async t => ({
        ...t,
        completedToday: await isTaskCompletedToday(t.id, currentProfile.id),
      }))
    );

    setMyTasks(myWithStatus);
    setFreeTasks(freeWithStatus);
  }, [currentProfile?.id]);

  useFocusEffect(useCallback(() => { loadTasks(); }, [loadTasks]));

  async function handleComplete(task: Task) {
    if (!currentProfile) return;
    await completeTask(task.id, currentProfile.id);
    await updateChildPoints(currentProfile.id, task.points);

    const fresh = await getProfileById(currentProfile.id);
    const newStage = getStageForPoints(fresh.total_points);
    if (newStage !== fresh.animal_stage) {
      await updateAnimalStage(currentProfile.id, newStage);
    }
    setCurrentProfile(await getProfileById(currentProfile.id));

    setCelebration(task.points);
    await loadTasks();
  }

  async function handleClaim(task: Task) {
    if (!currentProfile) return;
    await claimFreeTask(task.id, currentProfile.id);
    await loadTasks();
  }

  if (!currentProfile) return null;

  const myDone = myTasks.filter(t => t.completedToday).length;
  const myTotal = myTasks.length;

  const sections = [
    { title: 'Mes taches du jour', data: myTasks },
    ...(freeTasks.length > 0 ? [{ title: 'Taches disponibles', data: freeTasks }] : []),
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {celebration !== null && (
        <CelebrationOverlay points={celebration} onDone={() => setCelebration(null)} />
      )}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {currentProfile.animal_type && (
            <AnimalSVG
              animalType={currentProfile.animal_type as AnimalType}
              stage={(currentProfile.animal_stage || 'egg') as AnimalStage}
              size={40}
            />
          )}
          <Text style={styles.title}>Mes taches</Text>
        </View>
        <PointsBadge points={currentProfile.current_points} />
      </View>
      <TasksProgress done={myDone} total={myTotal} />
      <SectionList
        sections={sections}
        keyExtractor={item => String(item.id)}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TaskCard
            name={item.name}
            icon={item.icon}
            points={item.points}
            type={item.type}
            recurrence={item.recurrence}
            recurrenceDays={item.recurrence_days}
            completed={item.completedToday}
            isClaimed={item.assigned_to === currentProfile.id}
            onComplete={() => handleComplete(item)}
            onClaim={() => handleClaim(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            {currentProfile.animal_type && (
              <AnimalAnimated
                animalType={currentProfile.animal_type as AnimalType}
                stage={(currentProfile.animal_stage || 'egg') as AnimalStage}
                mood="idle"
                size={120}
              />
            )}
            <Text style={styles.emptyTitle}>Pas de taches aujourd'hui</Text>
            <Text style={styles.emptySub}>Reviens demain ou demande a tes parents.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 16, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 22, fontWeight: '700', color: '#333' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#666', marginTop: 16, marginBottom: 8 },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
  emptyBox: { alignItems: 'center', marginTop: 40, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#444', marginTop: 12, textAlign: 'center' },
  emptySub: { fontSize: 14, color: '#888', marginTop: 6, textAlign: 'center' },
});
