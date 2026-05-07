import React, { ReactNode } from 'react';
import { StyleSheet, ViewStyle, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { COLORS } from '../constants/colors';

interface GameCardProps {
  children: ReactNode;
  onPress?: () => void;
  pressable?: boolean;
  style?: ViewStyle;
  shadowColor?: string;
}

export default function GameCard({
  children,
  onPress,
  pressable = false,
  style,
  shadowColor = COLORS.cardShadow,
}: GameCardProps) {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    if (!pressable) return {};
    return {
      transform: [
        { translateY: withSpring(pressed.value ? 4 : 0, { damping: 15, stiffness: 300 }) },
        { scale: withSpring(pressed.value ? 0.98 : 1, { damping: 15, stiffness: 300 }) },
      ],
    };
  });

  const content = (
    <Animated.View
      style={[
        styles.card,
        { shadowColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 },
        animatedStyle,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );

  if (pressable && onPress) {
    return (
      <Pressable
        onPressIn={() => { pressed.value = true; }}
        onPressOut={() => { pressed.value = false; }}
        onPress={onPress}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
});
