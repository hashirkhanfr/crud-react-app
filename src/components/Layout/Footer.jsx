import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ 
      py: { xs: 1.5, sm: 2.5, md: 3 }, 
      textAlign: 'center',
      bgcolor: 'background.default',
      borderTop: '1px solid',
      borderColor: 'divider',
      width: '100%',
      px: { xs: 1, sm: 2, md: 3 },
      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
    }}>
      <Typography variant="body2" color="text.secondary">
        Made by <Link href="https://github.com/hashirkhanfr" target="_blank" color="primary">Hashir Khan</Link>
      </Typography>
    </Box>
  );
}
