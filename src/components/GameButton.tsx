import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { COLORS } from '../constants/colors';

type Variant = 'primary' | 'secondary' | 'reward' | 'disabled';

const VARIANT_STYLES: Record<Variant, { bg: string; shadow: string; text: string }> = {
  primary: { bg: COLORS.coral, shadow: COLORS.coralDark, text: '#FFFFFF' },
  secondary: { bg: COLORS.turquoise, shadow: COLORS.turquoiseDark, text: '#FFFFFF' },
  reward: { bg: COLORS.yellow, shadow: COLORS.yellowDark, text: '#5D4037' },
  disabled: { bg: COLORS.disabled, shadow: COLORS.disabledDark, text: COLORS.disabledText },
};

interface GameButtonProps {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function GameButton({
  label,
  variant = 'primary',
  onPress,
  disabled = false,
  size = 'medium',
  style,
  textStyle,
}: GameButtonProps) {
  const effectiveVariant = disabled ? 'disabled' : variant;
  const colors = VARIANT_STYLES[effectiveVariant];
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withSpring(pressed.value ? 4 : 0, { damping: 15, stiffness: 300 }) },
      { scale: withSpring(pressed.value ? 0.97 : 1, { damping: 15, stiffness: 300 }) },
    ],
  }));

  const isSmall = size === 'small';

  return (
    <Pressable
      onPressIn={() => { if (!disabled) pressed.value = true; }}
      onPressOut={() => { pressed.value = false; }}
      onPress={() => { if (!disabled && onPress) onPress(); }}
    >
      <Animated.View
        style={[
          styles.button,
          isSmall ? styles.buttonSmall : styles.buttonMedium,
          {
            backgroundColor: colors.bg,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 1,
            shadowRadius: 0,
            elevation: 4,
          },
          animatedStyle,
          style,
        ]}
      >
        <Text
          style={[
            styles.label,
            isSmall ? styles.labelSmall : styles.labelMedium,
            { color: colors.text },
            textStyle,
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMedium: { paddingVertical: 12, paddingHorizontal: 20 },
  buttonSmall: { paddingVertical: 8, paddingHorizontal: 14 },
  label: { fontWeight: '800' },
  labelMedium: { fontSize: 15 },
  labelSmall: { fontSize: 12 },
});
