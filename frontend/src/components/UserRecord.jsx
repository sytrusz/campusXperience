import React, { useEffect, useState } from 'react';
import { Container, Paper, List, ListItem, ListItemText, Typography, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function UserRecord() {
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState({ userId: '', name: '', email: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("http://localhost:8080/user/getAll")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    };

    const handleDelete = (userId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (!isConfirmed) return;

        fetch(`http://localhost:8080/user/delete/${userId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.log(`User ${userId} deleted`);
                    fetchUsers();
                } else {
                    throw new Error('Failed to delete user');
                }
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleOpenDialog = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser({ userId: '', name: '', email: '', password: '' });
    };

    const handleUpdate = () => {
        const confirmUpdate = window.confirm("Are you sure you want to update this user?");
        
        if (confirmUpdate) {
            fetch(`http://localhost:8080/user/update?userId=${selectedUser.userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: selectedUser.name,
                    email: selectedUser.email,
                    password: selectedUser.password,
                })
            })
            .then(response => {
                if (response.ok) {
                    console.log(`User ${selectedUser.userId} updated`);
                    fetchUsers();
                    handleCloseDialog();
                } else {
                    throw new Error('Failed to update user');
                }
            })
            .catch(error => console.error('Error updating user:', error));
        }
    };
        
    return (
        <Container>
            <Paper elevation={3} style={{ padding: '10px 20px', width: 600, margin: '20px auto' }}>
                <Typography variant="h4" style={{ textAlign: 'center', marginBottom: '20px' }}>User List</Typography>
                <Box>
                    <List>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText
                                        primary={`ID: ${user.userId} - Name: ${user.name}`}
                                        secondary={`Email: ${user.email}`}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpenDialog(user)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(user.userId)}
                                    >
                                        Delete
                                    </Button>
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body1" style={{ textAlign: 'center' }}>
                                No users found.
                            </Typography>
                        )}
                    </List>
                </Box>
            </Paper>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Update User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={selectedUser.name}
                        onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={selectedUser.email}
                        onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        type="password"
                        margin="normal"
                        value={selectedUser.password}
                        onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Update</Button>
                </DialogActions>
                </Dialog>
        </Container>
    );
}  
