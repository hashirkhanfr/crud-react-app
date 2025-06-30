import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Paper, Typography, Box, Grid, Divider, TextField, useTheme } from '@mui/material';
import SubmitButton from '../common/SubmitButton';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';

export default function UserForm({ onSubmit, editingUser, showError }) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    register,
    setValue,
    watch
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      hobby: ''
    }
  });

  const onSubmitWithValidation = async (data) => {
    const isValid = await trigger();
    if (!isValid) {
      showError('Please fix the errors in the form');
      return;
    }
    onSubmit(data);
  };

  React.useEffect(() => {
    reset(editingUser || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      hobby: ''
    });
  }, [editingUser]);

  const phoneValue = watch('phone');

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 2, sm: 3 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        height: '100%',
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        maxWidth: 450,
        mx: 'auto',
        width: '100%'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {editingUser ? (
          <EditNoteRoundedIcon sx={{ color: 'secondary.main', fontSize: 32, mr: 1 }} />
        ) : (
          <PersonAddAlt1RoundedIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
        )}
        <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', fontWeight: 700 }}>
          {editingUser ? 'Edit User' : 'Add User'}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmitWithValidation)}
        sx={{ width: '100%' }}
      >
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
            <TextField
              label="First Name"
              fullWidth
              margin="none"
              {...register('firstName', {
                required: 'First name is required',
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ-' ]+$/,
                  message: 'Only letters and hyphens allowed'
                },
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters'
                }
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              sx={{
                width: '100%'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
            <TextField
              label="Last Name"
              fullWidth
              margin="none"
              {...register('lastName', {
                required: 'Last name is required',
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ-' ]+$/,
                  message: 'Only letters and hyphens allowed'
                },
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters'
                }
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              sx={{
                width: '100%'
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, width: '100%' }}>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="none"
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
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Phone number is required',
                validate: value =>
                  (value && matchIsValidTel(value)) || 'Enter a valid phone number'
              }}
              render={({ field }) => (
                <MuiTelInput
                  {...field}
                  value={field.value || ''}
                  onChange={value => field.onChange(value)}
                  defaultCountry="US"
                  fullWidth
                  margin="none"
                  label="Phone"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  sx={{
                    width: '100%'
                  }}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: false,
                    style: {
                      fontFamily: '"Roboto","Helvetica","Arial",sans-serif'
                    }
                  }}
                  FormHelperTextProps={{
                    sx: { ml: 0 }
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              label="Location"
              fullWidth
              margin="none"
              {...register('location', {
                required: 'Location is required',
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ-' ]+$/,
                  message: 'Only letters and hyphens allowed'
                },
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters'
                }
              })}
              error={!!errors.location}
              helperText={errors.location?.message}
              sx={{
                width: '100%'
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <TextField
              label="Hobby"
              fullWidth
              margin="none"
              {...register('hobby', {
                required: 'Hobby is required',
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters'
                }
              })}
              error={!!errors.hobby}
              helperText={errors.hobby?.message}
              sx={{
                width: '100%'
              }}
            />
          </Grid>
        </Grid>
        <SubmitButton isEditing={!!editingUser} />
      </Box>
    </Paper>
  );
}