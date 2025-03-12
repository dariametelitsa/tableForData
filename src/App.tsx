import { ThemeProvider } from './hooks/useTheme.tsx';
import Layout from '@components/layout/Layout.tsx';
import { Table } from '@components/Table';

function App() {

  return (
      <ThemeProvider>
        <Layout>
          <Table/>
        </Layout>
      </ThemeProvider>
  )
}

export default App
