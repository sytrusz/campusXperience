import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, CircularProgress, List, ListItem, ListItemText, Divider, Button, TextField } from '@mui/material';

export default function ReminderList() {
    const paperStyle = { padding: '20px', margin: '20px auto', maxWidth: 800 };
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [reminderForm, setReminderForm] = useState({
        event: { eventId: '' },
        user: { userId: '' },
        reminderTime: '',
        reminderType: ''
    });

    const baseUrl = 'http://localhost:8080/reminder';

    // Fetch all reminders
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const response = await fetch(`${baseUrl}/getAll`);
                if (!response.ok) throw new Error('Failed to fetch reminders');
                const data = await response.json();
                setReminders(data);
            } catch (err) {
                setError('Error fetching reminders');
            } finally {
                setLoading(false);
            }
        };

        fetchReminders();
    }, []);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'eventId' || name === 'userId') {
            setReminderForm((prev) => ({
                ...prev,
                [name === 'eventId' ? 'event' : 'user']: { ...prev[name === 'eventId' ? 'event' : 'user'], [name]: value }
            }));
        } else {
            setReminderForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Create or update reminder
    const handleSaveReminder = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `${baseUrl}/update?reminderId=${isEditing}` : `${baseUrl}/save`;
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reminderForm),
            });
            if (!response.ok) throw new Error('Failed to save reminder');

            const updatedReminder = await response.json();
            setReminders((prev) =>
                isEditing
                    ? prev.map((reminder) =>
                        reminder.reminderId === isEditing ? updatedReminder : reminder
                    )
                    : [...prev, updatedReminder]
            );
            setIsEditing(null);
            setReminderForm({ event: { eventId: '' }, user: { userId: '' }, reminderTime: '', reminderType: '' });
        } catch (err) {
            setError('Error saving reminder');
        }
    };

    // Edit reminder
    const handleEditReminder = (reminder) => {
        setIsEditing(reminder.reminderId);
        setReminderForm({
            event: { eventId: reminder.event?.eventId || '' },
            user: { userId: reminder.user?.userId || '' },
            reminderTime: reminder.reminderTime,
            reminderType: reminder.reminderType,
        });
    };

    // Delete reminder
    const handleDeleteReminder = async (reminderId) => {
        try {
            const response = await fetch(`${baseUrl}/delete/${reminderId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete reminder');
            setReminders((prev) => prev.filter((reminder) => reminder.reminderId !== reminderId));
        } catch (err) {
            setError('Error deleting reminder');
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <Typography variant="h4" align="center" gutterBottom>
                    Reminders
                </Typography>

                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSaveReminder} style={{ marginBottom: '20px' }}>
                    <TextField
                        label="Event ID"
                        name="eventId"
                        variant="outlined"
                        fullWidth
                        value={reminderForm.event.eventId}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="User ID"
                        name="userId"
                        variant="outlined"
                        fullWidth
                        value={reminderForm.user.userId}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label=""
                        name="reminderTime"
                        variant="outlined"
                        fullWidth
                        value={reminderForm.reminderTime}
                        onChange={handleInputChange}
                        type="datetime-local"
                        required
                    />
                    <TextField
                        label="Reminder Type"
                        name="reminderType"
                        variant="outlined"
                        fullWidth
                        value={reminderForm.reminderType}
                        onChange={handleInputChange}
                        required
                    />
                    {isEditing ? (
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    type="submit" 
                                    sx={{ mt: 2, backgroundColor: "#C21807", color: "#fff", '&:hover': { backgroundColor: "#A61C06" } }}
                                >
                                    Update Reminder
                                </Button>
                            ) : (
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    type="submit" 
                                    sx={{ mt: 2, backgroundColor: "#C21807", color: "#fff", '&:hover': { backgroundColor: "#A61C06" } }}
                                >
                                    Create Reminder
                                </Button>
                            )}

                </form>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <List>
                        {reminders.map((reminder) => (
                            <React.Fragment key={reminder.reminderId}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Reminder Type: ${reminder.reminderType}`}
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="textSecondary">
                                                    {`Event ID: ${reminder.event?.eventId || 'N/A'}`}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {`User ID: ${reminder.user?.userId || 'N/A'}`}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {`Reminder Time: ${new Date(reminder.reminderTime).toLocaleString()}`}
                                                </Typography>
                                            </>
                                        }
                                    />
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleEditReminder(reminder)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDeleteReminder(reminder.reminderId)}
                                        sx={{ ml: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </ListItem>
                                <Divider component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
}