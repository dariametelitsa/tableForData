import { createContext, useContext } from 'react';
import { ThemeMode } from '../shared/types.ts';

type ThemeContextType = {
  theme: ThemeMode
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};