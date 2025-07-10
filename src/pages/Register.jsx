import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Stack, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useForm } from 'react-hook-form';

const getCustomError = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return { message: 'This email is already in use.', code: 'ERR_EMAIL_EXISTS' };
    case 'auth/invalid-email':
      return { message: 'Please enter a valid email address.', code: 'ERR_INVALID_EMAIL' };
    case 'auth/weak-password':
      return { message: 'Password should be at least 6 characters.', code: 'ERR_WEAK_PASSWORD' };
    case 'auth/missing-password':
      return { message: 'Password is required.', code: 'ERR_MISSING_PASSWORD' };
    default:
      return { message: 'Registration failed. Please check your details.', code: 'ERR_REGISTER_FAILED' };
  }
};

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', code: '' });

  const { register, handleSubmit, setError, formState: { errors }, watch, clearErrors } = useForm({
    defaultValues: { name: '', email: '', password: '', confirm: '' }
  });

  const showSnackbar = (message, code) => {
    setSnackbar({ open: true, message, code });
  };

  const onSubmit = async (data) => {
    clearErrors();
    setSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(userCredential.user, { displayName: data.name });
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      const code = err.code || '';
      let custom = getCustomError(code);
      if (code.includes('email')) setError('email', { message: custom.message });
      else if (code.includes('password')) setError('password', { message: custom.message });
      else setError('name', { message: custom.message });
      if (!code.includes('email') && !code.includes('password') && !code.includes('name')) {
        showSnackbar(custom.message, custom.code);
      }
    }
    setSubmitting(false);
  };

  const handleGoogleRegister = async () => {
    setSubmitting(true);
    clearErrors();
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      showSnackbar('Google registration failed. Try again.', 'ERR_GOOGLE_REGISTER');
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
          Register
        </Typography>
        <Stack
          component="form"
          spacing={2}
          sx={{ width: '100%' }}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <TextField
            label="Full Name"
            fullWidth
            autoComplete="name"
            {...register('name', {
              required: 'Name is required',
              pattern: {
                value: /^[a-zA-ZÀ-ÿ-' ]+$/,
                message: 'Name can only contain letters and hyphens.'
              },
              minLength: {
                value: 2,
                message: 'Minimum 2 characters'
              }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{
              width: '100%'
            }}
          />
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
            autoComplete="new-password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password should be at least 6 characters.'
              }
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
          <TextField
            label="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            fullWidth
            autoComplete="new-password"
            {...register('confirm', {
              required: 'Please confirm your password',
              validate: value =>
                value === watch('password') || 'Passwords do not match'
            })}
            error={!!errors.confirm}
            helperText={errors.confirm?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: errors.confirm ? 'error.main' : undefined,
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirm(v => !v)}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
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
            Register
          </Button>
        </Stack>
        <Divider sx={{ my: 2, width: '100%' }}>or</Divider>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleRegister}
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
          Register with Google
        </Button>
        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <Button 
            onClick={() => navigate('/login')} 
            sx={{ 
              color: '#00bcd4', 
              textDecoration: 'none', 
              fontWeight: 500,
              textTransform: 'none',
              p: 0,
              minWidth: 0
            }}
          >
            Login
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
    </Box>
  );
}