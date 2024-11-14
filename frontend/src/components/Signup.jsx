import * as React from 'react';
import { useState } from 'react';
import {
    Box,
    TextField,
    Container,
    Button,
    Typography,
    Grid,
    Paper,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const paperStyle = { padding: '10px 20px', width: 600, margin: '20px auto' };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [added, setAdded] = useState(false);
    const [validationError, setValidationError] = useState('');
    
    const handleClick = async (e) => {
        e.preventDefault();
    
        // Name validation: no numbers, capitalize each word
        const nameRegex = /^[A-Za-z\s]+$/;
        const capitalizeName = name.replace(/\b\w/g, (char) => char.toUpperCase());
        if (!nameRegex.test(name)) {
            setValidationError('Name must only contain letters and spaces.');
            setAdded(false);
            return;
        }
        setName(capitalizeName);
    
        // Email validation: must contain @____.com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Email must be in a valid format and contain @____.com.');
            setAdded(false);
            return;
        }
    
        // Password validation: at least 8 characters with letters and numbers
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setValidationError('Password must be at least 8 characters with a combination of letters and numbers.');
            setAdded(false);
            return;
        }
    
        setValidationError('');
    
        // Check if email is UNIQUE
        try {
            const response = await fetch(`http://localhost:8080/user/check-email?email=${encodeURIComponent(email)}`);
            const isEmailUnique = await response.json();
    
            if (!isEmailUnique) {
                setValidationError('Email already exists. Please use a different email.');
                setAdded(false);
                return;
            }
        } catch (error) {
            console.error("Error checking email uniqueness:", error);
            setValidationError('An error occurred while verifying email uniqueness.');
            setAdded(false);
            return;
        }
    
        // If all validations pass, proceed to SAVE the user
        const student = { name: capitalizeName, email, password };
        fetch("http://localhost:8080/user/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        })
        .then(() => {
            console.log("New student added");
            setAdded(true);
        });
    };
            
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            {/* Left Side - Hero Image */}
            <Grid
                item
                xs={false}
                sm={4}
                md={8}
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
                    },
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
                    <Typography component="h1" variant="h3" color="white" gutterBottom>
                        Join Us at Campus
                        <Box component="span" sx={{ color: 'error.main' }}>Xperience</Box>
                    </Typography>
                    <Typography variant="h6" color="white" paragraph>
                        Sign up to connect and explore campus events!
                    </Typography>
                </Box>
            </Grid>

            {/* Right Side - Signup Form */}
            <Grid item xs={12} md={4} component={Paper} elevation={6} square>
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
                        Create an Account
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleClick} sx={{ mt: 1, width: '100%', maxWidth: 400 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Student Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPass(e.target.value)}
                        />
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
                            Sign Up
                        </Button>
                        {validationError && (
                        <Alert severity="error" style={{ marginTop: '10px' }}>
                            {validationError}
                        </Alert> 
                        )}
                        {added && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                New student added successfully!
                            </Alert>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}
