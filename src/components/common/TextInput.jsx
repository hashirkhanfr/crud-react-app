import { TextField } from '@mui/material';

export default function TextInput({ label, name, register, errors, ...props }) {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...register(name)}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'text.secondary',
          },
          '&:hover fieldset': {
            borderColor: 'text.primary',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
          '&.Mui-error fieldset': {
            borderColor: 'error.main',
            borderWidth: 2
          }
        },
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
          '&.Mui-focused': {
            color: 'primary.main'
          }
        },
        '& .MuiFormHelperText-root': {
          color: 'text.secondary'
        }
      }}
      {...props}
    />
  );
}