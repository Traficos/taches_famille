import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

interface StaggerItemProps {
  index: number;
  delay?: number;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function StaggerItem({ index, delay = 80, children, style }: StaggerItemProps) {
  const scale = useSharedValue(0.85);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(index * delay, withSpring(1, { damping: 12, stiffness: 200 }));
    opacity.value = withDelay(index * delay, withSpring(1, { damping: 12, stiffness: 200 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
