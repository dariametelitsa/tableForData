import { Box } from '@mui/material';
import Layout from './components/layout/Layout.tsx';
import { ThemeProvider } from './hooks/useTheme.tsx';

function App() {

  return (
      <ThemeProvider>
        <Layout>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h1>Vite + React</h1>
          </Box>
        </Layout>
      </ThemeProvider>
  )
}

export default App
