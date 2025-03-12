import { Button, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'react';
import { ThemeMode } from './shared/types.ts';
import { getTheme } from './shared/themeColors.ts';
import Layout from './components/layout/Layout.tsx';

function App() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <div>
            <Button
              variant="contained"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              Переключить тему
            </Button>
            <h1>Vite + React</h1>
          </div>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
