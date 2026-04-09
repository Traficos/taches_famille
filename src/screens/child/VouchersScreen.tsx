import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';
import { getVouchersForChild, Voucher } from '../../api/rewards';

export default function VouchersScreen() {
  const { currentProfile } = useProfile();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  useFocusEffect(
    useCallback(() => {
      if (!currentProfile) return;
      (async () => {
        setVouchers(await getVouchersForChild(currentProfile.id));
      })();
    }, [currentProfile?.id])
  );

  if (!currentProfile) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎟️ Mes bons</Text>
      <FlatList
        data={vouchers}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={[styles.voucher, !!item.used && styles.voucherUsed]}>
            <View>
              <Text style={styles.voucherName}>{item.reward_name}</Text>
              <Text style={styles.voucherDate}>
                Acheté le {new Date(item.purchased_at).toLocaleDateString('fr-FR')}
              </Text>
            </View>
            <View style={[styles.status, item.used ? styles.statusUsed : styles.statusActive]}>
              <Text style={styles.statusText}>{item.used ? 'Utilisé' : 'À utiliser'}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Pas encore de bons. Achète des récompenses dans la boutique !</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 16, paddingTop: 50 },
  title: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 16 },
  voucher: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  voucherUsed: { opacity: 0.5 },
  voucherName: { fontSize: 16, fontWeight: '600', color: '#333' },
  voucherDate: { fontSize: 12, color: '#888', marginTop: 4 },
  status: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  statusActive: { backgroundColor: '#e8f5e9' },
  statusUsed: { backgroundColor: '#eeeeee' },
  statusText: { fontSize: 12, fontWeight: '600' },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
});
