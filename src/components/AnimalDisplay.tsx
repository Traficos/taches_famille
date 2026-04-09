import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ANIMALS, AnimalType, AnimalStage, getNextStageThreshold } from '../constants/animals';
import { ACCESSORIES } from '../constants/accessories';
import { AnimalAnimated } from './AnimalAnimated';
import { useTheme } from '../context/ThemeContext';

interface AnimalDisplayProps {
  animalType: AnimalType;
  animalStage: AnimalStage;
  animalName: string;
  totalPoints: number;
  equippedAccessories: string[];
  mood?: 'idle' | 'happy' | 'sad' | 'evolving';
}

export default function AnimalDisplay({
  animalType, animalStage, animalName, totalPoints, equippedAccessories, mood = 'idle',
}: AnimalDisplayProps) {
  const theme = useTheme();
  const animal = ANIMALS[animalType];
  const next = getNextStageThreshold(totalPoints);
  const stageLabel = animal?.stageLabels?.[animalStage];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.animalArea}>
        <AnimalAnimated animalType={animalType} stage={animalStage} mood={mood} size={140} />
        {equippedAccessories.length > 0 && (
          <View style={styles.accessories}>
            {equippedAccessories.map(key => {
              const acc = ACCESSORIES.find(a => a.key === key);
              return (
                <Text key={key} style={styles.accessoryEmoji}>{acc?.emoji ?? '✨'}</Text>
              );
            })}
          </View>
        )}
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
  accessories: { flexDirection: 'row', position: 'absolute', top: -10, right: -20 },
  accessoryEmoji: { fontSize: 24, marginLeft: 2 },
  name: { fontSize: 20, fontWeight: '700' },
  stage: { fontSize: 14, color: '#666', marginTop: 4 },
  progressBar: { width: '100%', height: 10, backgroundColor: '#e0e0e0', borderRadius: 10, marginTop: 12 },
  progressFill: { height: '100%', borderRadius: 10 },
  progressText: { fontSize: 12, color: '#888', marginTop: 4 },
});
