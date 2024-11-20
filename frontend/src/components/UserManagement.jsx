import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  Stack,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";


const makeAuthorizedRequest = async (url, options = {}) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
  
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
  
    // Attempt to parse JSON response, but handle cases where response is empty
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
  
    // If no JSON response, return an empty object or status
    return {};
  };

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    const [confirmDialog, setConfirmDialog] = useState({
      open: false,
      type: "", // 'update' or 'delete'
      user: null, // Target user
    });
  
    const ConfirmationDialog = ({ open, onClose, onConfirm, title, message }) => (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  
    const [pendingUpdateData, setPendingUpdateData] = useState(null);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const usersData = await makeAuthorizedRequest(
          "http://localhost:8080/user/getAll"
        );
        setUsers(usersData);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Could not fetch users. Please try again later.");
      }
    };
  
    const handleCreate = () => {
      setSelectedUser(null);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setOpenDialog(true);
    };
  
    const handleUpdate = (user) => {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      setOpenDialog(true);
    };
  
    const handleDelete = (userId) => {
      setConfirmDialog({
        open: true,
        type: "delete",
        user: { userId },
      });
    };
  
    const handleConfirmAction = async () => {
      const { type, user } = confirmDialog;
  
      try {
        if (type === "update") {
          const url = `http://localhost:8080/user/update?userId=${pendingUpdateData.userId}`;
          await makeAuthorizedRequest(url, {
            method: "PUT",
            body: JSON.stringify(pendingUpdateData.data),
          });
        } else if (type === "delete") {
          await makeAuthorizedRequest(
            `http://localhost:8080/user/delete/${user.userId}`,
            {
              method: "DELETE",
            }
          );
        }
        fetchUsers(); // Refresh list
      } catch (err) {
        console.error(`Error during ${type}:`, err);
        setError(`Could not ${type} user. Please try again later.`);
      }
  
      setConfirmDialog({ open: false, type: "", user: null });
      setPendingUpdateData(null); // Reset pending data
    };
  
    const handleDialogClose = () => {
      setOpenDialog(false);
      setSelectedUser(null);
      setFormData({ name: "", email: "", password: "" });
    };
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async () => {
      try {
        if (selectedUser) {
          // For updates - send a direct PUT request
          const response = await makeAuthorizedRequest(
            `http://localhost:8080/user/update?userId=${selectedUser.userId}`,
            {
              method: 'PUT',
              body: JSON.stringify({
                userId: selectedUser.userId,
                name: formData.name,
                email: formData.email,
                password: formData.password
              })
            }
          );
          
          if (response) {
            await fetchUsers(); // Refresh the list only after successful update
            setOpenDialog(false);
            setSelectedUser(null);
            setFormData({ name: '', email: '', password: '' });
          }
        } else {
          // For new user creation
          await makeAuthorizedRequest('http://localhost:8080/user/save', {
            method: 'POST',
            body: JSON.stringify(formData)
          });
          await fetchUsers();
          setOpenDialog(false);
        }
      } catch (err) {
        console.error('Error updating/creating user:', err);
        setError(`Could not ${selectedUser ? 'update' : 'create'} user. Please try again later.`);
      }
    };
  
    return (
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4">User Management</Typography>
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
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : (
            <List>
              {users.map((user) => (
                <ListItem key={user.userId}>
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <>
                        <Typography component="span" display="block">
                          Email: {user.email}
                        </Typography>
                        <Typography component="span" display="block">
                          Password: {user.password}
                        </Typography>
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
  
        {/* User Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>
            {selectedUser ? "Update User" : "Add New User"}
          </DialogTitle>
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
              {selectedUser ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
  
        {/* Confirmation Dialog */}
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => {
            setConfirmDialog({ open: false, type: "", user: null });
            setPendingUpdateData(null); // Reset pending data on cancel
          }}
          onConfirm={handleConfirmAction}
          title={
            confirmDialog.type === "delete" ? "Confirm Delete" : "Confirm Update"
          }
          message={
            confirmDialog.type === "delete"
              ? "Are you sure you want to delete this user? This action cannot be undone."
              : "Are you sure you want to apply the changes to this user?"
          }
        />
      </Container>
    );
  }