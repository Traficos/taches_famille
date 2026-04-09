export interface TaskIcon {
  key: string;
  emoji: string;
  label: string;
}

export const TASK_ICONS: TaskIcon[] = [
  { key: 'bed',       emoji: '🛏️', label: 'Lit' },
  { key: 'dishes',    emoji: '🍽️', label: 'Vaisselle' },
  { key: 'broom',     emoji: '🧹', label: 'Balai' },
  { key: 'vacuum',    emoji: '🧹', label: 'Aspirateur' },
  { key: 'trash',     emoji: '🗑️', label: 'Poubelle' },
  { key: 'laundry',   emoji: '👕', label: 'Linge' },
  { key: 'dog',       emoji: '🐕', label: 'Chien' },
  { key: 'water',     emoji: '🪴', label: 'Arrosage' },
  { key: 'table',     emoji: '🍽️', label: 'Table' },
  { key: 'tidy',      emoji: '🧺', label: 'Rangement' },
  { key: 'homework',  emoji: '📚', label: 'Devoirs' },
  { key: 'shower',    emoji: '🚿', label: 'Douche' },
  { key: 'teeth',     emoji: '🪥', label: 'Dents' },
  { key: 'cook',      emoji: '🍳', label: 'Cuisine' },
  { key: 'garden',    emoji: '🌱', label: 'Jardin' },
];
