import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: { xs: 1, sm: 3 },
      }}
    >
      <Toolbar>
        <PeopleAltRoundedIcon
          sx={{
            color: 'primary.main',
            fontSize: 32,
            mr: 1,
            verticalAlign: 'middle',
          }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            color: 'text.primary',
            letterSpacing: 1,
          }}
        >
          User Management
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{
              color: 'primary.main',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.15)' },
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}