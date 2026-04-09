import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';
import { getRealRewards, getAccessoryRewards, purchaseReward, getAccessoriesOwned, Reward } from '../../api/rewards';
import { updateChildPoints, getProfileById } from '../../api/profiles';
import PointsBadge from '../../components/PointsBadge';
import ShopItem from '../../components/ShopItem';
import CelebrationOverlay from '../../components/CelebrationOverlay';

export default function ShopScreen() {
  const { currentProfile, setCurrentProfile } = useProfile();
  const theme = useTheme();
  const [realRewards, setRealRewards] = useState<Reward[]>([]);
  const [accessoryRewards, setAccessoryRewards] = useState<Reward[]>([]);
  const [ownedAccessories, setOwnedAccessories] = useState<string[]>([]);
  const [celebration, setCelebration] = useState<number | null>(null);

  const loadShop = useCallback(async () => {
    if (!currentProfile) return;
    setRealRewards(await getRealRewards());
    setAccessoryRewards(await getAccessoryRewards());
    setOwnedAccessories(await getAccessoriesOwned(currentProfile.id));
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

  const sections = [
    { title: '🎁 Recompenses', data: realRewards },
    { title: '🎀 Accessoires pour ton animal', data: accessoryRewards },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {celebration !== null && (
        <CelebrationOverlay points={celebration} onDone={() => setCelebration(null)} />
      )}
      <View style={styles.header}>
        <Text style={styles.title}>🛍️ Boutique</Text>
        <PointsBadge points={currentProfile.current_points} />
      </View>
      <SectionList
        sections={sections}
        keyExtractor={item => String(item.id)}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => {
          const isAccessory = item.type === 'accessory';
          const owned = isAccessory && item.accessory_key ? ownedAccessories.includes(item.accessory_key) : false;
          return (
            <ShopItem
              name={item.name}
              emoji={isAccessory ? getAccessoryEmoji(item.accessory_key) : '🎁'}
              cost={item.cost}
              canAfford={currentProfile.current_points >= item.cost}
              owned={owned}
              onBuy={() => handleBuy(item)}
            />
          );
        }}
      />
    </View>
  );
}

function getAccessoryEmoji(key: string | null): string {
  const map: Record<string, string> = {
    hat: '🎩', glasses: '🕶️', bow: '🎀', crown: '👑', necklace: '📿',
    scarf: '🧣', cape: '🦸', flower: '🌸', star: '⭐', heart: '❤️',
  };
  return key ? map[key] ?? '✨' : '🎁';
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 16, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#333' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#666', marginTop: 16, marginBottom: 8 },
});
