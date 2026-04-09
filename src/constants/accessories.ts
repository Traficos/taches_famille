export interface Accessory {
  key: string;
  name: string;
  emoji: string;
  cost: number;
}

export const ACCESSORIES: Accessory[] = [
  { key: 'hat',       name: 'Chapeau',       emoji: '🎩', cost: 50 },
  { key: 'glasses',   name: 'Lunettes',      emoji: '🕶️', cost: 30 },
  { key: 'bow',       name: 'Noeud',         emoji: '🎀', cost: 20 },
  { key: 'crown',     name: 'Couronne',      emoji: '👑', cost: 100 },
  { key: 'necklace',  name: 'Collier',       emoji: '📿', cost: 40 },
  { key: 'scarf',     name: 'Echarpe',       emoji: '🧣', cost: 35 },
  { key: 'cape',      name: 'Cape',          emoji: '🦸', cost: 80 },
  { key: 'flower',    name: 'Fleur',         emoji: '🌸', cost: 15 },
  { key: 'star',      name: 'Etoile',        emoji: '⭐', cost: 60 },
  { key: 'heart',     name: 'Coeur',         emoji: '❤️', cost: 25 },
];
