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
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    attendees: 0,
  });

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
    try {
      const response = await fetch(`${baseUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token for saving
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) throw new Error('Failed to save event');
      const savedEvent = await response.json();
      setEvents([...events, savedEvent]);
      setOpen(false); // Close the modal
      setNewEvent({ title: '', date: '', time: '', location: '', category: '', description: '', attendees: 0 });
    } catch (err) {
      setError('Error saving event');
    }
  };

  const handleEdit = (id) => {
    // Logic to handle editing the event
    console.log('Edit event with ID:', id);
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
    <div style={{
      padding: '40px',
      backgroundColor: '#F8F5F2',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', color: '#C21807' }}>Event Dashboard</h1>

      {error && <Typography color="error" align="center">{error}</Typography>}

      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          padding: '20px'
        }}>
          {events.map((event) => (
            <EventCard 
              key={event.eventId} 
              id={event.eventId}
              title={event.title}
              date={new Date(event.startTime).toLocaleDateString()}
              time={new Date(event.startTime).toLocaleTimeString()}
              location={event.location}
              category={event.category || 'General'}
              attendees={event.attendees || 0}
              description={event.description}
              image={event.image || '/api/placeholder/400/320'}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Create Event Button */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpen(true)} 
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}
      >
        Create Event
      </Button>

      {/* Create Event Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            style={{ marginBottom: 16 }}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            style={{ marginBottom: 16 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Time"
            type="time"
            fullWidth
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
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
            label="Category"
            fullWidth
            value={newEvent.category}
            onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleSaveEvent} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventDashboard;
