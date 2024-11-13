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
        marginTop: '20px',
        fontFamily: 'Product Sans'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo without a link */}
        <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '24px', fontFamily: 'Product Sans', color: '#292929' }}>
            Campus
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '24px', fontFamily: 'Product Sans', color: '#C21807' }}>
            Xperience
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: '20px', padding: '60px 0px' }}>
          <Button sx={{ color: '#C21807', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Product Sans' }}>
            EVENT DISCOVERY
          </Button>
          <Button sx={{ color: '#C21807', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Product Sans' }}>
            RSVP & TICKETING
          </Button>
          <Button sx={{ color: '#C21807', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Product Sans' }}>
            EVENT REMINDER
          </Button>
        </Box>

  
        <Box sx={{ display: 'flex', gap: '20px', paddingRight: '60px' }}>
          <Button 
            sx={{ color: '#C21807', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Product Sans' }} 
            onClick={handleSignIn} 
          >
            LOGIN
          </Button>
          <Button sx={{ color: '#C21807', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Product Sans' }}
          onClick={handleSignUp}>
            SIGNUP
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
