import { ThemeProvider } from './hooks/useTheme.tsx';
import Layout from '@components/layout/Layout.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/query-client.ts';
import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const Table = React.lazy(() => import('./entity/table/Table.tsx'));

function App() {

  return (
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Suspense fallback={<CircularProgress color="success" />}>
              <Table />
            </Suspense>
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
  )
}

export default App
