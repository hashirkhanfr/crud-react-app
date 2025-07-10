import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Avatar, Box, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ProfilePopup({ user, open, onClose }) {
  const theme = useTheme();

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          {user.firstName} {user.lastName}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ textAlign: 'center' }}>
        <Avatar
          src={user.profilePictureUrl}
          alt={`${user.firstName} ${user.lastName}`}
          sx={{ width: 120, height: 120, mx: 'auto', mb: 2, border: `3px solid ${theme.palette.primary.main}` }}
        />
        <Box sx={{ textAlign: 'left', px: 2 }}>
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
          <Typography variant="body1"><strong>Location:</strong> {user.location}</Typography>
          <Typography variant="body1"><strong>Hobby:</strong> {user.hobby}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
