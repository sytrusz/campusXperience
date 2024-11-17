import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';  // Import Link and useNavigate
import ProfileDropdown from './ProfileDropDown';

export default function CustomAppBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  
  const navigate = useNavigate();  // Initialize useNavigate for programmatic navigation

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setIsLoggedIn(true);
      setUserName(currentUser.name);
      setUserType(currentUser.userType);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');  // Use navigate instead of window.location.href
  };
  const handleEventDiscovery = () => {
    navigate('/events');
  };

  const handleNavigate = (path) => {
    navigate(path);  // Use navigate for programmatic navigation
  };

  return (

    <AppBar position="static" sx={{ backgroundColor: '#F8F5F2', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 5,
          py: 3,
        }}
      >
        {/* Logo and Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"

              sx={{
                fontWeight: 'bold',
                fontSize: '24px',
                color: '#292929',
                fontFamily: 'Product Sans',
              }}
            >
              CAMPUS<span style={{ color: '#C21807' }}>XPERIENCE</span>
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {['Event Discovery', 'Reservation and Ticketing', 'Event Reminder', 'About Us'].map(
              (label) => (
                <Button
                  key={label}
                  sx={{
                    color: '#C21807',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    fontFamily: 'Product Sans',
                    textTransform: 'none',
                  }}
                  onClick={() => {
                    if (label === 'Event Discovery') handleNavigate('/events'); 
                    if (label === 'Reservation and Ticketing') handleNavigate('/reservation'); 
                    if (label === 'Event Reminder') handleNavigate('/eventReminder'); 
                    if (label === 'About Us') handleNavigate('/aboutUs'); 
                  }}                    
                >
                  {label}
                </Button>
              )
            )}
          </Box>
        </Box>

        {/* Profile Section */}
        {isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body1"
              sx={{ color: '#C21807', fontWeight: 'bold', fontSize: '16px' }}
            >
              Hello, {userName}!
            </Typography>
            <ProfileDropdown
              userType={userType}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: '#C21807',
                borderColor: '#C21807',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Product Sans',
                textTransform: 'none',
              }}
              onClick={() => handleNavigate('/login')}
            >
              Login
            </Button>
            <Button
              sx={{
                backgroundColor: '#C21807',
                color: '#F8F5F2',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Product Sans',
                textTransform: 'none',
              }}
              onClick={() => handleNavigate('/signup')}  // Navigate to Signup page
            >
              Signup
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
