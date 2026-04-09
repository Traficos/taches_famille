import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, Platform, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllProfiles, createChildProfile, updateChildProfile, deleteProfile, updateChildPoints, Profile } from '../../api/profiles';
import { createPenalty, getPenaltyCountForProfile } from '../../api/penalties';
import { getAnimalsByAgeGroup, AgeGroup, ANIMALS, AnimalType, AnimalStage } from '../../constants/animals';
import { AnimalSVG } from '../../components/AnimalSVG';

export default function ManageChildrenScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingChild, setEditingChild] = useState<Profile | null>(null);
  const [newName, setNewName] = useState('');
  const [newAnimalType, setNewAnimalType] = useState<AnimalType>('cat');
  const [newAnimalName, setNewAnimalName] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('young');
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [penaltyChild, setPenaltyChild] = useState<Profile | null>(null);
  const [penaltyPoints, setPenaltyPoints] = useState('');
  const [penaltyReason, setPenaltyReason] = useState('');
  const [penaltyCounts, setPenaltyCounts] = useState<Record<number, number>>({});

  const loadProfiles = useCallback(async () => {
    const allProfiles = await getAllProfiles();
    setProfiles(allProfiles);
    const counts: Record<number, number> = {};
    for (const p of allProfiles.filter(p => p.type === 'child')) {
      counts[p.id] = await getPenaltyCountForProfile(p.id);
    }
    setPenaltyCounts(counts);
  }, []);

  useFocusEffect(useCallback(() => { loadProfiles(); }, [loadProfiles]));

  function openAdd() {
    setEditingChild(null);
    setNewName('');
    setNewAnimalType('cat');
    setNewAnimalName('');
    setAgeGroup('young');
    setShowModal(true);
  }

  function openEdit(child: Profile) {
    setEditingChild(child);
    setNewName(child.name);
    const animalType = (child.animal_type || 'cat') as AnimalType;
    setNewAnimalType(animalType);
    setNewAnimalName(child.animal_name || '');
    const animal = ANIMALS[animalType];
    setAgeGroup(animal ? animal.ageGroup : 'young');
    setShowModal(true);
  }

  async function handleSave() {
    if (!newName.trim() || !newAnimalName.trim()) return;
    if (editingChild) {
      await updateChildProfile(editingChild.id, newName.trim(), newAnimalType, newAnimalName.trim());
    } else {
      await createChildProfile(newName.trim(), newAnimalType, newAnimalName.trim());
    }
    setNewName('');
    setNewAnimalName('');
    setEditingChild(null);
    setShowModal(false);
    await loadProfiles();
  }

  async function handleDelete(id: number) {
    await deleteProfile(id);
    await loadProfiles();
  }

  function openPenalty(child: Profile) {
    setPenaltyChild(child);
    setPenaltyPoints('');
    setPenaltyReason('');
    setShowPenaltyModal(true);
  }

  async function handlePenalty() {
    if (!penaltyChild || !penaltyPoints.trim() || !penaltyReason.trim()) return;
    const pts = parseInt(penaltyPoints, 10);
    if (isNaN(pts) || pts <= 0) return;

    const doIt = async () => {
      await createPenalty(penaltyChild.id, pts, penaltyReason.trim());
      await updateChildPoints(penaltyChild.id, -pts);
      setShowPenaltyModal(false);
      setPenaltyChild(null);
      await loadProfiles();
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Retirer ${pts} points a ${penaltyChild.name} ?`)) {
        await doIt();
      }
    } else {
      Alert.alert(
        'Confirmer la penalite',
        `Retirer ${pts} points a ${penaltyChild.name} ?`,
        [
          { text: 'Non', style: 'cancel' },
          { text: 'Oui', style: 'destructive', onPress: doIt },
        ],
      );
    }
  }

  const children = profiles.filter(p => p.type === 'child');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👧 Enfants</Text>
        <TouchableOpacity style={styles.addButton} onPress={openAdd}>
          <Text style={styles.addButtonText}>+ Ajouter</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={children}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <AnimalSVG animalType={item.animal_type as AnimalType} stage={(item.animal_stage || 'egg') as AnimalStage} size={36} />
              <View>
                <Text style={styles.childName}>{item.name}</Text>
                <Text style={styles.childInfo}>
                  {item.animal_name} • {item.total_points} pts cumules • {item.current_points} pts dispo
                  {(penaltyCounts[item.id] ?? 0) > 0 ? ` • ${penaltyCounts[item.id]} penalite(s)` : ''}
                </Text>
              </View>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => openPenalty(item)} style={styles.penaltyBtn}>
                <Text style={styles.penaltyText}>⚠</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEdit(item)} style={styles.editBtn}>
                <Text style={styles.editText}>✎</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucun enfant. Ajoutez-en un !</Text>}
      />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{editingChild ? 'Modifier l\'enfant' : 'Nouvel enfant'}</Text>

            <Text style={styles.label}>Prenom</Text>
            <TextInput style={styles.input} value={newName} onChangeText={setNewName} placeholder="Prenom" />

            <Text style={styles.label}>Animal</Text>
            <View style={styles.ageGroupToggle}>
              <TouchableOpacity
                style={[styles.ageGroupBtn, ageGroup === 'young' && styles.ageGroupActive]}
                onPress={() => setAgeGroup('young')}
              >
                <Text style={[styles.ageGroupText, ageGroup === 'young' && styles.ageGroupTextActive]}>Petits (7-9 ans)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.ageGroupBtn, ageGroup === 'older' && styles.ageGroupActive]}
                onPress={() => setAgeGroup('older')}
              >
                <Text style={[styles.ageGroupText, ageGroup === 'older' && styles.ageGroupTextActive]}>Grands (10-13 ans)</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.animalPicker}>
              {getAnimalsByAgeGroup(ageGroup).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.animalOption, newAnimalType === type && styles.animalSelected]}
                  onPress={() => setNewAnimalType(type)}
                >
                  <AnimalSVG animalType={type as AnimalType} stage="baby" size={56} />
                  <Text style={styles.animalLabel}>{ANIMALS[type].label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Nom de l'animal</Text>
            <TextInput style={styles.input} value={newAnimalName} onChangeText={setNewAnimalName} placeholder="Nom de l'animal" />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setShowModal(false); setEditingChild(null); }}>
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
                <Text style={styles.confirmText}>{editingChild ? 'Enregistrer' : 'Ajouter'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showPenaltyModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Penaliser {penaltyChild?.name}</Text>

            <Text style={styles.label}>Points a retirer</Text>
            <TextInput
              style={styles.input}
              value={penaltyPoints}
              onChangeText={setPenaltyPoints}
              keyboardType="numeric"
              placeholder="Ex: 20"
            />

            <Text style={styles.label}>Motif</Text>
            <TextInput
              style={[styles.input, { minHeight: 60 }]}
              value={penaltyReason}
              onChangeText={setPenaltyReason}
              placeholder="Ex: N'a pas range sa chambre"
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setShowPenaltyModal(false); setPenaltyChild(null); }}>
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.penaltyConfirmButton} onPress={handlePenalty}>
                <Text style={styles.confirmText}>Retirer les points</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  childName: { fontSize: 16, fontWeight: '600', color: '#333' },
  childInfo: { fontSize: 12, color: '#888', marginTop: 4 },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editBtn: { padding: 8 },
  editText: { fontSize: 18, color: '#1565c0' },
  delete: { fontSize: 20, color: '#e53935', padding: 8 },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: '80%' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 16, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  animalPicker: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  animalOption: { alignItems: 'center', padding: 8, borderRadius: 12, borderWidth: 2, borderColor: 'transparent' },
  animalSelected: { borderColor: '#4CAF50', backgroundColor: '#e8f5e9' },
  animalEmoji: { fontSize: 32 },
  animalLabel: { fontSize: 11, color: '#666', marginTop: 2 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: { padding: 12 },
  cancelText: { color: '#999', fontWeight: '600' },
  confirmButton: { backgroundColor: '#4CAF50', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 },
  confirmText: { color: '#fff', fontWeight: '600' },
  ageGroupToggle: { flexDirection: 'row', marginBottom: 12, gap: 8 },
  ageGroupBtn: { flex: 1, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#f0f0f0', alignItems: 'center' },
  ageGroupActive: { backgroundColor: '#4CAF50' },
  ageGroupText: { fontSize: 13, color: '#666' },
  ageGroupTextActive: { color: 'white', fontWeight: '600' },
  penaltyBtn: { padding: 8 },
  penaltyText: { fontSize: 18 },
  penaltyConfirmButton: { backgroundColor: '#e53935', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 },
});
