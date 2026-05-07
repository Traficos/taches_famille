import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ANIMALS, AnimalType, AnimalStage, getNextStageThreshold } from '../constants/animals';
import { AnimalAnimated } from './AnimalAnimated';
import { useTheme } from '../context/ThemeContext';
import { COLORS } from '../constants/colors';

interface AnimalDisplayProps {
  animalType: AnimalType;
  animalStage: AnimalStage;
  animalName: string;
  totalPoints: number;
  mood?: 'idle' | 'happy' | 'sad' | 'evolving';
}

export default function AnimalDisplay({
  animalType, animalStage, animalName, totalPoints, mood = 'idle',
}: AnimalDisplayProps) {
  const theme = useTheme();
  const animal = ANIMALS[animalType];
  const next = getNextStageThreshold(totalPoints);
  const stageLabel = animal?.stageLabels?.[animalStage];

  return (
    <View style={[styles.container, { backgroundColor: COLORS.cream }]}>
      <View style={styles.animalArea}>
        <AnimalAnimated animalType={animalType} stage={animalStage} mood={mood} size={140} />
      </View>
      <Text style={[styles.name, { color: theme.primary }]}>{animalName}</Text>
      {stageLabel && <Text style={styles.stage}>{stageLabel}</Text>}
      {next && (
        <>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((totalPoints / next.threshold) * 100, 100)}%`, backgroundColor: theme.primary }]} />
          </View>
          <Text style={styles.progressText}>
            {totalPoints} / {next.threshold} pts → {animal?.stageLabels?.[next.nextStage] ?? next.nextStage}
          </Text>
        </>
      )}
      {!next && <Text style={[styles.progressText, { color: theme.accent }]}>Niveau maximum atteint !</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: 24, padding: 30, alignItems: 'center' },
  animalArea: { position: 'relative', marginBottom: 12 },
  name: { fontSize: 20, fontWeight: '700' },
  stage: { fontSize: 14, color: '#666', marginTop: 4 },
  progressBar: { width: '100%', height: 12, backgroundColor: '#E8E4DC', borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#D8D4CC', marginTop: 12 },
  progressFill: { height: '100%', borderRadius: 10, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 0, elevation: 2 },
  progressText: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary, marginTop: 4 },
});
