import { createTheme } from '@mui/material';
import { ThemeMode } from './types.ts';

const colors = {
  primary: {
    main: "#4CAF50",
    light: "#81C784",
    dark: "#388E3C",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#8BC34A",
    light: "#C5E1A5",
    dark: "#689F38",
    contrastText: "#ffffff",
  },
  lightMode: {
    background: {
      default: "#F1F8E9",
      paper: "#E8F5E9",
    },
    text: {
      primary: "#2E7D32",
      secondary: "#558B2F",
      tertiary: "#4CAF50",
      disabled: "#A5D6A7",
      link: "#388E3C",
      heading: "#1B5E20",
    },
  },
  darkMode: {
    background: {
      default: "#121212",
      paper: "#2E7D32",
    },
    text: {
      primary: "#C8E6C9",
      secondary: "#A5D6A7",
      tertiary: "#81C784",
      disabled: "#607D8B",
      link: "#81C784",
      heading: "#A5D6A7",
    },
  },
};

export const getTheme = (mode: ThemeMode) =>
  createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      background: mode === "dark" ? colors.darkMode.background : colors.lightMode.background,
      text: mode === "dark" ? colors.darkMode.text : colors.lightMode.text,
    }
  });
