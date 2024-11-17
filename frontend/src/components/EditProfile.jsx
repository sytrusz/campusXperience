import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [validationError, setValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Get current user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setFormData(prev => ({
      ...prev,
      name: currentUser.name || '',
      email: currentUser.email || ''
    }));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.name)) {
      setValidationError('Name must only contain letters and spaces.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (formData.newPassword) {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!passwordRegex.test(formData.newPassword)) {
        setValidationError('New password must be at least 8 characters with letters and numbers.');
        return;
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        setValidationError('New passwords do not match');
        return;
      }
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = localStorage.getItem('jwtToken');

      if (!token || !currentUser) {
        navigate('/login');
        return;
      }

      const response = await axios.put(
        `http://localhost:8080/user/update?userId=${currentUser.id}`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          newPassword: formData.newPassword || null
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update local storage with new user data
      const updatedUser = {
        ...currentUser,
        name: response.data.name,
        email: response.data.email
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Show success message
      alert('Profile updated successfully!');
      navigate('/profile'); // or wherever you want to redirect after success

    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response?.status === 401) {
        setValidationError('Current password is incorrect or session expired.');
        navigate('/login');
      } else {
        setValidationError(error.response?.data || 'Failed to update profile. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>Edit Profile</Typography>
      <Box component="form" onSubmit={handleSave} noValidate>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          label="Current Password"
          fullWidth
          margin="normal"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          name="newPassword"
          label="New Password"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={formData.newPassword}
          onChange={handleChange}
        />
        <TextField
          name="confirmNewPassword"
          label="Confirm New Password"
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={formData.confirmNewPassword}
          onChange={handleChange}
        />
        
        {validationError && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {validationError}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;