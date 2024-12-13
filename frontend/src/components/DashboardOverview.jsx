import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  const [ticketCount, setTicketCount] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, events, tickets] = await Promise.all([
          makeAuthorizedRequest('http://localhost:8080/user/getAll'),
          makeAuthorizedRequest('http://localhost:8080/event/getAll'),
          makeAuthorizedRequest('http://localhost:8080/ticket/getAll'),
        ]);
        const userData = users.length;
        const eventData = events.length;
        const ticketData = tickets.length;

        setUserCount(userData);
        setEventCount(eventData);
        setTicketCount(ticketData);

        // Set chart data directly after fetching
        setChartData({
          labels: ['Users', 'Events', 'Tickets'], // Categories
          datasets: [
            {
              label: 'Overview',
              data: [userData, eventData, ticketData], // Dynamic data
              backgroundColor: [
                'rgba(128, 0, 128, 0.8)', // Purple
                'rgba(0, 0, 255, 0.8)', // Blue
                'rgba(0, 128, 0, 0.8)', // Green
              ],
              borderColor: [
                'rgba(128, 0, 128, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 128, 0, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <Box sx={{ mt: 2, px: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          flexWrap: 'wrap',
          mb: 4,
        }}
      >
        {/* Cards */}
        <Card sx={{ maxWidth: 300, width: '100%', boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 'medium' }}>
                Total Users
              </Typography>
              <PeopleAltIcon sx={{ color: 'purple' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: 'Product Sans', fontWeight: 'bold', mb: 1 }}>
              {userCount.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 300, width: '100%', boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 'medium' }}>
                Total Events
              </Typography>
              <EventIcon sx={{ color: 'blue' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: 'Product Sans', fontWeight: 'bold', mb: 1 }}>
              {eventCount.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 300, width: '100%', boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 'medium' }}>
                Total Tickets
              </Typography>
              <ConfirmationNumberIcon sx={{ color: 'green' }} />
            </Box>
            <Typography variant="h4" sx={{ fontFamily: 'Product Sans', fontWeight: 'bold', mb: 1 }}>
              {ticketCount.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {chartData && (
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Product Sans', fontWeight: 'medium' }}>
              Analytics Overview
            </Typography>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: { backgroundColor: '#f5f5f5', titleColor: '#333' },
                },
                scales: {
                  x: { grid: { color: 'rgba(200, 200, 200, 0.2)' } },
                  y: {
                    grid: { color: 'rgba(200, 200, 200, 0.2)' },
                    ticks: { stepSize: 10 },
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
