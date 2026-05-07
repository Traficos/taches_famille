import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../constants/colors';

type Variant = 'primary' | 'danger' | 'neutral';

const VARIANT_STYLES: Record<Variant, { bg: string; text: string; glow: string }> = {
  primary: { bg: COLORS.turquoise, text: '#FFFFFF', glow: 'rgba(78,205,196,0.4)' },
  danger: { bg: COLORS.coral, text: '#FFFFFF', glow: 'rgba(255,107,107,0.4)' },
  neutral: { bg: '#F5F5F5', text: '#666666', glow: 'transparent' },
};

interface GlowButtonProps {
  label: string;
  variant?: Variant;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function GlowButton({
  label,
  variant = 'primary',
  onPress,
  disabled = false,
  style,
  textStyle,
}: GlowButtonProps) {
  const colors = VARIANT_STYLES[variant];
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.bg,
          shadowColor: colors.glow,
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, { color: colors.text }, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: { fontSize: 15, fontWeight: '700' },
  disabled: { opacity: 0.5 },
});
