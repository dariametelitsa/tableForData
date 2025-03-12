import { createContext, useContext, useMemo, useState } from 'react';
import { ThemeMode } from '../shared/types.ts';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import * as React from 'react';
import { getTheme } from '../shared/themeColors.ts';

type ThemeContextType = {
  theme: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const muiTheme = useMemo(() => getTheme(theme), [theme]);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};