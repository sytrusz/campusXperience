import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 64px)', // Adjust based on your AppBar height
      textAlign: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <h1 style={{ 
        fontSize: '4rem', 
        color: '#dc2626', 
        marginBottom: '1rem' 
      }}>
        404
      </h1>
      <p style={{ 
        fontSize: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        Page Not Found
      </p>
      <p style={{ 
        marginBottom: '2rem', 
        maxWidth: '500px', 
        padding: '0 20px' 
      }}>
        Sorry, the page you are looking for does not exist or you do not have permission to access it.
      </p>
      <Link 
        to="/" 
        style={{
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: '5px'
        }}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;