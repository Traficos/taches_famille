import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface TabBarIconProps {
  emoji: string;
  label: string;
  focused: boolean;
  activeColor: string;
  activeShadow?: string;
}

export default function TabBarIcon({ emoji, label, focused, activeColor, activeShadow }: TabBarIconProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      scale.value = withSequence(
        withSpring(1.15, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconBox,
          focused
            ? {
                backgroundColor: activeColor,
                shadowColor: activeShadow ?? activeColor,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 1,
                shadowRadius: 0,
                elevation: 3,
              }
            : { backgroundColor: '#F5F5F5' },
          animatedStyle,
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </Animated.View>
      <Text style={[styles.label, focused ? { color: activeColor, fontWeight: '700' } : { color: '#999' }]}>
        {label}
      </Text>
      {focused && <View style={[styles.dot, { backgroundColor: activeColor }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingTop: 4 },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 20 },
  label: { fontSize: 9, marginTop: 3 },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: 2 },
});
