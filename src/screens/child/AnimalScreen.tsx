import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useProfile } from '../../context/ProfileContext';
import { useTheme } from '../../context/ThemeContext';
import { getProfileById } from '../../api/profiles';
import AnimalDisplay from '../../components/AnimalDisplay';
import PointsBadge from '../../components/PointsBadge';
import { AnimalType, AnimalStage } from '../../constants/animals';
import { useAnimalMood } from '../../hooks/useAnimalMood';
import { COLORS } from '../../constants/colors';

export default function AnimalScreen() {
  const { currentProfile, setCurrentProfile } = useProfile();
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [moodKey, setMoodKey] = useState(0);
  const mood = useAnimalMood(currentProfile?.id, moodKey);

  useFocusEffect(
    useCallback(() => {
      if (!currentProfile) return;
      (async () => {
        const fresh = await getProfileById(currentProfile.id);
        setCurrentProfile(fresh);
        setMoodKey(k => k + 1);
      })();
    }, [currentProfile?.id])
  );

  if (!currentProfile) return null;

  const moodEmoji = mood === 'happy' ? '😊' : mood === 'sad' ? '😢' : '😴';

  return (
    <View style={[styles.container, { backgroundColor: COLORS.cream }]}>
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <Text style={styles.animalNameHeader}>{currentProfile.animal_name ?? currentProfile.name}</Text>
        <PointsBadge points={currentProfile.current_points} />
      </View>
      <AnimalDisplay
        animalType={currentProfile.animal_type as AnimalType}
        animalStage={currentProfile.animal_stage as AnimalStage}
        animalName={currentProfile.animal_name ?? ''}
        totalPoints={currentProfile.total_points}
        mood={mood}
      />
      <View style={styles.moodBadge}>
        <Text style={styles.moodEmoji}>{moodEmoji}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 16,
    paddingTop: 50,
    marginBottom: 20,
  },
  animalNameHeader: { fontSize: 20, fontWeight: '700', color: '#fff' },
  moodBadge: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 12,
  },
  moodEmoji: { fontSize: 22 },
});
