import * as React from "react";
import { useState, useEffect } from "react";
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
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
const token = localStorage.getItem("jwtToken");
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

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {};
};

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    maxCapacity: "",
    startTime: "",
    endTime: "",
    image: null,
  });

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: "",
    event: null,
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
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventData = await makeAuthorizedRequest(
        "http://localhost:8080/event/getAll"
      );
      setEvents(eventData);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Could not fetch events. Please try again later.");
    }
  };

  const handleCreate = () => {
    setSelectedEvent(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      maxCapacity: "",
      startTime: "",
      endTime: "",
      image: null,
    });
    setOpenDialog(true);
  };

  const handleUpdate = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      location: event.location,
      maxCapacity: event.maxCapacity,
      startTime: event.startTime,
      endTime: event.endTime,
      image: null,
    });
    setOpenDialog(true);
  };

  const handleDelete = (eventId) => {
    setConfirmDialog({
      open: true,
      type: "delete",
      event: { eventId },
    });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedEvent(null);
    setFormData({
      title: "",
      description: "",
      location: "",
      maxCapacity: "",
      startTime: "",
      endTime: "",
      image: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, 
    });
  };
  const handleSaveEvent = async () => {
    const freshToken = localStorage.getItem("jwtToken")
    const url = selectedEvent
      ? `http://localhost:8080/event/update?eventId=${selectedEvent.eventId}` 
      : "http://localhost:8080/event/save";
  
    try {
      console.log(freshToken)
      const formDataToSend = new FormData();
  
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("maxCapacity", formData.maxCapacity);
      formDataToSend.append("startTime", formData.startTime);
      formDataToSend.append("endTime", formData.endTime);
  
      if (formData.image) {
        formDataToSend.append("file", formData.image);
      }
      await fetch(url, {
        method: selectedEvent ? "PUT" : "POST",
        body: formDataToSend,
        headers: {
          'Authorization': `Bearer ${freshToken}`,
        },
      });
  
      fetchEvents(); // Refresh event list
      handleDialogClose();
    } catch (err) {
      console.error("Error saving event:", err);
      setError("Could not save the event. Please try again later.");
    }
  };
  const handleConfirmAction = async () => {
    const { type, event } = confirmDialog;

    try {
      if (type === "delete") {
        await makeAuthorizedRequest(
          `http://localhost:8080/event/delete/${event.eventId}`,
          {
            method: "DELETE",
          }
        );
      }
      fetchEvents();
    } catch (err) {
      console.error(`Error during ${type}:`, err);
      setError(`Could not ${type} event. Please try again later.`);
    }

    setConfirmDialog({ open: false, type: "", event: null });
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Event Management</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreate}
            startIcon={<EventIcon />}
          >
            Add Event
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
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Start Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>End Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.eventId}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.startTime}</TableCell>
                    <TableCell>{event.endTime}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(event)}
                        style={{ marginRight: "8px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(event.eventId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {selectedEvent ? "Update Event" : "Add New Event"}
        </DialogTitle>
        <DialogContent>
  <TextField
    autoFocus
    margin="dense"
    name="title"
    label="Title"
    type="text"
    fullWidth
    value={formData.title}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="description"
    label="Description"
    type="text"
    fullWidth
    value={formData.description}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="location"
    label="Location"
    type="text"
    fullWidth
    value={formData.location}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="maxCapacity"
    label="Max Capacity"
    type="number"
    fullWidth
    value={formData.maxCapacity}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="startTime"
    label="Start Time"
    type="datetime-local"
    fullWidth
    value={formData.startTime}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="endTime"
    label="End Time"
    type="datetime-local"
    fullWidth
    value={formData.endTime}
    onChange={handleInputChange}
  />
  <TextField
    margin="dense"
    name="image"
    type="file"
    fullWidth
    onChange={handleInputChange} // Handles file input
  />
</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveEvent} color="primary">
            {selectedEvent ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, type: "", event: null })}
        onConfirm={handleConfirmAction}
        title="Confirm Action"
        message="Are you sure you want to delete this event?"
      />
    </Container>
  );
}
