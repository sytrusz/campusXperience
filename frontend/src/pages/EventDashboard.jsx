import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { CircularProgress, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for creating a new event
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    location: '',
    maxCapacity: 0,
    image: null,
  });

  const [editEventId, setEditEventId] = useState(null); // State for tracking the event being edited

  const baseUrl = 'http://localhost:8080/event';  // Replace with your actual base URL
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${baseUrl}/getAll`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [baseUrl, token]);

  const handleSaveEvent = async () => {
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('description', newEvent.description);
    formData.append('startTime', newEvent.startTime);
    formData.append('endTime', newEvent.endTime);
    formData.append('location', newEvent.location);
    formData.append('maxCapacity', newEvent.maxCapacity);

    // Append the image if it's selected
    if (newEvent.image) {
      formData.append('file', newEvent.image);
    }

    try {
      const response = await fetch(`${baseUrl}/save`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to save event');
      const savedEvent = await response.json();
      setEvents([...events, savedEvent]);
      setOpen(false); // Close the modal
      setNewEvent({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        location: '',
        maxCapacity: 0,
        image: null,
      });
    } catch (err) {
      setError('Error saving event');
    }
  };

  const handleEdit = (event) => {
    setEditEventId(event.eventId); // Set the event ID for the event being edited
    setNewEvent({
      title: event.title,
      description: event.description,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      maxCapacity: event.maxCapacity,
      image: event.image, // Keep the existing image if available
    });
    setOpen(true); // Open the dialog
  };

  const handleUpdateEvent = async () => {
    try {
      const response = await fetch(`${baseUrl}/update?eventId=${editEventId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token for updating
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) throw new Error('Failed to update event');
      const updatedEvent = await response.json();
      setEvents(events.map(event => (event.eventId === editEventId ? updatedEvent : event)));
      setEditEventId(null);
      setNewEvent({ title: '', description: '', startTime: '', endTime: '', location: '', maxCapacity: '' });
      setOpen(false); // Close the modal after update
    } catch (err) {
      setError('Error updating event');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseUrl}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete event');
      setEvents(events.filter(event => event.eventId !== id));
      alert('Event deleted successfully');
    } catch (err) {
      setError('Error deleting event');
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#F8F5F2', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#C21807' }}>Event Dashboard</h1>

      {error && <Typography color="error" align="center">{error}</Typography>}

      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', padding: '20px' }}>
          {events.map((event) => (
            <EventCard 
              key={event.eventId} 
              id={event.eventId}
              title={event.title}
              date={new Date(event.startTime).toLocaleDateString()}
              time={new Date(event.startTime).toLocaleTimeString()}
              location={event.location}
              category={event.category || 'General'}
              attendees={event.maxCapacity || 0}
              description={event.description}
              image={event.imageUrl ? `/uploads/${event.imageUrl}` : '/path/to/placeholder.jpg'}
              onEdit={() => handleEdit(event)}  // Pass the event to the handleEdit function
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create or Edit Event Dialog */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpen(true)} 
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
      >
        Create Event
      </Button>

      {/* Create/Edit Event Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editEventId ? 'Edit Event' : 'Create New Event'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Description"
            multiline
            fullWidth
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            fullWidth
            value={newEvent.startTime}
            onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
            style={{ marginBottom: 16 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Time"
            type="datetime-local"
            fullWidth
            value={newEvent.endTime}
            onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
            style={{ marginBottom: 16 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Location"
            fullWidth
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Max Capacity"
            type="number"
            fullWidth
            value={newEvent.maxCapacity}
            onChange={(e) => setNewEvent({ ...newEvent, maxCapacity: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <input
            type="file"
            onChange={(e) => setNewEvent({ ...newEvent, image: e.target.files[0] })}
            style={{ marginBottom: 16 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={editEventId ? handleUpdateEvent : handleSaveEvent} color="primary">
            {editEventId ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventDashboard;
