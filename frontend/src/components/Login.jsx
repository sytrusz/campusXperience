import * as React from 'react';
import { useState } from 'react';

import '../fonts.css';
import { 
    Box, 
    TextField, 
    Container, 
    Button, 
    Typography,
    Grid,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const paperStyle = { padding: '10px 20px', width: 600, margin: '20px auto' };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [great, setGreat] = useState(false);
    
    const navigate = useNavigate();


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
            // Store JWT in localStorage
            localStorage.setItem('token', token);
            console.log("JWT Token:", token);
            setGreat(true);
            setName(email); 
            navigate('/events'); // Redirect to Events page after successful login
        })
        .catch(err => {
            console.error("Error signing in:", err);
            setError('Invalid email or password');
        });

    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            {/* Left Side - Hero Image */}
            <Grid
                item
                xs={false}
                sm={4}
                md={8} // Increased from 7 to 8 for more width
                sx={{
                    position: 'relative',
                    display: { xs: 'none', md: 'block' },
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'url(https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/462729494_1003459358490572_2229268457718676568_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGipHJDPc817tZpMqMgy08ksqj3_Ohv_pKyqPf86G_-kokIc-dQxWOVv98coqysQb_wrZ3XCiPb4uJE8kkheZtd&_nc_ohc=cCoWt6papq0Q7kNvgFIUjDh&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AjDZLR3GttzC5cNZQ5NjeZn&oh=00_AYD_iriFhPT-3b0DyFNqjW6Y2kM3_xACIrTEQkAM-lSffA&oe=672E6C61)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '150%',
                        backgroundPosition: 'center',
                        filter: 'blur(2px)',
                        zIndex: 0,
                    }
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        height: '100%',
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 4,
                        fontFamily: 'Product Sans',
                    }}
                >
                    <Typography component="h1" variant="h3" color="white"gutterBottom>
                        Hello Friend
                        To keep connected with us provide us with your information
                    </Typography>
                    <Typography variant="h6" color="white" paragraph>
                        To keep connected with us provide us with your information
                    </Typography>
                    <Button
                        variant="outlined"
                        sx={{
                            color: 'white',
                            backgroundColor: '#850f24',
                            width: 200,
                            '&:hover': {
                                borderColor: 'white',
                                backgroundColor: '#DC0000',
                            },
                        }}
                    >
                        Sign up
                    </Button>
                </Box>
            </Grid>

            {/* Right Side - Login Form */}
            <Grid item xs={12} md={4} component={Paper} elevation={6} square> {/* Decreased from 5 to 4 */}
                <Box
                    sx={{
                        my: 4,
                        mx: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                        Sign in to Campus<Box component="span" sx={{ color: 'error.main' }}>Xperience</Box>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSignIn} sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" align="center" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ 
                                mt: 3, 
                                mb: 2,
                                bgcolor: 'error.main',
                                '&:hover': {
                                    bgcolor: 'error.dark',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                        {great && (
                            <Typography align="center" sx={{ mt: 2 }}>
                                Hi {name}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
