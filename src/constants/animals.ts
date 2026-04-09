export type AnimalType =
  | 'cat' | 'dog' | 'rabbit' | 'turtle' | 'bird'
  | 'dragon' | 'wolf' | 'phoenix' | 'robot' | 'fox';

export type AnimalStage = 'egg' | 'baby' | 'junior' | 'adult';
export type AgeGroup = 'young' | 'older';

export interface AnimalDef {
  label: string;
  emojis: Record<AnimalStage, string>;
  ageGroup: AgeGroup;
  stageLabels: Record<AnimalStage, string>;
}

export const ANIMALS: Record<AnimalType, AnimalDef> = {
  cat: { label: 'Chat', emojis: { egg: '🥚', baby: '🐱', junior: '😺', adult: '😸' }, ageGroup: 'young', stageLabels: { egg: 'Oeuf rose', baby: 'Chaton rond', junior: 'Chat joueur', adult: 'Chat elegant' } },
  dog: { label: 'Chien', emojis: { egg: '🥚', baby: '🐶', junior: '🐕', adult: '🦮' }, ageGroup: 'young', stageLabels: { egg: 'Oeuf bleu', baby: 'Chiot rond', junior: 'Chien joueur', adult: 'Chien fier' } },
  rabbit: { label: 'Lapin', emojis: { egg: '🥚', baby: '🐰', junior: '🐇', adult: '🐇' }, ageGroup: 'young', stageLabels: { egg: 'Oeuf peche', baby: 'Lapereau', junior: 'Lapin curieux', adult: 'Lapin majestueux' } },
  turtle: { label: 'Tortue', emojis: { egg: '🥚', baby: '🐢', junior: '🐢', adult: '🐢' }, ageGroup: 'young', stageLabels: { egg: 'Oeuf vert', baby: 'Bebe tortue', junior: 'Tortue exploratrice', adult: 'Tortue sage' } },
  bird: { label: 'Oiseau', emojis: { egg: '🥚', baby: '🐤', junior: '🐦', adult: '🦜' }, ageGroup: 'young', stageLabels: { egg: 'Oeuf turquoise', baby: 'Oisillon', junior: 'Oiseau voyageur', adult: 'Oiseau tropical' } },
  dragon: { label: 'Dragon', emojis: { egg: '🥚', baby: '🐉', junior: '🐲', adult: '🐲' }, ageGroup: 'older', stageLabels: { egg: 'Oeuf ecaille', baby: 'Bebe dragon', junior: 'Dragon ado', adult: 'Dragon majestueux' } },
  wolf: { label: 'Loup', emojis: { egg: '🐺', baby: '🐺', junior: '🐺', adult: '🐺' }, ageGroup: 'older', stageLabels: { egg: 'Louveteau endormi', baby: 'Louveteau joueur', junior: 'Jeune loup', adult: 'Loup alpha' } },
  phoenix: { label: 'Phoenix', emojis: { egg: '🔥', baby: '🔥', junior: '🕊️', adult: '🦅' }, ageGroup: 'older', stageLabels: { egg: 'Braise', baby: 'Flamme', junior: 'Oiseau de feu', adult: 'Phoenix dore' } },
  robot: { label: 'Robot', emojis: { egg: '📦', baby: '🤖', junior: '🤖', adult: '🤖' }, ageGroup: 'older', stageLabels: { egg: 'Boite a vis', baby: 'Robot basique', junior: 'Robot ameliore', adult: 'Mecha complet' } },
  fox: { label: 'Renard', emojis: { egg: '🥚', baby: '🦊', junior: '🦊', adult: '🦊' }, ageGroup: 'older', stageLabels: { egg: 'Bebe renard', baby: 'Renardeau', junior: 'Renard ruse', adult: 'Renard legendaire' } },
};

export const STAGE_THRESHOLDS: { stage: AnimalStage; minPoints: number }[] = [
  { stage: 'egg', minPoints: 0 },
  { stage: 'baby', minPoints: 200 },
  { stage: 'junior', minPoints: 1000 },
  { stage: 'adult', minPoints: 3000 },
];

export function getStageForPoints(totalPoints: number): AnimalStage {
  let currentStage: AnimalStage = 'egg';
  for (const { stage, minPoints } of STAGE_THRESHOLDS) {
    if (totalPoints >= minPoints) { currentStage = stage; }
  }
  return currentStage;
}

export function getNextStageThreshold(totalPoints: number): { nextStage: AnimalStage; threshold: number } | null {
  for (const { stage, minPoints } of STAGE_THRESHOLDS) {
    if (totalPoints < minPoints) { return { nextStage: stage, threshold: minPoints }; }
  }
  return null;
}

export function getAnimalsByAgeGroup(ageGroup: AgeGroup): AnimalType[] {
  return (Object.entries(ANIMALS) as [AnimalType, AnimalDef][])
    .filter(([, def]) => def.ageGroup === ageGroup)
    .map(([type]) => type);
}
