import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCategoryForIcon, CATEGORY_STYLES, TaskCategory } from '../constants/taskCategories';

interface KawaiBadgeProps {
  emoji: string;
  iconKey?: string;
  category?: TaskCategory;
  size?: number;
}

export function KawaiBadge({ emoji, iconKey, category, size = 56 }: KawaiBadgeProps) {
  const cat = category || (iconKey ? getCategoryForIcon(iconKey) : 'cleaning');
  const style = CATEGORY_STYLES[cat];
  const borderRadius = size * 0.29;
  const fontSize = size * 0.5;
  const sparkleSize = size * 0.28;

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius, backgroundColor: style.gradient[0], borderColor: style.border, shadowColor: style.shadow }]}>
      <View style={[styles.gradientOverlay, { borderRadius, backgroundColor: style.gradient[1] }]} />
      <Text style={[styles.emoji, { fontSize }]}>{emoji}</Text>
      <View style={[styles.sparkle, { width: sparkleSize, height: sparkleSize, borderRadius: sparkleSize / 2, backgroundColor: style.border }]}>
        <Text style={styles.sparkleText}>✨</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', borderWidth: 2, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4, position: 'relative', overflow: 'visible' },
  gradientOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: '50%' as any, opacity: 0.5 },
  emoji: { textAlign: 'center' },
  sparkle: { position: 'absolute', top: -4, right: -4, justifyContent: 'center', alignItems: 'center' },
  sparkleText: { fontSize: 10 },
});
