export type TaskCategory = 'cleaning' | 'cooking' | 'homework' | 'hygiene' | 'tidying';

export interface CategoryStyle {
  gradient: [string, string];
  border: string;
  shadow: string;
}

export const CATEGORY_STYLES: Record<TaskCategory, CategoryStyle> = {
  cleaning: { gradient: ['#C8E6C9', '#A5D6A7'], border: 'rgba(129, 199, 132, 0.6)', shadow: 'rgba(165, 214, 167, 0.4)' },
  cooking: { gradient: ['#FFF9C4', '#FFF176'], border: 'rgba(255, 224, 130, 0.6)', shadow: 'rgba(255, 241, 118, 0.4)' },
  homework: { gradient: ['#D1C4E9', '#B39DDB'], border: 'rgba(149, 117, 205, 0.6)', shadow: 'rgba(179, 157, 219, 0.4)' },
  hygiene: { gradient: ['#B3E5FC', '#81D4FA'], border: 'rgba(79, 195, 247, 0.6)', shadow: 'rgba(129, 212, 250, 0.4)' },
  tidying: { gradient: ['#F8BBD0', '#F48FB1'], border: 'rgba(244, 143, 177, 0.6)', shadow: 'rgba(248, 187, 208, 0.4)' },
};

export const TASK_ICON_CATEGORY: Record<string, TaskCategory> = {
  bed: 'tidying', dishes: 'cooking', broom: 'cleaning', vacuum: 'cleaning', trash: 'cleaning',
  laundry: 'tidying', dog: 'cleaning', water: 'cleaning', table: 'cooking', tidy: 'tidying',
  homework: 'homework', shower: 'hygiene', teeth: 'hygiene', cook: 'cooking', garden: 'cleaning',
};

export function getCategoryForIcon(iconKey: string): TaskCategory {
  return TASK_ICON_CATEGORY[iconKey] || 'cleaning';
}
