import React from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          mx: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'primary.main' }}>
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Welcome back! Please login to your account.
        </Typography>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            autoComplete="email"
            sx={{ width: '100%' }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            autoComplete="current-password"
            sx={{ width: '100%' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 600,
              letterSpacing: 1,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              }
            }}
          >
            Login
          </Button>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              fontWeight: 600,
              letterSpacing: 1,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'secondary.light',
                color: 'primary.contrastText'
              }
            }}
          >
            Login with Google
          </Button>
        </Stack>
        <Typography variant="body2" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <a href="#/register" style={{ color: '#7c4dff', textDecoration: 'none', fontWeight: 500 }}>
            Register
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
