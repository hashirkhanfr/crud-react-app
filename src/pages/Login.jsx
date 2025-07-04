import React from 'react';
import { Box, Typography, Paper, TextField, Button, Divider, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

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
        {/* ... existing code ... */}
        <Typography variant="body2" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Button 
            onClick={() => navigate('/register')} 
            sx={{ 
              color: '#7c4dff', 
              textDecoration: 'none', 
              fontWeight: 500,
              textTransform: 'none',
              p: 0,
              minWidth: 0
            }}
          >
            Register
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}