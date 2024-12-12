import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';  // For Total Tickets

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
  const [ticketCount, setTicketCount] = useState(0);  // State for Total Tickets

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, events, tickets] = await Promise.all([
          makeAuthorizedRequest('http://localhost:8080/user/getAll'),
          makeAuthorizedRequest('http://localhost:8080/event/getAll'),
          makeAuthorizedRequest('http://localhost:8080/ticket/getAll'),  // Fetch total tickets
        ]);
        setUserCount(users.length);
        setEventCount(events.length);
        setTicketCount(tickets.length);  // Set ticket count
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',  // Center horizontally
        gap: 8,
        flexWrap: 'wrap',
        mt: 2,  // Add margin top
      }}
    >
      {/* Total Users Card */}
      <Card sx={{ maxWidth: 300, width: '100%', boxShadow: 3 }}>
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
      <Card sx={{ maxWidth: 300, width: '100%', boxShadow: 3 }}>
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

      {/* Total Tickets Card */}
      <Card sx={{ maxWidth: 300, width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Product Sans', fontWeight: 'medium' }}>
              Total Tickets
            </Typography>
            <ConfirmationNumberIcon sx={{ color: 'green' }} />  {/* Icon for Tickets */}
          </Box>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Product Sans', fontWeight: 'bold', mb: 1 }}>
            {ticketCount.toLocaleString()}  {/* Display ticket count */}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
