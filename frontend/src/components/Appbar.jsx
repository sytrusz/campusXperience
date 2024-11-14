import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

const CustomAppBar = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#F8F5F2',
        boxShadow: 'none',
        fontFamily: 'Product Sans',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 80px',
        }}
      >
        {/* Logo and navigation links in a single row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          {/* Combined Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '24px',
              color: '#292929',
              fontFamily: 'Product Sans',
              textTransform: 'none', // Disable all caps
            }}
          >
            CAMPUS
            <span style={{ color: '#C21807' }}>XPERIENCE</span>
          </Typography>

          {/* Navigation Links */}
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

        {/* Login and Signup Buttons */}
        <Box sx={{ display: 'flex', gap: '20px', fontFamily: 'Product Sans' }}>
          <Button
            variant="outlined"
            sx={{
              color: '#C21807',
              borderColor: '#C21807',
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: 'Product Sans',
              textTransform: 'none', // Disable all caps
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
              textTransform: 'none', // Disable all caps
            }}
            onClick={handleSignUp}
          >
            Signup
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
