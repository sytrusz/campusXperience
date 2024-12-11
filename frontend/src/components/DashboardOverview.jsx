import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';

const makeAuthorizedRequest = async (url, options = {}) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {};
};

export default function DashboardOverview() {
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, events] = await Promise.all([
          makeAuthorizedRequest('http://localhost:8080/user/getAll'),
          makeAuthorizedRequest('http://localhost:8080/event/getAll'),
        ]);
        setUserCount(users.length);
        setEventCount(events.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {/* Total Users Card */}
      <Card sx={{ maxWidth: 300, width: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Product Sans', fontWeight: 'medium' }}>
              Total Users
            </Typography>
            <PeopleAltIcon sx={{ color: 'purple' }} />
          </Box>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Product Sans', fontWeight: 'bold', mb: 1 }}>
            {userCount.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      {/* Total Events Card */}
      <Card sx={{ maxWidth: 300, width: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Product Sans', fontWeight: 'medium' }}>
              Total Events
            </Typography>
            <EventIcon sx={{ color: 'blue' }} />
          </Box>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Product Sans', fontWeight: 'bold', mb: 1 }}>
            {eventCount.toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
