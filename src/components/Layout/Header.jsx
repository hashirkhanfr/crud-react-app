import { AppBar, Toolbar, Typography, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

export default function Header({ darkMode, toggleDarkMode, user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navItems =
    !user
      ? [
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
        ]
      : [
          {
            label: 'Dashboard',
            path: '/',
            color: 'primary',
          },
        ];

  const hideNav =
    (!user && location.pathname !== '/login' && location.pathname !== '/register')
      ? false
      : (user
          ? false
          : !(location.pathname === '/login' || location.pathname === '/register'));

  const showLoginRegister =
    !user && (location.pathname === '/login' || location.pathname === '/register');

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: { xs: '0.5rem', sm: '1rem', md: '1.5rem' },
        width: '100%',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        height: { xs: '3.5rem', sm: '4.5rem', md: '5rem' },
        minHeight: '3.5rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '3.5rem !important',
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: '0.5rem', sm: '1rem', md: '1.5rem' },
          width: '100%',
        }}
      >
        <PeopleAltRoundedIcon
          sx={{
            color: 'primary.main',
            fontSize: { xs: 24, sm: 28, md: 32 },
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
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
          }}
        >
          User Management
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1, md: 1.5 } }}>
          {showLoginRegister &&
            navItems.map((item) => (
              <Button
                key={item.label}
                variant={location.pathname === item.path ? 'contained' : 'outlined'}
                color={item.color}
                onClick={() => navigate(item.path)}
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  px: { xs: 1, sm: 2 },
                  boxShadow: 'none',
                  textTransform: 'none',
                  bgcolor: location.pathname === item.path ? `${item.color}.main` : 'transparent',
                  color: location.pathname === item.path ? `${item.color}.contrastText` : `${item.color}.main`,
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
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
          {!showLoginRegister && !hideNav && !isMobile && navItems.map((item) => (
            <Button
              key={item.label}
              variant={location.pathname === item.path ? 'contained' : 'outlined'}
              color={item.color}
              onClick={() => navigate(item.path)}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: { xs: 1, sm: 2 },
                boxShadow: 'none',
                textTransform: 'none',
                bgcolor: location.pathname === item.path ? `${item.color}.main` : 'transparent',
                color: location.pathname === item.path ? `${item.color}.contrastText` : `${item.color}.main`,
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
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
          {isMobile && !showLoginRegister && navItems.length > 0 && (
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
          {user && (
            <Button
              color="error"
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={onLogout}
              sx={{
                ml: { xs: 0.5, sm: 2 },
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                borderColor: 'error.main',
                color: 'error.main',
                fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                '&:hover': {
                  bgcolor: 'error.main',
                  color: 'error.contrastText',
                  boxShadow: 2,
                },
              }}
            >
              Logout
            </Button>
          )}
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            sx={{
              color: 'primary.main',
              transition: 'transform 0.2s',
              ml: { xs: 0.5, sm: 1 },
              '&:hover': { transform: 'scale(1.15)' },
              fontSize: { xs: '1rem', sm: '1.25rem' },
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