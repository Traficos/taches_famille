export interface AnimalTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundGradient: [string, string];
  tabBarActive: string;
}

export const ANIMAL_THEMES: Record<string, AnimalTheme> = {
  cat: { primary: '#F48FB1', secondary: '#CE93D8', accent: '#FFD54F', background: '#FFF0F5', backgroundGradient: ['#FFF0F5', '#FCE4EC'], tabBarActive: '#F48FB1' },
  dog: { primary: '#64B5F6', secondary: '#81C784', accent: '#FFB74D', background: '#F0F8FF', backgroundGradient: ['#F0F8FF', '#E3F2FD'], tabBarActive: '#64B5F6' },
  rabbit: { primary: '#FFAB91', secondary: '#F8BBD0', accent: '#A5D6A7', background: '#FFF5EE', backgroundGradient: ['#FFF5EE', '#FBE9E7'], tabBarActive: '#FFAB91' },
  turtle: { primary: '#A5D6A7', secondary: '#80CBC4', accent: '#FFF176', background: '#F0FFF0', backgroundGradient: ['#F0FFF0', '#E8F5E9'], tabBarActive: '#A5D6A7' },
  bird: { primary: '#4DD0E1', secondary: '#B39DDB', accent: '#FF8A80', background: '#F0FFFF', backgroundGradient: ['#F0FFFF', '#E0F7FA'], tabBarActive: '#4DD0E1' },
  dragon: { primary: '#E53935', secondary: '#AB47BC', accent: '#FFD54F', background: '#FFF5F5', backgroundGradient: ['#FFF5F5', '#FFEBEE'], tabBarActive: '#E53935' },
  wolf: { primary: '#546E7A', secondary: '#78909C', accent: '#80CBC4', background: '#F5F7FA', backgroundGradient: ['#F5F7FA', '#ECEFF1'], tabBarActive: '#546E7A' },
  phoenix: { primary: '#FF6F00', secondary: '#FFA726', accent: '#FFD54F', background: '#FFF8E1', backgroundGradient: ['#FFF8E1', '#FFF3E0'], tabBarActive: '#FF6F00' },
  robot: { primary: '#00ACC1', secondary: '#78909C', accent: '#69F0AE', background: '#F0FDFA', backgroundGradient: ['#F0FDFA', '#E0F2F1'], tabBarActive: '#00ACC1' },
  fox: { primary: '#FF8F00', secondary: '#FFAB40', accent: '#A5D6A7', background: '#FFF8E7', backgroundGradient: ['#FFF8E7', '#FFF8E1'], tabBarActive: '#FF8F00' },
};

export const DEFAULT_THEME = ANIMAL_THEMES.cat;
