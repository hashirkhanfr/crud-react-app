import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export default function Layout({ children, user, onLogout }) {
  const [darkMode, setDarkMode] = React.useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00bcd4',
        light: '#62efff',
        dark: '#008ba3',
        contrastText: '#fff',
      },
      secondary: {
        main: '#7c4dff',
        light: '#b47cff',
        dark: '#3f1dcb',
        contrastText: '#fff',
      },
      background: {
        default: darkMode ? '#181c24' : '#f5f7fa',
        paper: darkMode ? '#23272f' : '#fff',
      },
      text: {
        primary: darkMode ? '#f8f9fa' : '#23272f',
        secondary: darkMode ? '#b0bec5' : '#4d4d4d',
      },
      divider: darkMode ? '#263043' : '#e0e0e0',
      error: {
        main: '#ff5252',
        dark: '#c50e29',
      },
      success: {
        main: '#00e676',
        dark: '#00b248',
      },
      warning: {
        main: '#ffb300',
      },
      info: {
        main: '#29b6f6',
      },
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightBold: 700,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            letterSpacing: '0.5px',
            borderRadius: 10,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'all 0.3s ease',
            borderRadius: 14,
            boxShadow: darkMode
              ? '0 2px 16px 0 rgba(0,0,0,0.25)'
              : '0 2px 8px 0 rgba(0,0,0,0.08)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent !important',
          },
          input: {
            backgroundColor: 'transparent !important',
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent !important',
          },
          input: {
            backgroundColor: 'transparent !important',
          }
        }
      }
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} onLogout={onLogout} />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}