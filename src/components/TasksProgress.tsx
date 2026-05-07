import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

interface TasksProgressProps {
  done: number;
  total: number;
}

export default function TasksProgress({ done, total }: TasksProgressProps) {
  const theme = useTheme();
  const ratio = total === 0 ? 0 : Math.min(done / total, 1);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(ratio, { duration: 600, easing: Easing.out(Easing.cubic) });
  }, [ratio]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  const allDone = total > 0 && done === total;
  const label = total === 0
    ? 'Pas de taches aujourd\'hui'
    : allDone
      ? `Bravo ! ${done} / ${total} taches faites`
      : `${done} / ${total} taches faites`;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, allDone && { color: theme.primary }]}>{label}</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { backgroundColor: allDone ? theme.primary : theme.accent }, fillStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 6 },
  track: { height: 10, backgroundColor: '#e0e0e0', borderRadius: 10, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 10 },
});
