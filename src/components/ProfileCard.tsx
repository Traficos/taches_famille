import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { AnimalSVG } from './AnimalSVG';
import { ANIMAL_THEMES } from '../constants/themes';
import { AnimalType, AnimalStage } from '../constants/animals';
import { COLORS } from '../constants/colors';

interface ProfileCardProps {
  name: string;
  type: 'child' | 'parent';
  animalType?: string;
  animalStage?: string;
  points?: number;
  onPress: () => void;
}

export default function ProfileCard({ name, type, animalType, animalStage, points, onPress }: ProfileCardProps) {
  const pressed = useSharedValue(false);
  const theme = animalType ? ANIMAL_THEMES[animalType] : null;
  const shadowColor = theme ? `${theme.primary}44` : '#D0D0D0';

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withSpring(pressed.value ? 4 : 0, { damping: 15, stiffness: 300 }) },
      { scale: withSpring(pressed.value ? 0.95 : 1, { damping: 15, stiffness: 300 }) },
    ],
  }));

  return (
    <Pressable
      onPressIn={() => { pressed.value = true; }}
      onPressOut={() => { pressed.value = false; }}
      onPress={onPress}
    >
      <Animated.View
        style={[
          styles.card,
          type === 'parent' && styles.cardParent,
          { shadowColor, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 0, elevation: 4 },
          animatedStyle,
        ]}
      >
        {type === 'child' && animalType ? (
          <View style={[styles.avatar, { backgroundColor: theme?.primary ?? '#ccc' }]}>
            <AnimalSVG
              animalType={animalType as AnimalType}
              stage={(animalStage || 'egg') as AnimalStage}
              size={36}
            />
          </View>
        ) : (
          <View style={[styles.avatar, { backgroundColor: '#F5F5F5' }]}>
            <Text style={styles.lockEmoji}>🔐</Text>
          </View>
        )}
        <Text style={styles.name}>{name}</Text>
        {type === 'child' && points !== undefined && (
          <Text style={styles.points}>⭐ {points} pts</Text>
        )}
        {type === 'parent' && <Text style={styles.hint}>Gérer</Text>}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    width: 110,
    alignItems: 'center',
  },
  cardParent: { borderWidth: 2, borderStyle: 'dashed', borderColor: '#ccc' },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  lockEmoji: { fontSize: 24 },
  name: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  points: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  hint: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
});
