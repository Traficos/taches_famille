import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRealRewards, createReward, deleteReward, Reward, getVouchersForChild, markVoucherUsed, Voucher } from '../../api/rewards';
import { getAllProfiles, Profile } from '../../api/profiles';

export default function ManageRewardsScreen() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [vouchers, setVouchers] = useState<(Voucher & { childName: string })[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('500');

  const load = useCallback(async () => {
    setRewards(await getRealRewards());
    const profiles = await getAllProfiles();
    const children = profiles.filter(p => p.type === 'child');
    const allVouchers: (Voucher & { childName: string })[] = [];
    for (const child of children) {
      const v = await getVouchersForChild(child.id);
      allVouchers.push(...v.map(voucher => ({ ...voucher, childName: child.name })));
    }
    setVouchers(allVouchers);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  async function handleAdd() {
    if (!name.trim() || !cost.trim()) return;
    await createReward({ name: name.trim(), cost: parseInt(cost, 10), type: 'real' });
    setName('');
    setCost('500');
    setShowModal(false);
    await load();
  }

  async function handleDelete(id: number) {
    await deleteReward(id);
    await load();
  }

  async function handleMarkUsed(voucherId: number) {
    await markVoucherUsed(voucherId);
    await load();
  }

  const pendingVouchers = vouchers.filter(v => !v.used);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎁 Recompenses</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <Text style={styles.addButtonText}>+ Nouvelle</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recompenses disponibles</Text>
      <FlatList
        data={rewards}
        keyExtractor={item => String(item.id)}
        style={{ maxHeight: 200 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.rewardName}>🎁 {item.name}</Text>
              <Text style={styles.rewardCost}>{item.cost} pts</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucune recompense</Text>}
      />

      {pendingVouchers.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Bons a valider</Text>
          <FlatList
            data={pendingVouchers}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.rewardName}>{item.reward_name}</Text>
                  <Text style={styles.rewardCost}>Par {item.childName} • {new Date(item.purchased_at).toLocaleDateString('fr-FR')}</Text>
                </View>
                <TouchableOpacity style={styles.validateButton} onPress={() => handleMarkUsed(item.id)}>
                  <Text style={styles.validateText}>Valider</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Nouvelle recompense</Text>
            <Text style={styles.label}>Nom</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ex: 1h de jeu video" />
            <Text style={styles.label}>Cout en points</Text>
            <TextInput style={styles.input} value={cost} onChangeText={setCost} keyboardType="numeric" />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleAdd}>
                <Text style={styles.confirmText}>Creer</Text>
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
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#666', marginBottom: 8 },
  addButton: { backgroundColor: '#1565c0', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  addButtonText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  rewardName: { fontSize: 16, fontWeight: '600', color: '#333' },
  rewardCost: { fontSize: 12, color: '#888', marginTop: 4 },
  delete: { fontSize: 20, color: '#e53935', padding: 8 },
  validateButton: { backgroundColor: '#4CAF50', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
  validateText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  empty: { textAlign: 'center', color: '#999', marginTop: 20, fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: '#fff', borderRadius: 20, padding: 24, width: '80%' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#333', marginBottom: 16, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  cancelButton: { padding: 12 },
  cancelText: { color: '#999', fontWeight: '600' },
  confirmButton: { backgroundColor: '#4CAF50', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 },
  confirmText: { color: '#fff', fontWeight: '600' },
});
