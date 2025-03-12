import { Box } from '@mui/material';
import { ThemeProvider } from './hooks/useTheme.tsx';
import Layout from '@components/layout/Layout.tsx';
import { Table } from '@components/Table';

function App() {

  return (
      <ThemeProvider>
        <Layout>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h1>Vite + React</h1>
          </Box>
          <Table/>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h1>Vite + React</h1>
          </Box>
        </Layout>
      </ThemeProvider>
  )
}

export default App
