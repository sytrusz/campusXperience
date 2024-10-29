import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
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
    const [userType, setUserType] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const [usersResponse, adminsResponse] = await Promise.all([
                fetch("http://localhost:8080/user/getAll"),
                fetch("http://localhost:8080/admin/getAll")
            ]);

            const users = await usersResponse.json();
            const admins = await adminsResponse.json();

            // Check admin credentials first
            const adminMatch = admins.find(admin => 
                admin.email === email && admin.password === password
            );

            // If admin found, log them in and redirect
            if (adminMatch) {
                console.log("Successfully signed in as admin", adminMatch);
                localStorage.setItem('currentUser', JSON.stringify({
                    ...adminMatch,
                    userType: 'ADMIN'
                }));
                setName(adminMatch.name);
                setUserType('ADMIN');
                setGreat(true);
                // Redirect to admin dashboard
                navigate('/admin-dashboard');
                return;
            }

            // Check regular users
            const userMatch = users.find(user => 
                user.email === email && user.password === password
            );

            if (userMatch) {
                console.log("Successfully signed in as user", userMatch);
                localStorage.setItem('currentUser', JSON.stringify({
                    ...userMatch,
                    userType: 'USER'
                }));
                setName(userMatch.name);
                setUserType('USER');
                setGreat(true);
                // Optional: redirect regular users to their dashboard
                navigate('/user-dashboard');
                return;
            }

            setError('Invalid email or password');

        } catch (err) {
            console.error("Error signing in:", err);
            setError('Something went wrong. Please try again.');
        }
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
                </Box>
            </Paper>
        </Container>
    );
}