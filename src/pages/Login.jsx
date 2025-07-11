import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Stack, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useForm } from 'react-hook-form';

const getCustomError = (code) => {
  switch (code) {
    case 'auth/user-not-found':
      return { message: 'No account found with this email.', code: 'ERR_NO_USER' };
    case 'auth/wrong-password':
      return { message: 'Incorrect password. Try again.', code: 'ERR_WRONG_PASSWORD' };
    case 'auth/invalid-email':
      return { message: 'Please enter a valid email address.', code: 'ERR_INVALID_EMAIL' };
    case 'auth/too-many-requests':
      return { message: 'Too many failed attempts. Please try again later.', code: 'ERR_TOO_MANY_ATTEMPTS' };
    default:
      return { message: 'Login failed. Please check your details.', code: 'ERR_LOGIN_FAILED' };
  }
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', code: '' });
  const [successSnackbar, setSuccessSnackbar] = React.useState(
    location.state && location.state.registered ? true : false
  );

  const { register, handleSubmit, setError, formState: { errors }, reset, clearErrors } = useForm({
    defaultValues: { email: '', password: '' }
  });

  React.useEffect(() => {
    if (location.state && location.state.registered) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const showSnackbar = (message, code) => {
    setSnackbar({ open: true, message, code });
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    clearErrors();
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/');
    } catch (err) {
      const code = err.code || '';
      let custom = getCustomError(code);
      if (code.includes('email') || code.includes('user')) setError('email', { message: custom.message });
      else if (code.includes('password')) setError('password', { message: custom.message });
      else setError('email', { message: custom.message });
      if (!code.includes('email') && !code.includes('user') && !code.includes('password')) {
        showSnackbar(custom.message, custom.code);
      }
    }
    setSubmitting(false);
  };

  const handleGoogleLogin = async () => {
    setSubmitting(true);
    clearErrors();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      showSnackbar('Google login failed. Try again.', 'ERR_GOOGLE_LOGIN');
    }
    setSubmitting(false);
  };

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          maxWidth: { xs: '90vw', sm: 400 },
          width: '100%',
          mx: 'auto',
          bgcolor: 'background.paper',
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
          Login
        </Typography>
        <Stack
          component="form"
          spacing={2}
          sx={{ width: '100%' }}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <TextField
            label="Email"
            type="text"
            fullWidth
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              width: '100%'
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required'
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: errors.password ? 'error.main' : undefined,
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(v => !v)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={submitting}
            sx={{ mt: 1 }}
          >
            Login
          </Button>
        </Stack>
        <Divider sx={{ my: 2, width: '100%' }}>or</Divider>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          disabled={submitting}
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            textTransform: 'none',
            bgcolor: 'background.default',
            '&:hover': {
              bgcolor: 'secondary.light',
              color: 'secondary.contrastText'
            }
          }}
        >
          Login with Google
        </Button>
        <Typography variant="body2" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Button 
            onClick={() => navigate('/register')} 
            sx={{ 
              color: '#7c4dff', 
              textDecoration: 'none', 
              fontWeight: 500,
              textTransform: 'none',
              p: 0,
              minWidth: 0
            }}
          >
            Register
          </Button>
        </Typography>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled" sx={{ borderRadius: 2 }}>
          {snackbar.message}
          {snackbar.code && (
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.7, mt: 0.5 }}>
              {snackbar.code}
            </Typography>
          )}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbar}
        autoHideDuration={4000}
        onClose={() => setSuccessSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={() => setSuccessSnackbar(false)} severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          Registration successful! Please log in.
        </Alert>
      </Snackbar>
    </Box>
  );
}