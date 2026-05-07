import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

export default function PointsBadge({ points }: { points: number }) {
  const theme = useTheme();
  const [displayed, setDisplayed] = useState(points);
  const previous = useRef(points);
  const scale = useSharedValue(1);

  useEffect(() => {
    const from = previous.current;
    const to = points;
    if (from === to) return;

    const isGain = to > from;
    scale.value = withSequence(
      withSpring(isGain ? 1.18 : 0.92, { damping: 5, stiffness: 220 }),
      withSpring(1, { damping: 8, stiffness: 180 }),
    );

    let raf = 0;
    const start = Date.now();
    const duration = 500;
    const step = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (to - from) * eased);
      setDisplayed(value);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        previous.current = to;
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [points]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.badge, { backgroundColor: theme.accent }, animatedStyle]}>
      <Text style={styles.text}>⭐ {displayed} pts</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: { backgroundColor: '#ffd54f', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  text: { fontSize: 14, fontWeight: '700', color: '#333' },
});
