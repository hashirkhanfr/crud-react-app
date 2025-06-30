import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function NameFields({ control, errors, only }) {
  if (only === 'firstName') {
    return (
      <Controller
        name="firstName"
        control={control}
        rules={{ 
          required: 'First name is required',
          pattern: {
            value: /^[a-zA-ZÀ-ÿ-' ]+$/,
            message: 'Only letters and hyphens allowed'
          },
          minLength: {
            value: 2,
            message: 'Minimum 2 characters'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            fullWidth
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />
    );
  }
  if (only === 'lastName') {
    return (
      <Controller
        name="lastName"
        control={control}
        rules={{ 
          required: 'Last name is required',
          pattern: {
            value: /^[a-zA-ZÀ-ÿ-' ]+$/,
            message: 'Only letters and hyphens allowed'
          },
          minLength: {
            value: 2,
            message: 'Minimum 2 characters'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            fullWidth
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        )}
      />
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Controller
          name="firstName"
          control={control}
          rules={{ 
            required: 'First name is required',
            pattern: {
              value: /^[a-zA-ZÀ-ÿ-' ]+$/,
              message: 'Only letters and hyphens allowed'
            },
            minLength: {
              value: 2,
              message: 'Minimum 2 characters'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          name="lastName"
          control={control}
          rules={{ 
            required: 'Last name is required',
            pattern: {
              value: /^[a-zA-ZÀ-ÿ-' ]+$/,
              message: 'Only letters and hyphens allowed'
            },
            minLength: {
              value: 2,
              message: 'Minimum 2 characters'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}