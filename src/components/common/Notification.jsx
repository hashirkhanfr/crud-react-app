import { Snackbar, Alert } from '@mui/material';

export default function Notification({ open, message, severity, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity}
        sx={{ width: '100%', bgcolor: severity === 'error' ? 'error.dark' : 'success.dark' }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}