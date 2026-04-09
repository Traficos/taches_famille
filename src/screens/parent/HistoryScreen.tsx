import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllProfiles, Profile } from '../../api/profiles';
import { cancelCompletion } from '../../api/tasks';
import { TASK_ICONS } from '../../constants/taskIcons';
import { getPenaltiesForProfile, Penalty } from '../../api/penalties';
import { apiFetch } from '../../api/client';

interface TaskCompletionRaw {
  id: number;
  task_id: number;
  profile_id: number;
  completed_at: string;
  task_name: string;
  task_points: number;
  task_icon: string;
}

interface HistoryEntry {
  id: number;
  profile_id: number;
  type: 'completion' | 'penalty';
  task_name: string;
  task_icon: string;
  task_points: number;
  child_name: string;
  completed_at: string;
  penalty_reason?: string;
}

async function getCompletionsForChild(profileId: number): Promise<TaskCompletionRaw[]> {
  return apiFetch<TaskCompletionRaw[]>(`/tasks/completions/history/${profileId}`);
}

export default function HistoryScreen() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [children, setChildren] = useState<Profile[]>([]);
  const [selectedChild, setSelectedChild] = useState<number | null>(null);

  const load = useCallback(async () => {
    const allProfiles = await getAllProfiles();
    const kids = allProfiles.filter(p => p.type === 'child');
    setChildren(kids);

    const targetKids = selectedChild ? kids.filter(k => k.id === selectedChild) : kids;

    const allEntries: HistoryEntry[] = [];

    for (const child of targetKids) {
      let completions: TaskCompletionRaw[] = [];
      try {
        completions = await getCompletionsForChild(child.id);
      } catch {
        completions = [];
      }

      const completionEntries: HistoryEntry[] = completions.map(c => ({
        id: c.id,
        profile_id: c.profile_id,
        type: 'completion' as const,
        task_name: c.task_name,
        task_icon: c.task_icon,
        task_points: c.task_points,
        child_name: child.name,
        completed_at: c.completed_at,
      }));

      let penalties: Penalty[] = [];
      try {
        penalties = await getPenaltiesForProfile(child.id);
      } catch {
        penalties = [];
      }

      const penaltyEntries: HistoryEntry[] = penalties.map(p => ({
        id: p.id,
        profile_id: p.profile_id,
        type: 'penalty' as const,
        task_name: p.reason,
        task_icon: 'penalty',
        task_points: p.points,
        child_name: child.name,
        completed_at: p.created_at,
        penalty_reason: p.reason,
      }));

      allEntries.push(...completionEntries, ...penaltyEntries);
    }

    const merged = allEntries
      .sort((a, b) => b.completed_at.localeCompare(a.completed_at))
      .slice(0, 100);
    setEntries(merged);
  }, [selectedChild]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  async function handleCancel(entry: HistoryEntry) {
    const message = `${entry.task_name} par ${entry.child_name} (−${entry.task_points} pts)`;

    const doCancel = async () => {
      await cancelCompletion(entry.id, entry.profile_id, entry.task_points);
      await load();
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Annuler cette réalisation ?\n${message}`)) {
        await doCancel();
      }
    } else {
      Alert.alert(
        'Annuler cette réalisation ?',
        message,
        [
          { text: 'Non', style: 'cancel' },
          { text: 'Oui, annuler', style: 'destructive', onPress: doCancel },
        ],
      );
    }
  }

  const taskIcon = (key: string) => TASK_ICONS.find(i => i.key === key)?.emoji ?? '📌';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Historique</Text>

      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.chip, !selectedChild && styles.chipActive]}
          onPress={() => setSelectedChild(null)}
        >
          <Text style={[styles.chipText, !selectedChild && styles.chipTextActive]}>Tous</Text>
        </TouchableOpacity>
        {children.map(c => (
          <TouchableOpacity
            key={c.id}
            style={[styles.chip, selectedChild === c.id && styles.chipActive]}
            onPress={() => setSelectedChild(c.id)}
          >
            <Text style={[styles.chipText, selectedChild === c.id && styles.chipTextActive]}>{c.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={entries}
        keyExtractor={item => `${item.type}-${item.id}`}
        renderItem={({ item }) => (
          <View style={[styles.entry, item.type === 'penalty' && styles.entryPenalty]}>
            <View style={styles.entryLeft}>
              <Text style={styles.entryTask}>
                {item.type === 'penalty' ? '⚠️' : taskIcon(item.task_icon)} {item.task_name}
              </Text>
              <Text style={styles.entryInfo}>{item.child_name} • {new Date(item.completed_at).toLocaleDateString('fr-FR')}</Text>
            </View>
            <View style={styles.entryRight}>
              <Text style={item.type === 'penalty' ? styles.entryPointsPenalty : styles.entryPoints}>
                {item.type === 'penalty' ? `−${item.task_points} pts` : `+${item.task_points} pts`}
              </Text>
              {item.type === 'completion' && (
                <TouchableOpacity onPress={() => handleCancel(item)} style={styles.cancelBtn}>
                  <Text style={styles.cancelBtnText}>Annuler</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun historique</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 16, paddingTop: 50 },
  title: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 16 },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  chip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#eee' },
  chipActive: { backgroundColor: '#1565c0' },
  chipText: { fontSize: 13, color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  entry: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  entryPenalty: { borderLeftWidth: 3, borderLeftColor: '#e53935' },
  entryLeft: { flex: 1 },
  entryRight: { alignItems: 'flex-end', gap: 6 },
  entryTask: { fontSize: 15, fontWeight: '600', color: '#333' },
  entryInfo: { fontSize: 12, color: '#888', marginTop: 4 },
  entryPoints: { color: '#f9a825', fontWeight: '700' },
  entryPointsPenalty: { color: '#e53935', fontWeight: '700' },
  cancelBtn: { backgroundColor: '#ffebee', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6 },
  cancelBtnText: { fontSize: 11, color: '#e53935', fontWeight: '600' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
});
