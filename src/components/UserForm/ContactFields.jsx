import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export default function ContactFields({ control, errors }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'text.secondary',
                  },
                  '&:hover fieldset': {
                    borderColor: 'text.primary',
                  },
                }
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'Phone is required',
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: '10-15 digits required'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="location"
          control={control}
          rules={{ 
            required: 'Location is required',
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
              label="Location"
              fullWidth
              margin="normal"
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="hobby"
          control={control}
          rules={{ 
            required: 'Hobby is required',
            minLength: {
              value: 2,
              message: 'Minimum 2 characters'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Hobby"
              fullWidth
              margin="normal"
              error={!!errors.hobby}
              helperText={errors.hobby?.message}
            />
          )}
        />
      </Grid>
    </Grid>
  );
}