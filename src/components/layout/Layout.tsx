import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import * as React from 'react';

const Layout = ({ children }: {children: React.ReactNode}) => {
  return (
    <>
    <AppBar position="static" sx={{width: '100%'}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Table info sfdjdnsk skkn kskj kjk jkjkh kl sdnkdjnjkdn knkjn kjnk k
        </Typography>
      </Toolbar>
    </AppBar>
    <Box display="flex" minHeight="100vh" maxWidth='1536px' sx={{margin: "0 auto", paddingX: '20px', flexDirection: 'column', alignItems: 'center'}}>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
    </>
  );
};

export default Layout;
