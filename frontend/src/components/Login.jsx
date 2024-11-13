import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Typography } from '@mui/material';

export default function Login() {
    const paperStyle = { padding: '10px 20px', width: 600, margin: '20px auto' };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [great, setGreat] = useState(false);
    
    const navigate = useNavigate(); // Initialize navigate

    const handleSignIn = (e) => {
        e.preventDefault();
        setError('');
    

        fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }
            return response.text(); 
        })
        .then(token => {
            localStorage.setItem('token', token);
            console.log("JWT Token:", token);
            setGreat(true);
            setName(email); 
            navigate('/events'); 
        })
        .catch(err => {
            console.error("Error signing in:", err);
            setError('Invalid email or password');
        });
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h2 style={{ textAlign: 'center', paddingTop: '0px' }}>Sign In</h2>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1 } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField 
                        id="email" 
                        label="Email Address" 
                        variant="outlined" 
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField 
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <Typography color="error" align="center">
                            {error}
                        </Typography>
                    )}
                    <Button 
                        variant="contained" 
                        fullWidth 
                        onClick={handleSignIn}
                        sx={{ mt: 2 }}
                    >
                        Sign In
                    </Button>

                    {great && <p>Hi {name}</p>}
                </Box>
            </Paper>
        </Container>
    );
}
