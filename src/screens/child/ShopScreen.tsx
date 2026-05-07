import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';
import { getRealRewards, purchaseReward, Reward } from '../../api/rewards';
import { updateChildPoints, getProfileById } from '../../api/profiles';
import PointsBadge from '../../components/PointsBadge';
import ShopItem from '../../components/ShopItem';
import CelebrationOverlay from '../../components/CelebrationOverlay';
import { COLORS } from '../../constants/colors';

export default function ShopScreen() {
  const { currentProfile, setCurrentProfile } = useProfile();
  const theme = useTheme();
  const [realRewards, setRealRewards] = useState<Reward[]>([]);
  const [celebration, setCelebration] = useState<number | null>(null);

  const loadShop = useCallback(async () => {
    if (!currentProfile) return;
    setRealRewards(await getRealRewards());
  }, [currentProfile?.id]);

  useFocusEffect(useCallback(() => { loadShop(); }, [loadShop]));

  async function handleBuy(reward: Reward) {
    if (!currentProfile || currentProfile.current_points < reward.cost) return;
    await purchaseReward(reward.id, currentProfile.id);
    await updateChildPoints(currentProfile.id, -reward.cost);
    const fresh = await getProfileById(currentProfile.id);
    setCurrentProfile(fresh);
    setCelebration(reward.cost);
    await loadShop();
  }

  if (!currentProfile) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {celebration !== null && (
        <CelebrationOverlay points={celebration} onDone={() => setCelebration(null)} />
      )}
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Boutique</Text>
        <PointsBadge points={currentProfile.current_points} />
      </View>
      <Text style={styles.sectionTitle}>🎁 Recompenses</Text>
      <FlatList
        data={realRewards}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ShopItem
            name={item.name}
            emoji="🎁"
            cost={item.cost}
            canAfford={currentProfile.current_points >= item.cost}
            owned={false}
            onBuy={() => handleBuy(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream, padding: 16, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#333' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#666', marginTop: 16, marginBottom: 8 },
});
