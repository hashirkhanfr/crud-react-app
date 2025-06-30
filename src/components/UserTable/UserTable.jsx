import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,useMediaQuery,useTheme,Typography,Box} from '@mui/material';
import UserRow from './UserRow';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

export default function UserTable({ users, onEdit, onDelete }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isLight = theme.palette.mode === 'light';

  return (
    <TableContainer
      component={Paper}
      elevation={4}
      sx={{
        borderRadius: 1.5,
        overflowX: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 3,
        '& .MuiTableRow-root:hover': {
          bgcolor: 'action.hover'
        }
      }}
    >
      {users.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No users found. Add a user to get started.
          </Typography>
        </Box>
      ) : (
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: 'primary.main',
                '& th': {
                  color: isLight ? 'primary.dark' : 'common.white',
                  fontWeight: 'bold',
                  backgroundColor: 'primary.main',
                  transition: 'background 0.2s, color 0.2s',
                }
              }}
            >
              <TableCell sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: isLight ? 'primary.dark' : 'common.white',
                fontWeight: 'bold'
              }}>
                <PersonOutlineRoundedIcon sx={{ color: 'secondary.light', fontSize: 22 }} />
                First Name
              </TableCell>
              <TableCell sx={{ color: isLight ? 'primary.dark' : 'common.white', fontWeight: 'bold' }}>Last Name</TableCell>
              <TableCell sx={{ color: isLight ? 'primary.dark' : 'common.white', fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ color: isLight ? 'primary.dark' : 'common.white', fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ color: isLight ? 'primary.dark' : 'common.white', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: isLight ? 'primary.dark' : 'common.white', fontWeight: 'bold' }}>Hobby</TableCell>
              <TableCell sx={{ color: isLight ? 'primary.dark' : 'common.white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}