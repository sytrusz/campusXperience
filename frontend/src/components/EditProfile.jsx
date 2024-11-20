import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    file: null // For profile picture upload
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [imgSrc, setImgSrc] = useState('');


  // Load current user details from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    setFormData(prev => ({
      ...prev,
      name: currentUser.name || '',
      email: currentUser.email || ''
    }));
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.currentPassword) {
      setError('Current password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser?.id || isNaN(currentUser.id)) {
        throw new Error('Invalid user ID');
      }
  
      const formDataPayload = new FormData();
      formDataPayload.append('userId', currentUser.id);
      formDataPayload.append('name', formData.name);
      formDataPayload.append('email', formData.email);
      formDataPayload.append('currentPassword', formData.currentPassword);
      if (formData.newPassword) {
        formDataPayload.append('newPassword', formData.newPassword);
      }
      if (formData.file) {
        formDataPayload.append('file', formData.file);
      }
  
      const response = await fetch(`http://localhost:8080/user/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: formDataPayload
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }
  
      const updatedUser = await response.json();
  
      // 1. Update localStorage with the new user data including the profile picture
      localStorage.setItem('currentUser', JSON.stringify({
        ...currentUser,
        name: updatedUser.name,
        email: updatedUser.email,
        prof_pic: updatedUser.prof_pic // Update profile picture if returned
      }));
  
      setImgSrc(updatedUser.prof_pic); // Update profile image in the state
  
      setSuccess('Profile updated successfully!');
  
      // Clear sensitive form fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        file: null
      }));
    } catch (error) {
      if (error.message.includes('401')) {
        setError('Current password is incorrect or session expired');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('jwtToken');
        window.location.href = '/login';
      } else {
        setError(error.message || 'Failed to update profile');
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      file
    }));
    setError('');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Profile
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Current Password"
              name="currentPassword"
              type={showPasswords ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPasswords(!showPasswords)}
                      edge="end"
                    >
                      {showPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              name="newPassword"
              type={showPasswords ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              disabled={isLoading}
              helperText="Leave blank to keep current password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPasswords(!showPasswords)}
                      edge="end"
                    >
                      {showPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              type="file"
              onChange={handleFileChange}
              disabled={isLoading}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              sx={{ mt: 3 }}
            >
              {isLoading ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditProfile;
