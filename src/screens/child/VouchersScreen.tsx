import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';
import { getVouchersForChild, Voucher } from '../../api/rewards';

export default function VouchersScreen() {
  const { currentProfile } = useProfile();
  const theme = useTheme();
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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={styles.title}>🎟️ Mes bons</Text>
      <FlatList
        data={vouchers}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Ticket voucher={item} accent={theme.accent} primary={theme.primary} />}
        ListEmptyComponent={
          <Text style={styles.empty}>Pas encore de bons. Achete des recompenses dans la boutique !</Text>
        }
      />
    </View>
  );
}

interface TicketProps {
  voucher: Voucher;
  accent: string;
  primary: string;
}

function Ticket({ voucher, accent, primary }: TicketProps) {
  const used = !!voucher.used;
  const ribbonColor = used ? '#bdbdbd' : primary;

  return (
    <View style={[styles.ticket, used && styles.ticketUsed]}>
      <View style={[styles.notch, styles.notchLeft]} />
      <View style={[styles.notch, styles.notchRight]} />

      <View style={[styles.stub, { backgroundColor: ribbonColor }]}>
        <Text style={styles.stubText}>BON</Text>
      </View>

      <View style={styles.dashed} />

      <View style={styles.body}>
        <Text style={styles.voucherName} numberOfLines={2}>{voucher.reward_name}</Text>
        <Text style={styles.voucherDate}>
          Achete le {new Date(voucher.purchased_at).toLocaleDateString('fr-FR')}
        </Text>
        <View style={[styles.statusPill, { backgroundColor: used ? '#eeeeee' : `${accent}33` }]}>
          <Text style={[styles.statusText, { color: used ? '#888' : '#8a6d00' }]}>
            {used ? 'Utilise' : 'A utiliser'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 16, paddingTop: 50 },
  title: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 16 },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },

  ticket: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    minHeight: 90,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  ticketUsed: { opacity: 0.55 },

  stub: {
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stubText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 2,
    transform: [{ rotate: '-90deg' }],
  },

  dashed: {
    width: 1,
    marginVertical: 14,
    borderLeftWidth: 1,
    borderColor: '#d0d0d0',
    borderStyle: 'dashed',
  },

  body: { flex: 1, padding: 14, justifyContent: 'center' },
  voucherName: { fontSize: 16, fontWeight: '700', color: '#333' },
  voucherDate: { fontSize: 12, color: '#888', marginTop: 4 },

  statusPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  statusText: { fontSize: 12, fontWeight: '700' },

  notch: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fafafa',
    top: '50%',
    marginTop: -8,
    zIndex: 2,
  },
  notchLeft: { left: 48 },
  notchRight: { right: -8 },
});
