import React from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function Register() {
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
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: 'secondary.main' }}>
          Register
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create a new account to get started.
        </Typography>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField
            label="First Name"
            fullWidth
            sx={{ width: '100%' }}
          />
          <TextField
            label="Last Name"
            fullWidth
            sx={{ width: '100%' }}
          />
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
            autoComplete="new-password"
            sx={{ width: '100%' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
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
            Register
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
            Register with Google
          </Button>
        </Stack>
        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <a href="#/login" style={{ color: '#00bcd4', textDecoration: 'none', fontWeight: 500 }}>
            Login
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
