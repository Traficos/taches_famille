import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming, withSpring, withDelay, Easing, runOnJS,
} from 'react-native-reanimated';
import { AnimalSVG } from './AnimalSVG';
import { AnimalType, AnimalStage } from '../constants/animals';

type AnimalMood = 'idle' | 'happy' | 'sad' | 'evolving';

interface AnimalAnimatedProps {
  animalType: AnimalType;
  stage: AnimalStage;
  mood?: AnimalMood;
  size?: number;
  onEvolutionComplete?: () => void;
}

export function AnimalAnimated({ animalType, stage, mood = 'idle', size = 120, onEvolutionComplete }: AnimalAnimatedProps) {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    switch (mood) {
      case 'idle':
        // Gentle breathing + slight sway
        scale.value = withRepeat(withSequence(
          withTiming(1.03, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        ), -1, true);
        rotate.value = withRepeat(withSequence(
          withTiming(0.02, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
          withTiming(-0.02, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        ), -1, true);
        translateY.value = 0;
        opacity.value = 1;
        break;
      case 'happy':
        // Jump + bounce + wiggle
        translateY.value = withRepeat(withSequence(
          withSpring(-20, { damping: 4, stiffness: 200 }),
          withSpring(0, { damping: 6, stiffness: 150 }),
        ), 3, false);
        scale.value = withRepeat(withSequence(
          withTiming(1.15, { duration: 200 }), withTiming(0.95, { duration: 150 }),
          withTiming(1.05, { duration: 150 }), withTiming(1, { duration: 200 }),
        ), 3, false);
        rotate.value = withRepeat(withSequence(
          withTiming(0.05, { duration: 100 }), withTiming(-0.05, { duration: 100 }),
          withTiming(0.03, { duration: 100 }), withTiming(0, { duration: 100 }),
        ), 3, false);
        break;
      case 'sad':
        translateY.value = withTiming(8, { duration: 1000 });
        scale.value = withTiming(0.92, { duration: 1000 });
        rotate.value = withRepeat(withSequence(
          withTiming(0.01, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
          withTiming(-0.01, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        ), -1, true);
        opacity.value = withTiming(0.7, { duration: 1000 });
        break;
      case 'evolving':
        scale.value = withSequence(
          withTiming(1.3, { duration: 500 }), withTiming(0.8, { duration: 300 }),
          withTiming(1.1, { duration: 300 }), withTiming(1, { duration: 200 }),
        );
        opacity.value = withSequence(withTiming(0, { duration: 400 }), withTiming(1, { duration: 400 }));
        if (onEvolutionComplete) {
          translateY.value = withDelay(1200, withTiming(0, { duration: 1 }, () => { runOnJS(onEvolutionComplete)(); }));
        }
        break;
    }
  }, [mood]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }, { rotate: `${rotate.value}rad` }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <AnimalSVG animalType={animalType} stage={stage} size={size} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({ container: { alignItems: 'center', justifyContent: 'center' } });
