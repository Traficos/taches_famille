import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue, withSequence, withTiming, withDelay, withSpring, runOnJS, Easing,
} from 'react-native-reanimated';

type CelebrationType = 'task' | 'evolution' | 'purchase';

interface CelebrationOverlayProps {
  points: number;
  type?: CelebrationType;
  onDone: () => void;
}

const PARTICLE_COUNT = 20;
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const CONFETTI_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8FB1', '#B983FF'];
const STAR_EMOJIS = ['⭐', '✨', '🌟', '💫'];
const HEART_EMOJIS = ['💖', '💗', '💕', '💝'];

function Particle({ index, type, delay }: { index: number; type: CelebrationType; delay: number }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const rotate = useSharedValue(0);

  const startX = useMemo(() => Math.random() * SCREEN_W, []);
  const startY = useMemo(() => -20, []);
  const endX = useMemo(() => startX + (Math.random() - 0.5) * 200, []);
  const endY = useMemo(() => SCREEN_H * 0.3 + Math.random() * SCREEN_H * 0.5, []);
  const color = useMemo(() => CONFETTI_COLORS[index % CONFETTI_COLORS.length], []);
  const emoji = useMemo(() => {
    if (type === 'evolution') return STAR_EMOJIS[index % STAR_EMOJIS.length];
    if (type === 'purchase') return HEART_EMOJIS[index % HEART_EMOJIS.length];
    return null;
  }, []);

  useEffect(() => {
    const dur = 800 + Math.random() * 600;
    opacity.value = withDelay(delay, withSequence(
      withTiming(1, { duration: 200 }),
      withDelay(dur - 400, withTiming(0, { duration: 400 })),
    ));
    translateY.value = withDelay(delay, withTiming(endY, { duration: dur, easing: Easing.out(Easing.quad) }));
    translateX.value = withDelay(delay, withTiming(endX - startX, { duration: dur, easing: Easing.inOut(Easing.ease) }));
    scale.value = withDelay(delay, withSequence(withSpring(1, { damping: 5 }), withDelay(dur - 400, withTiming(0, { duration: 300 }))));
    rotate.value = withDelay(delay, withTiming(Math.random() * 6 - 3, { duration: dur }));
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: startX,
    top: startY,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}rad` },
    ],
    opacity: opacity.value,
  }));

  if (emoji) {
    return <Animated.Text style={[style, { fontSize: 20 }]}>{emoji}</Animated.Text>;
  }

  return (
    <Animated.View style={[style, { width: 10, height: 10, borderRadius: 2, backgroundColor: color }]} />
  );
}

export function CelebrationOverlay({ points, type = 'task', onDone }: CelebrationOverlayProps) {
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.5);

  const message = type === 'evolution' ? 'Evolution !' : type === 'purchase' ? 'Nouvel achat !' : 'Bravo !';
  const pointsLabel = type === 'purchase' ? `-${points} points` : `+${points} points !`;

  useEffect(() => {
    cardOpacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(1200, withTiming(0, { duration: 300 }, () => { runOnJS(onDone)(); })),
    );
    cardScale.value = withSequence(withTiming(1.2, { duration: 400 }), withTiming(1, { duration: 200 }));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({ opacity: cardOpacity.value, transform: [{ scale: cardScale.value }] }));

  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => (
      <Particle key={i} index={i} type={type} delay={i * 50} />
    )), [type]);

  return (
    <View style={styles.overlay}>
      {particles}
      <Animated.View style={[styles.content, cardStyle]}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.points}>{pointsLabel}</Text>
      </Animated.View>
    </View>
  );
}

export default CelebrationOverlay;

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 100 },
  content: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 24, paddingHorizontal: 40, paddingVertical: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  message: { fontSize: 28, fontWeight: '700', color: '#333', marginBottom: 8 },
  points: { fontSize: 22, fontWeight: '600', color: '#FFB74D' },
});
