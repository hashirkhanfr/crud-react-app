import React, { useState } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import DeleteDialog from '../common/DeleteDialog';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TableActions({ onEdit, onDelete }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <ButtonGroup variant="outlined" size="small">
        <Button
          onClick={onEdit}
          startIcon={<EditIcon sx={{ color: 'secondary.main' }} />}
          sx={{
            color: 'secondary.main',
            borderColor: 'secondary.light',
            '&:hover': {
              transform: 'translateY(-2px) scale(1.05)',
              backgroundColor: 'secondary.light',
              color: 'primary.contrastText'
            }
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => setDeleteDialogOpen(true)}
          startIcon={<DeleteIcon sx={{ color: 'error.main' }} />}
          color="error"
          sx={{
            borderColor: 'error.light',
            '&:hover': {
              transform: 'translateY(-2px) scale(1.05)',
              backgroundColor: 'error.light',
              color: 'primary.contrastText'
            }
          }}
        >
          Delete
        </Button>
      </ButtonGroup>

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
}