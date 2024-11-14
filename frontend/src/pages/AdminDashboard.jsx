import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { createTheme } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <PersonIcon />,
  },
  {
    segment: 'admin',
    title: 'Admin',
    icon: <PersonIcon />,
  },
  {
    segment: 'events',
    title: 'Events',
    icon: <EventIcon />,
  },
  {
    kind: 'divider',
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/getAll");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const usersData = await response.json();
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError('Could not fetch users. Please try again later.');
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setOpenDialog(true);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: user.password
    });
    setOpenDialog(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8080/user/delete/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        fetchUsers(); // Refresh the list
      } catch (err) {
        console.error("Error deleting user:", err);
        setError('Could not delete user. Please try again later.');
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const url = selectedUser 
        ? `http://localhost:8080/user/update?userId=${selectedUser.userId}`
        : 'http://localhost:8080/user/save';
      
      const method = selectedUser ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(selectedUser ? 'Failed to update user' : 'Failed to create user');
      }

      fetchUsers(); // Refresh the list
      handleDialogClose();
    } catch (err) {
      console.error("Error:", err);
      setError(`Could not ${selectedUser ? 'update' : 'create'} user. Please try again later.`);
    }
  };


  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">
            User Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            startIcon={<PersonIcon />}
          >
            Add User
          </Button>
        </Box>
        
        {error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem key={user.userId}>
                <ListItemText
                  primary={user.name}
                  secondary={
                    <>
                      <Typography component="span" display="block">Email: {user.email}</Typography>
                      <Typography component="span" display="block">Password: {user.password}</Typography>
                    </>
                  }
                />
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(user)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(user.userId)}
                  >
                    Delete
                  </Button>
                </Stack>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{selectedUser ? 'Update User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    fetchAdmins();
  }, []);


  const fetchAdmins = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/getAll");
      if (!response.ok) {
        throw new Error("Failed to fetch admins");
      }
      const adminsData = await response.json();
      setAdmins(adminsData);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setError('Could not fetch admins. Please try again later.');
    }
  };

  const handleCreate = () => {
    setSelectedAdmin(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: ''
    });
    setOpenDialog(true);
  };

  const handleUpdate = (admin) => {
    setSelectedAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: admin.role
    });
    setOpenDialog(true);
  };

  const handleDelete = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        const response = await fetch(`http://localhost:8080/admin/delete/${adminId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete admin');
        }
        fetchAdmins(); // Refresh the list
      } catch (err) {
        console.error("Error deleting admin:", err);
        setError('Could not delete admin. Please try again later.');
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedAdmin(null);
    setFormData({ name: '', email: '', password: '', role: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const url = selectedAdmin 
        ? `http://localhost:8080/admin/update?adminId=${selectedAdmin.adminId}`
        : 'http://localhost:8080/admin/save';
      
      const method = selectedAdmin ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(selectedAdmin ? 'Failed to update admin' : 'Failed to create admin');
      }

      fetchAdmins(); // Refresh the list
      handleDialogClose();
    } catch (err) {
      console.error("Error:", err);
      setError(`Could not ${selectedAdmin ? 'update' : 'create'} admin. Please try again later.`);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', margin: '20px 0' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">
            Admin Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            startIcon={<PersonIcon />}
          >
            Add Admin
          </Button>
        </Box>

        {error ? (
          <Typography color="error" align="center">{error}</Typography>
        ) : (
          <List>
            {admins.map((admin) => (
              <ListItem key={admin.adminId}>
                <ListItemText
                  primary={admin.name}
                  secondary={
                    <>
                      <Typography component="span" display="block">Email: {admin.email}</Typography>
                      <Typography component="span" display="block">Password: {admin.password}</Typography>
                      <Typography component="span" display="block">Role: {admin.role}</Typography>
                    </>
                  }
                />
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(admin)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(admin.adminId)}
                  >
                    Delete
                  </Button>
                </Stack>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{selectedAdmin ? 'Update Admin' : 'Add New Admin'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="role"
            label="Role"
            type="text"
            fullWidth
            value={formData.role}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedAdmin ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


function EventManagement(){
  return (
    <p>Events</p>
  );
}

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        width: '100%'
      }}
    >
      {pathname === '/dashboard' && <Typography>Dashboard Overview</Typography>}
      {pathname === '/users' && <UserManagement />}
      {pathname === '/admin' && <AdminManagement />}
      {pathname === '/events' && <EventManagement />}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default function AdminDashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}