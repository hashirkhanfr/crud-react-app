import React, { useState } from 'react';
import { Container, Grid, useMediaQuery, Typography } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserForm from './components/UserForm/UserForm';
import UserTable from './components/UserTable/UserTable';
import Layout from './components/Layout/Layout';
import Notification from './components/common/Notification';
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = (data) => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...data, id: editingUser.id } : user
      ));
      showNotification('User updated successfully!');
    } else {
      setUsers([...users, { ...data, id: Date.now() }]);
      showNotification('User added successfully!');
    }
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    showNotification('User deleted successfully!');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          <Button color="inherit" onClick={() => navigate('/register')}>Register</Button>
        </Toolbar>
      </AppBar>
      
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Container
                maxWidth={false}
                sx={{
                  py: { xs: 2, sm: 4 },
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderRadius: 3,
                  width: '100%',
                  maxWidth: '100vw',
                  px: { xs: 0, sm: 0 },
                  overflowX: 'hidden',
                }}
              >
                <Grid
                  container
                  spacing={4}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  sx={{
                    flex: 1,
                    mt: { xs: 1, md: 4 },
                    mb: { xs: 1, md: 4 },
                    flexDirection: { xs: 'column', md: 'row' },
                    width: '100%',
                    maxWidth: '100vw',
                    mx: 0,
                    overflowX: 'hidden',
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md="auto"
                    sx={{
                      flexBasis: { xs: '100%', md: 400 },
                      maxWidth: { xs: '100%', md: 400 },
                      flexGrow: 0,
                      minWidth: 0,
                      mb: { xs: 2, md: 0 },
                      display: 'flex',
                      flexDirection: 'column',
                      mr: { xs: 0, md: 4, lg: 4 },
                      ml: { xs: 0, md: 4, lg: 6 },
                    }}
                  >
                    <UserForm
                      onSubmit={handleSubmit}
                      editingUser={editingUser}
                      showError={(message) => showNotification(message, 'error')}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md
                    sx={{
                      flexBasis: { xs: '100%', md: 0 },
                      flexGrow: 100,
                      maxWidth: { xs: '100%', md: 'calc(100% - 540px)' },
                      minWidth: 0,
                      mt: { xs: 2, md: 0 },
                      pl: { xs: 0, md: 3 },
                      display: 'flex',
                      flexDirection: 'column',
                      overflowX: 'auto',
                    }}
                  >
                    <UserTable
                      users={users}
                      onEdit={setEditingUser}
                      onDelete={handleDelete}
                    />
                  </Grid>
                </Grid>
                <Notification
                  open={notification.open}
                  message={notification.message}
                  severity={notification.severity}
                  onClose={handleCloseNotification}
                />
              </Container>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;