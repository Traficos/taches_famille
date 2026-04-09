import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllTasks, createTask, updateTask, deleteTask, Task } from '../../api/tasks';
import { getAllProfiles, Profile } from '../../api/profiles';
import { TASK_ICONS } from '../../constants/taskIcons';

const DAY_LABELS = [
  { day: 1, label: 'L' },
  { day: 2, label: 'M' },
  { day: 3, label: 'Me' },
  { day: 4, label: 'J' },
  { day: 5, label: 'V' },
  { day: 6, label: 'S' },
  { day: 0, label: 'D' },
];

function formatDays(days: string | null): string {
  if (!days) return 'Certains jours';
  const labels: Record<number, string> = { 0: 'Dim', 1: 'Lun', 2: 'Mar', 3: 'Mer', 4: 'Jeu', 5: 'Ven', 6: 'Sam' };
  return days.split(',').map(Number).sort((a, b) => (a === 0 ? 7 : a) - (b === 0 ? 7 : b)).map(d => labels[d]).join(', ');
}

export default function ManageTasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [children, setChildren] = useState<Profile[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('bed');
  const [points, setPoints] = useState('20');
  const [type, setType] = useState<'assigned' | 'free'>('assigned');
  const [assignedTo, setAssignedTo] = useState<number | null>(null);
  const [recurrence, setRecurrence] = useState<'once' | 'daily' | 'weekly' | 'custom'>('daily');
  const [recurrenceDays, setRecurrenceDays] = useState<number[]>([]);

  const load = useCallback(async () => {
    setTasks(await getAllTasks());
    const profiles = await getAllProfiles();
    const kids = profiles.filter(p => p.type === 'child');
    setChildren(kids);
    if (kids.length > 0 && !assignedTo) setAssignedTo(kids[0].id);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  function openAdd() {
    setEditingTask(null);
    setName('');
    setIcon('bed');
    setPoints('20');
    setType('assigned');
    setRecurrence('daily');
    setRecurrenceDays([]);
    setShowModal(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setName(task.name);
    setIcon(task.icon);
    setPoints(String(task.points));
    setType(task.type);
    setAssignedTo(task.assigned_to);
    setRecurrence(task.recurrence);
    setRecurrenceDays(task.recurrence_days ? task.recurrence_days.split(',').map(Number) : []);
    setShowModal(true);
  }

  async function handleSave() {
    if (!name.trim() || !points.trim()) return;
    const input = {
      name: name.trim(),
      icon,
      points: parseInt(points, 10),
      type,
      assignedTo: type === 'assigned' ? assignedTo : null,
      recurrence,
      recurrenceDays: recurrence === 'custom' ? recurrenceDays.join(',') : null,
    };
    if (editingTask) {
      await updateTask(editingTask.id, input);
    } else {
      await createTask(input);
    }
    setName('');
    setPoints('20');
    setEditingTask(null);
    setShowModal(false);
    await load();
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    await load();
  }

  const taskIcon = (key: string) => TASK_ICONS.find(i => i.key === key)?.emoji ?? '📌';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Taches</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAdd}>
          <Text style={styles.addButtonText}>+ Nouvelle tache</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => {
          const child = children.find(c => c.id === item.assigned_to);
          return (
            <View style={styles.card}>
              <View>
                <Text style={styles.taskName}>{taskIcon(item.icon)} {item.name}</Text>
                <Text style={styles.taskInfo}>
                  {item.points} pts • {item.type === 'assigned' ? `Assigne a ${child?.name ?? '?'}` : 'Libre-service'}
                  {' • '}{item.recurrence === 'daily' ? 'Tous les jours' : item.recurrence === 'custom' ? formatDays(item.recurrence_days) : item.recurrence === 'weekly' ? 'Hebdomadaire' : 'Une fois'}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => openEdit(item)} style={styles.editBtn}>
                  <Text style={styles.editText}>✎</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.delete}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>Aucune tache. Creez-en une !</Text>}
      />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>{editingTask ? 'Modifier la tache' : 'Nouvelle tache'}</Text>

              <Text style={styles.label}>Nom</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ex: Ranger ta chambre" />

              <Text style={styles.label}>Points</Text>
              <TextInput style={styles.input} value={points} onChangeText={setPoints} keyboardType="numeric" />
              <Text style={styles.hint}>Facile: 10-30 • Moyenne: 30-70 • Difficile: 70-150</Text>

              <Text style={styles.label}>Icone</Text>
              <View style={styles.iconPicker}>
                {TASK_ICONS.map(ti => (
                  <TouchableOpacity
                    key={ti.key}
                    style={[styles.iconOption, icon === ti.key && styles.iconSelected]}
                    onPress={() => setIcon(ti.key)}
                  >
                    <Text style={styles.iconEmoji}>{ti.emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Type</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.chip, type === 'assigned' && styles.chipActive]}
                  onPress={() => setType('assigned')}
                >
                  <Text style={[styles.chipText, type === 'assigned' && styles.chipTextActive]}>Assignee</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.chip, type === 'free' && styles.chipActive]}
                  onPress={() => setType('free')}
                >
                  <Text style={[styles.chipText, type === 'free' && styles.chipTextActive]}>Libre-service</Text>
                </TouchableOpacity>
              </View>

              {type === 'assigned' && children.length > 0 && (
                <>
                  <Text style={styles.label}>Assigner a</Text>
                  <View style={styles.row}>
                    {children.map(c => (
                      <TouchableOpacity
                        key={c.id}
                        style={[styles.chip, assignedTo === c.id && styles.chipActive]}
                        onPress={() => setAssignedTo(c.id)}
                      >
                        <Text style={[styles.chipText, assignedTo === c.id && styles.chipTextActive]}>{c.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              <Text style={styles.label}>Récurrence</Text>
              <View style={styles.row}>
                {(['daily', 'custom', 'once'] as const).map(r => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.chip, recurrence === r && styles.chipActive]}
                    onPress={() => setRecurrence(r)}
                  >
                    <Text style={[styles.chipText, recurrence === r && styles.chipTextActive]}>
                      {r === 'daily' ? 'Tous les jours' : r === 'custom' ? 'Certains jours' : 'Une fois'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {recurrence === 'custom' && (
                <View style={[styles.row, { marginTop: 8 }]}>
                  {DAY_LABELS.map(({ day, label }) => {
                    const selected = recurrenceDays.includes(day);
                    return (
                      <TouchableOpacity
                        key={day}
                        style={[styles.dayChip, selected && styles.dayChipActive]}
                        onPress={() =>
                          setRecurrenceDays(prev =>
                            selected ? prev.filter(d => d !== day) : [...prev, day],
                          )
                        }
                      >
                        <Text style={[styles.dayChipText, selected && styles.dayChipTextActive]}>{label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => { setShowModal(false); setEditingTask(null); }}>
                  <Text style={styles.cancelText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
                  <Text style={styles.confirmText}>{editingTask ? 'Enregistrer' : 'Creer'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 16, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#333' },
  addButton: { backgroundColor: '#1565c0', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  addButtonText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  taskName: { fontSize: 16, fontWeight: '600', color: '#333' },
  taskInfo: { fontSize: 12, color: '#888', marginTop: 4 },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editBtn: { padding: 8 },
  editText: { fontSize: 18, color: '#1565c0' },
  delete: { fontSize: 20, color: '#e53935', padding: 8 },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  modalScroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  modal: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: '90%' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 16, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  hint: { fontSize: 11, color: '#999', marginTop: 4 },
  iconPicker: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  iconOption: { padding: 8, borderRadius: 8, borderWidth: 2, borderColor: 'transparent' },
  iconSelected: { borderColor: '#1565c0', backgroundColor: '#e3f2fd' },
  iconEmoji: { fontSize: 24 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#eee' },
  chipActive: { backgroundColor: '#1565c0' },
  chipText: { fontSize: 13, color: '#666' },
  chipTextActive: { color: '#fff', fontWeight: '600' },
  dayChip: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  dayChipActive: { backgroundColor: '#1565c0' },
  dayChipText: { fontSize: 13, color: '#666', fontWeight: '600' },
  dayChipTextActive: { color: '#fff' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: { padding: 12 },
  cancelText: { color: '#999', fontWeight: '600' },
  confirmButton: { backgroundColor: '#4CAF50', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 },
  confirmText: { color: '#fff', fontWeight: '600' },
});
