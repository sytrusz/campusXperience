import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const makeAuthorizedRequest = async (url, options = {}) => {
  const token = localStorage.getItem("adminToken");
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

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {};
};

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
    type: "",
    user: null,
  });
  const [passwordVisibility, setPasswordVisibility] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await makeAuthorizedRequest(
        "http://localhost:8080/user/getAll"
      );
      setUsers(usersData);
      setPasswordVisibility(
        usersData.reduce((acc, user) => ({ ...acc, [user.userId]: false }), {})
      );
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Could not fetch users. Please try again later.");
    }
  };

  const handleTogglePassword = (userId) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
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
      if (type === "delete") {
        await makeAuthorizedRequest(
          `http://localhost:8080/user/delete/${user.userId}`,
          {
            method: "DELETE",
          }
        );
      }
      fetchUsers();
    } catch (err) {
      console.error(`Error during ${type}:`, err);
      setError(`Could not ${type} user. Please try again later.`);
    }

    setConfirmDialog({ open: false, type: "", user: null });
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
        await makeAuthorizedRequest(
          `http://localhost:8080/user/update?userId=${selectedUser.userId}`,
          {
            method: "PUT",
            body: JSON.stringify({
              userId: selectedUser.userId,
              name: formData.name,
              email: formData.email,
              password: formData.password,
            }),
          }
        );
      } else {
        await makeAuthorizedRequest("http://localhost:8080/user/save", {
          method: "POST",
          body: JSON.stringify(formData),
        });
      }
      fetchUsers();
      handleDialogClose();
    } catch (err) {
      console.error("Error updating/creating user:", err);
      setError(
        `Could not ${selectedUser ? "update" : "create"} user. Please try again later.`
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: "20px", margin: "20px 0" }}>
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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>EMAIL</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>PASSWORD</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {passwordVisibility[user.userId]
                        ? user.password
                        : "•".repeat(8)}
                      <IconButton
                        onClick={() => handleTogglePassword(user.userId)}
                      >
                        {passwordVisibility[user.userId] ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdate(user)}
                        >
                          EDIT
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(user.userId)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
        onClose={() => setConfirmDialog({ open: false, type: "", user: null })}
        onConfirm={handleConfirmAction}
        title="Confirm Action"
        message="Are you sure you want to delete this user?"
      />
    </Container>
  );
}
