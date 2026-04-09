import React, { createContext, useContext, useMemo } from 'react';
import { useProfile } from './ProfileContext';
import { ANIMAL_THEMES, DEFAULT_THEME, AnimalTheme } from '../constants/themes';

const ThemeContext = createContext<AnimalTheme>(DEFAULT_THEME);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentProfile } = useProfile();
  const theme = useMemo(() => {
    if (currentProfile?.animal_type && ANIMAL_THEMES[currentProfile.animal_type]) {
      return ANIMAL_THEMES[currentProfile.animal_type];
    }
    return DEFAULT_THEME;
  }, [currentProfile?.animal_type]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): AnimalTheme { return useContext(ThemeContext); }
