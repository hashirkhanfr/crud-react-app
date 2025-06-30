import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ 
      py: 3, 
      textAlign: 'center',
      bgcolor: 'background.default',
      borderTop: '1px solid',
      borderColor: 'divider'
    }}>
      <Typography variant="body2" color="text.secondary">
        Made by <Link href="https://github.com/hashirkhanfr" target="_blank" color="primary">Hashir Khan</Link>
      </Typography>
    </Box>
  );
}