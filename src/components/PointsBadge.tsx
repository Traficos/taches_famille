import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { COLORS } from '../constants/colors';

export default function PointsBadge({ points }: { points: number }) {
  const [displayed, setDisplayed] = useState(points);
  const previous = useRef(points);
  const scale = useSharedValue(1);
  const [floatText, setFloatText] = useState<string | null>(null);
  const floatOpacity = useSharedValue(0);
  const floatY = useSharedValue(0);

  useEffect(() => {
    const from = previous.current;
    const to = points;
    if (from === to) return;

    const diff = to - from;
    const isGain = diff > 0;

    setFloatText(isGain ? `+${diff}` : `${diff}`);
    floatOpacity.value = 1;
    floatY.value = 0;
    floatOpacity.value = withTiming(0, { duration: 800 });
    floatY.value = withTiming(-30, { duration: 800 });

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

  const floatStyle = useAnimatedStyle(() => ({
    opacity: floatOpacity.value,
    transform: [{ translateY: floatY.value }],
  }));

  return (
    <View style={styles.wrapper}>
      {floatText && (
        <Animated.Text style={[styles.float, { color: floatText.startsWith('+') ? COLORS.turquoise : COLORS.coral }, floatStyle]}>
          {floatText} ⭐
        </Animated.Text>
      )}
      <Animated.View style={[styles.badge, animatedStyle]}>
        <Text style={styles.text}>⭐ {displayed} pts</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'relative' },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#FFE66D',
    shadowColor: '#D4BC3B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
  },
  text: { fontWeight: '800', fontSize: 13, color: '#5D4037' },
  float: {
    position: 'absolute',
    top: -10,
    right: 0,
    fontWeight: '800',
    fontSize: 14,
    zIndex: 10,
  },
});
