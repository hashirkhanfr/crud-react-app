import { Button } from '@mui/material';

export default function SubmitButton({ isEditing }) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      size="large"
      sx={{ 
        mt: 3,
        py: 1.5,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4
        }
      }}
    >
      {isEditing ? 'Update User' : 'Add User'}
    </Button>
  );
}