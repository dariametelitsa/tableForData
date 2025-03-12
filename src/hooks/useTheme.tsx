import * as React from 'react';
import { useMemo, useState } from 'react';
import { ThemeMode } from '../shared/types.ts';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getTheme } from '../shared/themeColors.ts';
import { getFromLocalStorage, setToLocalStorage } from '../shared/localStorage.ts';
import { ThemeContext } from './useThemeContext.ts';

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const themeFromLocaleStorage = getFromLocalStorage('theme')
  const [theme, setTheme] = useState<ThemeMode>(themeFromLocaleStorage as ThemeMode ?? 'light');
  const muiTheme = useMemo(() => getTheme(theme), [theme]);
  const toggleTheme = () => {
    const changeToTheme = theme === 'light' ? 'dark' : 'light'
    setToLocalStorage('theme', changeToTheme)
    setTheme(changeToTheme);
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}
