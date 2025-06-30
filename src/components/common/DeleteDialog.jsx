import { Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button,Box} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{
      sx: {
        bgcolor: 'background.paper',
        borderRadius: 3
      }
    }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <DeleteIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <DialogTitle sx={{ color: 'text.primary' }}>Delete User?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>
            This action cannot be undone. Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button 
            onClick={onClose} 
            variant="outlined"
            sx={{
              color: 'text.primary',
              borderColor: 'text.secondary',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 1,
                borderColor: 'text.primary'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
                backgroundColor: 'error.dark'
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}