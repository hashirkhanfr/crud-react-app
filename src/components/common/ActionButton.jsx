import { Button } from '@mui/material';

export default function ActionButton({ 
  children, 
  variant = 'contained', 
  color = 'primary', 
  fullWidth = true,
  ...props 
}) {
  return (
    <Button
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      size="large"
      sx={{
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
}