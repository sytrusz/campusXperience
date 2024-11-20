import * as React from "react";
import { useState, useEffect } from "react";
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

  
export default function AdminManagement() {
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  
    const [confirmDialog, setConfirmDialog] = useState({
      open: false,
      type: "", // 'update' or 'delete'
      admin: null, // Target admin
    });
    const [pendingUpdateData, setPendingUpdateData] = useState(null);
  
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
  
    useEffect(() => {
      fetchAdmins();
    }, []);
  
    const fetchAdmins = async () => {
      try {
        const adminsData = await makeAuthorizedRequest(
          "http://localhost:8080/admin/getAll"
        );
        setAdmins(adminsData);
      } catch (err) {
        console.error("Error fetching admins:", err);
        setError("Could not fetch admins. Please try again later.");
      }
    };
  
    const handleCreate = () => {
      setSelectedAdmin(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Admin",
      });
      setOpenDialog(true);
    };
  
    const handleUpdate = (admin) => {
      setSelectedAdmin(admin);
      setFormData({
        name: admin.name,
        email: admin.email,
        password: admin.password,
        role: admin.role,
      });
      setOpenDialog(true);
    };
  
    const handleDelete = (adminId) => {
      setConfirmDialog({
        open: true,
        type: "delete",
        admin: { adminId },
      });
    };
  
    const handleDialogClose = () => {
      setOpenDialog(false);
      setSelectedAdmin(null);
      setFormData({ name: "", email: "", password: "", role: "" });
    };
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async () => {
      if (selectedAdmin) {
        // Update admin
        setPendingUpdateData({
          adminId: selectedAdmin.adminId,
          data: formData,
        });
        setOpenDialog(false);
        setConfirmDialog({
          open: true,
          type: "update",
          admin: selectedAdmin,
        });
      } else {
        // Create new admin
        try {
          await makeAuthorizedRequest("http://localhost:8080/admin/save", {
            method: "POST",
            body: JSON.stringify(formData),
          });
          fetchAdmins(); // Refresh admins list
        } catch (err) {
          console.error("Error creating admin:", err);
          setError("Could not create admin. Please try again later.");
        }
        setOpenDialog(false); // Close the dialog after creation
      }
    };
  
    const handleConfirmAction = async () => {
      const { type, admin } = confirmDialog;
  
      try {
        if (type === "update") {
          const url = `http://localhost:8080/admin/update?adminId=${pendingUpdateData.adminId}`;
          await makeAuthorizedRequest(url, {
            method: "PUT",
            body: JSON.stringify(pendingUpdateData.data),
          });
        } else if (type === "delete") {
          await makeAuthorizedRequest(
            `http://localhost:8080/admin/delete/${admin.adminId}`,
            {
              method: "DELETE",
            }
          );
        }
        fetchAdmins(); // Refresh list
      } catch (err) {
        console.error(`Error during ${type}:`, err);
        setError(`Could not ${type} admin. Please try again later.`);
      }
  
      setConfirmDialog({ open: false, type: "", admin: null });
      setPendingUpdateData(null); // Reset pending data
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
            <Typography variant="h4">Admin Management</Typography>
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
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : (
            <List>
              {admins.map((admin) => (
                <ListItem key={admin.adminId}>
                  <ListItemText
                    primary={admin.name}
                    secondary={
                      <>
                        <Typography component="span" display="block">
                          Email: {admin.email}
                        </Typography>
                        <Typography component="span" display="block">
                          Password: {admin.password}
                        </Typography>
                        <Typography component="span" display="block">
                          Role: {admin.role}
                        </Typography>
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
          <DialogTitle>
            {selectedAdmin ? "Update Admin" : "Add New Admin"}
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
              {selectedAdmin ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
  
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: "", admin: null })}
          onConfirm={handleConfirmAction}
          title={
            confirmDialog.type === "delete" ? "Confirm Delete" : "Confirm Update"
          }
          message={
            confirmDialog.type === "delete"
              ? "Are you sure you want to delete this admin? This action cannot be undone."
              : "Are you sure you want to apply the changes to this admin?"
          }
        />
      </Container>
    );
  }