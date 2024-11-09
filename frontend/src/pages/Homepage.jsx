import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import EventCard from '../components/EventCard'; 

export default function Homepage() {
    const events = [
        {
            title: 'Campus Tech Fest',
            date: 'November 15, 2024',
            time: '10:00 AM - 5:00 PM',
            location: 'Main Auditorium',
            category: 'Tech',
            attendees: 120,
            description: 'Join us for a day of tech talks and workshops.',
            image: '/path/to/image1.jpg', // Include image URL if needed
        },
        {
            title: 'Art Exhibition',
            date: 'November 22, 2024',
            time: '1:00 PM - 6:00 PM',
            location: 'Art Gallery',
            category: 'Art',
            attendees: 80,
            description: 'Explore the latest art pieces from local artists.',
            image: '/path/to/image2.jpg',
        },
        // Add more events as needed
        {
            title: 'Jerjen Res Pangalay',
            date: 'November 22, 2024',
            time: '1:00 PM - 6:00 PM',
            location: 'Art Gallery',
            category: 'Art',
            attendees: 80,
            description: 'Explore the latest art pieces from local artists.',
            image: '/path/to/image2.jpg',
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    height: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'url(/src/assets/images/cit.png)', // Update the image path
                    backgroundSize: 'cover',
                    color: 'white',
                    textAlign: 'center',
                    p: 3,
                }}
            >
            </Box>

            {/* Events Section */}
            <Box sx={{ p: 4, backgroundColor: '#F8F5F2' }}>
                <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#C21807' , fontWeight: 'bold'}}>
                    Upcoming Events
                </Typography>
                <Grid container spacing={4}>
                    {events.map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <EventCard
                                title={event.title}
                                date={event.date}
                                time={event.time}
                                location={event.location}
                                category={event.category}
                                attendees={event.attendees}
                                description={event.description}
                                image={event.image} // Pass the image if needed
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Footer Section */}
            <Box
                sx={{
                    p: 3,
                    backgroundColor: '#c21807',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <Typography variant="body1">
                    © {new Date().getFullYear()} Campus Experience. All rights reserved.
                </Typography>
            </Box>
        </>
    );
}
