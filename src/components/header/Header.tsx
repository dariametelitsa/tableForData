import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material';
import { useThemeContext } from '@hooks/useThemeContext.ts';

export const Header = () => {
  const {toggleTheme} = useThemeContext()

  return (
    <Box sx={{ flexGrow: 1, mb: 12 }}>
      <AppBar position="fixed" sx={{ width: '100%' }}>
        <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Characters
          </Typography>
          <Button
            variant="contained"
            color={'secondary'}
            onClick={() => toggleTheme()}
          >
            Switch theme
          </Button>
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}