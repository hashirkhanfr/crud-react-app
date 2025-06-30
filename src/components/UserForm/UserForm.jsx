import React from 'react';
import { useForm } from 'react-hook-form';
import { Paper, Typography, Box, Grid, Divider, TextField } from '@mui/material';
import SubmitButton from '../common/SubmitButton';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

export default function UserForm({ onSubmit, editingUser, showError }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger
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
        mx: 'auto'
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
      <Box component="form" onSubmit={handleSubmit(onSubmitWithValidation)}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              {...control.register('firstName', {
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              {...control.register('lastName', {
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
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...control.register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              {...control.register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: '10-15 digits required'
                }
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              fullWidth
              margin="normal"
              {...control.register('location', {
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Hobby"
              fullWidth
              margin="normal"
              {...control.register('hobby', {
                required: 'Hobby is required',
                minLength: {
                  value: 2,
                  message: 'Minimum 2 characters'
                }
              })}
              error={!!errors.hobby}
              helperText={errors.hobby?.message}
            />
          </Grid>
        </Grid>
        <SubmitButton isEditing={!!editingUser} />
      </Box>
    </Paper>
  );
}