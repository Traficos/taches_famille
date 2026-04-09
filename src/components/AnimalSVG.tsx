import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AnimalType, AnimalStage, ANIMALS } from '../constants/animals';
import { CatSVG } from './animals/CatSVG';
import { DogSVG } from './animals/DogSVG';
import { RabbitSVG } from './animals/RabbitSVG';
import { TurtleSVG } from './animals/TurtleSVG';
import { BirdSVG } from './animals/BirdSVG';
import { DragonSVG } from './animals/DragonSVG';
import { WolfSVG } from './animals/WolfSVG';
import { PhoenixSVG } from './animals/PhoenixSVG';
import { RobotSVG } from './animals/RobotSVG';
import { FoxSVG } from './animals/FoxSVG';

interface AnimalSVGProps {
  animalType: AnimalType;
  stage: AnimalStage;
  size?: number;
}

const SVG_MAP: Record<string, React.ComponentType<{ stage: AnimalStage; size: number }>> = {
  cat: CatSVG,
  dog: DogSVG,
  rabbit: RabbitSVG,
  turtle: TurtleSVG,
  bird: BirdSVG,
  dragon: DragonSVG,
  wolf: WolfSVG,
  phoenix: PhoenixSVG,
  robot: RobotSVG,
  fox: FoxSVG,
};

export function AnimalSVG({ animalType, stage, size = 120 }: AnimalSVGProps) {
  const SvgComponent = SVG_MAP[animalType];
  if (SvgComponent) {
    return <SvgComponent stage={stage} size={size} />;
  }
  // emoji fallback
  const animal = ANIMALS[animalType];
  const emoji = animal?.emojis[stage] || '🥚';
  return <Text style={[styles.emoji, { fontSize: size * 0.65 }]}>{emoji}</Text>;
}

const styles = StyleSheet.create({
  emoji: { textAlign: 'center' },
});
