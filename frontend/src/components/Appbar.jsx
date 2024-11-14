import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

const CustomAppBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in and get the user name
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setIsLoggedIn(true);
      setUserName(currentUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#F8F5F2', boxShadow: 'none', fontFamily: 'Product Sans' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 80px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '24px', color: '#292929', fontFamily: 'Product Sans', textTransform: 'none' }}>
            CAMPUS<span style={{ color: '#C21807' }}>XPERIENCE</span>
          </Typography>
          <Box sx={{ display: 'flex', gap: '40px', fontFamily: 'Product Sans' }}>
            <Button
              sx={{
                color: '#C21807',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Product Sans',
                textTransform: 'none', // Disable all caps
              }}
            >
              Event Discovery
            </Button>
            <Button
              sx={{
                color: '#C21807',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Product Sans',
                textTransform: 'none', // Disable all caps
              }}
            >
              Reservation and Ticketing
            </Button>
            <Button
              sx={{
                color: '#C21807',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Product Sans',
                textTransform: 'none', // Disable all caps
              }}
            >
              Event Reminder
            </Button>
            <Button
              sx={{
                color: '#C21807',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Product Sans',
                textTransform: 'none', // Disable all caps
              }}
            >
              About Us
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: '20px', fontFamily: 'Product Sans', alignItems: 'center' }}>
          {isLoggedIn ? (
            <>
              <Typography variant="body1" sx={{ color: '#C21807', fontWeight: 'bold' }}>
                Hello, {userName} !
              </Typography>
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  color: '#C21807',
                  borderColor: '#C21807',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  fontFamily: 'Product Sans',
                  textTransform: 'none',
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
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
                onClick={handleSignIn}
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#C21807',
                  color: '#F8F5F2',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  fontFamily: 'Product Sans',
                  textTransform: 'none',
                }}
                onClick={handleSignUp}
              >
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
