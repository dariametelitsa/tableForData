import { Container } from '@mui/material';
import * as React from 'react';
import { Header } from '@components/header';

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <>
      <Header/>
      <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
