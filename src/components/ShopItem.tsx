import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GameCard from './GameCard';
import GameButton from './GameButton';
import { COLORS } from '../constants/colors';

interface ShopItemProps {
  name: string;
  emoji: string;
  cost: number;
  canAfford: boolean;
  owned?: boolean;
  onBuy: () => void;
}

export default function ShopItem({ name, emoji, cost, canAfford, owned, onBuy }: ShopItemProps) {
  return (
    <GameCard style={!canAfford && !owned ? styles.cardDisabled : undefined}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>⭐ {cost} pts</Text>
          </View>
        </View>
        {owned ? (
          <Text style={styles.owned}>Possede ✓</Text>
        ) : (
          <GameButton
            label="Acheter"
            variant="secondary"
            size="small"
            onPress={onBuy}
            disabled={!canAfford}
          />
        )}
      </View>
    </GameCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#95E1D333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 22 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  priceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE66D44',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  priceText: { fontSize: 11, fontWeight: '700', color: '#8a6d00' },
  owned: { color: COLORS.turquoise, fontWeight: '700', fontSize: 13 },
  cardDisabled: { opacity: 0.5 },
});
