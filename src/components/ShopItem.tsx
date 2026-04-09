import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    <View style={[styles.card, !canAfford && !owned && styles.cardDisabled]}>
      <View style={styles.left}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.name, !canAfford && !owned && styles.nameDisabled]}>{name}</Text>
      </View>
      {owned ? (
        <Text style={styles.owned}>Achete ✓</Text>
      ) : (
        <TouchableOpacity
          style={[styles.button, !canAfford && styles.buttonDisabled]}
          onPress={onBuy}
          disabled={!canAfford}
        >
          <Text style={[styles.buttonText, !canAfford && styles.buttonTextDisabled]}>{cost} pts</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardDisabled: { opacity: 0.5 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  emoji: { fontSize: 24 },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  nameDisabled: { color: '#999' },
  button: { backgroundColor: '#ab47bc', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 14 },
  buttonDisabled: { backgroundColor: '#e0e0e0' },
  buttonText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  buttonTextDisabled: { color: '#999' },
  owned: { color: '#66bb6a', fontWeight: '600', fontSize: 13 },
});
