import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Search, Security, Notifications, CalendarMonth, Group, Star } from '@mui/icons-material';
import HeroSection from '../components/HeroSection';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Homepage() {
    const navigate = useNavigate(); // Create a navigate function

    const features = [
        {
            icon: <Search sx={{ fontSize: 40, color: '#C21807'}} />,
            title: "Smart Event Discovery",
            description: "Find events that match your interests with our intelligent recommendation system"
        },
        {
            icon: <Security sx={{ fontSize: 40, color: '#C21807'}} />,
            title: "Secure RSVPs",
            description: "Manage your attendance with encrypted, fraud-proof registration"
        },
        {
            icon: <Notifications sx={{ fontSize: 40, color: '#C21807'}} />,
            title: "Real-time Updates",
            description: "Never miss an update with instant notifications about your events"
        },
        {
            icon: <CalendarMonth sx={{ fontSize: 40, color: '#C21807'}} />,
            title: "Smart Scheduling",
            description: "Coordinate with ease using our conflict-free scheduling system"
        },
        {
            icon: <Group sx={{ fontSize: 40, color: '#C21807'}} />,
            title: "Community Engagement",
            description: "Connect with like-minded attendees before, during, and after events"
        },
        {
            icon: <Star sx={{ fontSize: 40, color: '#C21807'}} />,
            title: "Exclusive Access",
            description: "Get early bird tickets and special rates for premium events"
        }
    ];

    return (
        <>
        <HeroSection />
            
            {/* Features Section */}
            <Box sx={{ py: 8, px: 4, backgroundColor: 'white' }}>
                <Typography variant="h3" sx={{ mb: 6, textAlign: 'center', color: '#C21807', fontWeight: 'bold' , fontFamily: "'Product Sans', sans-serif" }}>
                    Everything You Need for Successful Events
                </Typography>

                {/* Feature Cards in 3 Rows and 2 Columns */}
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                sx={{
                                    p: 4,
                                    backgroundColor: '#F8F5F2',
                                    borderRadius: 2,
                                    textAlign: 'center',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                    },
                                }}
                            >
                                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#C21807' , fontFamily: "'Product Sans', sans-serif" }}>
                                    {feature.title}
                                </Typography>
                                <Typography color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Call to Action Section */}
            <Box sx={{
                py: 8, 
                backgroundColor: '#FFFFFF', 
                color: 'white', 
                textAlign: 'center',
                fontFamily: "'Product Sans', sans-serif"
            }}>
                <Typography variant="h4" sx={{ mb: 2, color: "black", fontWeight: "bold", fontFamily: "Product Sans"}}>
                    Ready to Transform Your Event Experience?
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: "gray", fontFamily: "Product Sans", fontSize:"14px" }}>
                    Join thousands of event organizers and attendees who are already using our platform
                </Typography>
                <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate("/events")} // Use navigate function here
                    sx={{
                        backgroundColor: '#C21807',
                        borderRadius: '10px',
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                        '&:hover': {
                            backgroundColor: '#A61506',
                            color: '#fff',
                        },
                        px: 4,
                    }}
                >
                    Get Started Now
                </Button>
            </Box>
        </>
    );
}
