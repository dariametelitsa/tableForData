import { ThemeProvider } from './hooks/useTheme.tsx';
import Layout from '@components/layout/Layout.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { Table } from '@/entity/table';
import { queryClient } from '@/api/query-client.ts';

function App() {

  return (
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Table/>
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
  )
}

export default App
