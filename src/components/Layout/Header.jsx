import { AppBar, Toolbar, Typography, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

export default function Header({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navItems = [
    {
      label: 'Dashboard',
      path: '/',
      color: 'primary',
    },
    {
      label: 'Login',
      path: '/login',
      color: 'secondary',
    },
    {
      label: 'Register',
      path: '/register',
      color: 'secondary',
    },
  ];

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Desktop Buttons */}
          {!isMobile && navItems.map((item) => (
            <Button
              key={item.label}
              variant={location.pathname === item.path ? 'contained' : 'outlined'}
              color={item.color}
              onClick={() => navigate(item.path)}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 2,
                boxShadow: 'none',
                textTransform: 'none',
                bgcolor: location.pathname === item.path ? `${item.color}.main` : 'transparent',
                color: location.pathname === item.path ? `${item.color}.contrastText` : `${item.color}.main`,
                '&:hover': {
                  bgcolor: `${item.color}.dark`,
                  color: `${item.color}.contrastText`,
                  boxShadow: 2,
                },
              }}
            >
              {item.label}
            </Button>
          ))}

          
          {isMobile && (
            <>
              <IconButton
                color="primary"
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
                aria-label="open navigation menu"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    selected={location.pathname === item.path}
                    onClick={() => {
                      navigate(item.path);
                      handleMenuClose();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{
              color: 'primary.main',
              transition: 'transform 0.2s',
              ml: 1,
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