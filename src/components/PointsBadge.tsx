import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function PointsBadge({ points }: { points: number }) {
  const theme = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: theme.accent }]}>
      <Text style={styles.text}>⭐ {points} pts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { backgroundColor: '#ffd54f', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  text: { fontSize: 14, fontWeight: '700', color: '#333' },
});
