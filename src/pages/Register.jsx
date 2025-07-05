import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Stack, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebase';

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
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', code: '' });

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    else if (!/^[a-zA-ZÀ-ÿ-' ]+$/.test(form.name.trim())) errors.name = 'Name can only contain letters and hyphens.';
    if (!form.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Please enter a valid email address.';
    if (!form.password) errors.password = 'Password is required';
    else if (form.password.length < 6) errors.password = 'Password should be at least 6 characters.';
    if (!form.confirm) errors.confirm = 'Please confirm your password';
    else if (form.password !== form.confirm) errors.confirm = 'Passwords do not match';
    return errors;
  };

  const showSnackbar = (message, code) => {
    setSnackbar({ open: true, message, code });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFieldError({});
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      if (errors.name) showSnackbar(errors.name, 'ERR_INVALID_NAME');
      else if (errors.email) showSnackbar(errors.email, 'ERR_INVALID_EMAIL');
      else if (errors.password) showSnackbar(errors.password, 'ERR_INVALID_PASSWORD');
      else if (errors.confirm) showSnackbar(errors.confirm, 'ERR_PASSWORD_MISMATCH');
      setFieldError(errors);
      return;
    }
    setSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });
      // Navigate to login page after successful registration
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      const code = err.code || '';
      let errors = {};
      let custom = getCustomError(code);
      if (code.includes('email')) errors.email = custom.message;
      else if (code.includes('password')) errors.password = custom.message;
      else errors.general = custom.message;
      setFieldError(errors);
      showSnackbar(custom.message, custom.code);
    }
    setSubmitting(false);
  };

  const handleGoogleRegister = async () => {
    setSubmitting(true);
    setFieldError({});
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
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
          Register
        </Typography>
        <Stack component="form" spacing={2} sx={{ width: '100%' }} onSubmit={handleRegister}>
          <TextField
            label="Full Name"
            required
            fullWidth
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            autoComplete="name"
            error={!!fieldError.name}
            helperText={fieldError.name}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: fieldError.name ? 'error.main' : undefined,
                }
              }
            }}
          />
          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            autoComplete="email"
            error={!!fieldError.email}
            helperText={fieldError.email}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: fieldError.email ? 'error.main' : undefined,
                }
              }
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            fullWidth
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            autoComplete="new-password"
            error={!!fieldError.password}
            helperText={fieldError.password}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: fieldError.password ? 'error.main' : undefined,
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
            required
            fullWidth
            value={form.confirm}
            onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
            autoComplete="new-password"
            error={!!fieldError.confirm}
            helperText={fieldError.confirm}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: fieldError.confirm ? 'error.main' : undefined,
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