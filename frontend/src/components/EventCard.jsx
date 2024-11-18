import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia, Chip, Box } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

const EventCard = ({ title, date, time, location, description, image, category, status, onEdit, onDelete }) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
      {image && (
        <CardMedia
          component="img"
          alt={title}
          height="180"
          image={image}
          sx={{ objectFit: 'cover', borderBottom: '2px solid #eee' }}
        />
      )}
      <CardContent sx={{ padding: '16px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <LocationOn sx={{ color: '#C21807', marginRight: '4px' }} />
          <Typography variant="body2" color="textSecondary" sx={{ flexGrow: 1 }}>
            {location}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '8px' }}>
          <strong>Date:</strong> {date}, <strong>Time:</strong> {time}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: '16px' }}>
          {description}
        </Typography>
        {status && (
          <Chip label={status} color={status === 'Upcoming' ? 'primary' : 'secondary'} size="small" sx={{ marginBottom: '16px' }} />
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
