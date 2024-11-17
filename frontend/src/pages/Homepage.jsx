import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Search, Security, Notifications, CalendarMonth, Group, Star } from '@mui/icons-material';

export default function Homepage() {
    const features = [
        {
            icon: <Search sx={{ fontSize: 40, color: '#C21807' }} />,
            title: "Smart Event Discovery",
            description: "Find events that match your interests with our intelligent recommendation system"
        },
        {
            icon: <Security sx={{ fontSize: 40, color: '#C21807' }} />,
            title: "Secure RSVPs",
            description: "Manage your attendance with encrypted, fraud-proof registration"
        },
        {
            icon: <Notifications sx={{ fontSize: 40, color: '#C21807' }} />,
            title: "Real-time Updates",
            description: "Never miss an update with instant notifications about your events"
        },
        {
            icon: <CalendarMonth sx={{ fontSize: 40, color: '#C21807' }} />,
            title: "Smart Scheduling",
            description: "Coordinate with ease using our conflict-free scheduling system"
        },
        {
            icon: <Group sx={{ fontSize: 40, color: '#C21807' }} />,
            title: "Community Engagement",
            description: "Connect with like-minded attendees before, during, and after events"
        },
        {
            icon: <Star sx={{ fontSize: 40, color: '#C21807' }} />,
            title: "Exclusive Access",
            description: "Get early bird tickets and special rates for premium events"
        }
    ];

    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F8F5F2',
                    textAlign: 'center',
                    p: 4,
                }}
            >
                <Typography variant="h2" component="h1" 
                    sx={{ 
                        mb: 2, 
                        color: '#C21807',
                        fontWeight: 'bold',
                        fontSize: { xs: '2.5rem', md: '3.75rem' }
                    }}>
                    Your Events, Elevated
                </Typography>
                <Typography variant="h5" 
                    sx={{ 
                        mb: 4, 
                        color: '#333',
                        maxWidth: '800px',
                        mx: 'auto'
                    }}>
                    Discover, join, and manage memorable events with our all-in-one platform
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        size="large"
                        sx={{
                            backgroundColor: '#C21807',
                            '&:hover': {
                                backgroundColor: '#A61506',
                            },
                            px: 4,
                        }}
                    >
                        Register Now
                    </Button>
                    <Button 
                        variant="outlined" 
                        size="large"
                        sx={{
                            borderColor: '#C21807',
                            color: '#C21807',
                            '&:hover': {
                                borderColor: '#A61506',
                                backgroundColor: 'rgba(194, 24, 7, 0.04)',
                            },
                            px: 4,
                        }}
                    >
                        Login to View Events
                    </Button>
                </Box>
            </Box>

            {/* Features Section */}
            <Box sx={{ py: 8, px: 4, backgroundColor: 'white' }}>
                <Typography variant="h3" sx={{ mb: 6, textAlign: 'center', color: '#C21807', fontWeight: 'bold' }}>
                    Everything You Need for Successful Events
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                sx={{
                                    p: 4,
                                    height: '100%',
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
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#C21807' }}>
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

            {/* CTA Section */}
            <Box sx={{ py: 8, px: 4, backgroundColor: '#C21807', color: 'white', textAlign: 'center' }}>
                <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Ready to Transform Your Event Experience?
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.9)' }}>
                    Join thousands of event organizers and attendees who are already using our platform
                </Typography>
                <Button 
                    variant="contained" 
                    size="large"
                    sx={{
                        backgroundColor: 'white',
                        color: '#C21807',
                        '&:hover': {
                            backgroundColor: '#F8F5F2',
                        },
                        px: 4,
                    }}
                >
                    Get Started Now
                </Button>
            </Box>

            {/* Footer Section */}
            <Box
                sx={{
                    p: 3,
                    backgroundColor: '#C21807',
                    color: 'white',
                    textAlign: 'center',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <Typography variant="body1">
                    © {new Date().getFullYear()} CampusXperience. All rights reserved.
                </Typography>
            </Box>
        </>
    );
}