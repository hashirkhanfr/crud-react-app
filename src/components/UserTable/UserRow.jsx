import { TableCell, TableRow } from '@mui/material';
import TableActions from './TableActions';

export default function UserRow({ user, onEdit, onDelete, onViewProfile }) {
  return (
    <TableRow hover sx={{ 
      transition: 'background-color 0.3s ease',
      '&:last-child td, &:last-child th': { border: 0 }
    }}>
      <TableCell sx={{ color: 'text.primary' }}>{user.firstName}</TableCell>
      <TableCell sx={{ color: 'text.primary' }}>{user.lastName}</TableCell>
      <TableCell sx={{ color: 'text.primary' }}>{user.email}</TableCell>
      <TableCell sx={{ color: 'text.primary' }}>{user.phone}</TableCell>
      <TableCell sx={{ color: 'text.primary' }}>{user.location}</TableCell>
      <TableCell sx={{ color: 'text.primary' }}>{user.hobby}</TableCell>
      <TableCell>
        <TableActions 
          onEdit={() => onEdit(user)} 
          onDelete={() => onDelete(user.id)} 
          onViewProfile={() => onViewProfile(user)}
        />
      </TableCell>
    </TableRow>
  );
}
