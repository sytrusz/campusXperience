import React, { useState, useEffect } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    file: null, // For profile picture upload
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState('/api/placeholder/100/100');

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
    setImgSrc(currentUser.prof_pic || '/api/placeholder/100/100'); // Set the profile image if available
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <div style={styles.profileContainer}>
      <h1 style={styles.title}>Profile</h1>

      <div style={styles.profileContent}>
        <div style={styles.profileForm}>
          {error && <div style={styles.errorMessage}>{error}</div>}
          {success && <div style={styles.successMessage}>{success}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  ...styles.input,
                  cursor: isLoading ? 'not-allowed' : 'default'
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  ...styles.input,
                  cursor: isLoading ? 'not-allowed' : 'default'
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  ...styles.input,
                  cursor: isLoading ? 'not-allowed' : 'default'
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                disabled={isLoading}
                style={{
                  ...styles.input,
                  cursor: isLoading ? 'not-allowed' : 'default'
                }}
              />
            </div>

            <button
              type="submit"
              style={isLoading ? { ...styles.saveBtn, ...styles.loading } : styles.saveBtn}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>

        <div style={styles.profileImage}>
          <div style={styles.imageContainer}>
            <img 
              src={imgSrc} 
              alt="Profile" 
              style={styles.profileImageStyle} 
            />
            <label style={styles.editButton} htmlFor="profile-upload">✏️</label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles omitted for brevity, keep your existing styles here
// Updated style objects with improved spacing and layout
const styles = {
  profileContainer: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '0 30px',
    fontFamily: 'Product Sans',
  },
  title: {
    color: 'rgb(153, 27, 27)',
    marginBottom: '40px',
    fontSize: '32px',
  },
  profileContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px',
    backgroundColor: 'rgb(185, 28, 28)',
    borderRadius: '12px',
    padding: '40px',
  },
  profileForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  label: {
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
  },
  input: {
    padding: '14px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '15px',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
  saveBtn: {
    backgroundColor: 'white',
    border: 'none',
    padding: '16px',
    borderRadius: '6px',
    color: 'rgb(185, 28, 28)',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'all 0.2s ease',
  },
  loading: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  profileImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '20px',
  },
  imageContainer: {
    position: 'relative',
    width: '220px',
    height: '220px',
  },
  profileImageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '4px solid white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    objectFit: 'cover',
  },
  editButton: {
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease',
  },
  fileInput: {
    display: 'none',
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    padding: '16px',
    borderRadius: '6px',
    fontSize: '15px',
  },
  successMessage: {
    backgroundColor: '#dcfce7',
    color: '#166534',
    padding: '16px',
    borderRadius: '6px',
    fontSize: '15px',
  },
};
export default EditProfile;
