import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function DashboardOverview() {
    const [userCount, setUserCount] = useState<number | null>(null);
    const [percentageChange, setPercentageChange] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          setLoading(true);
          const usersData = ("http://localhost:8080/user/getAll");
          setUserCount(usersData.length);
          setPercentageChange(8.5);
        } catch (err) {
          console.error("Error fetching users:", err);
          setError("Could not fetch users. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    const renderContent = () => {
      if (loading) {
        return <CircularProgress />;
      }
      if (error) {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
            <ErrorOutlineIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{error}</Typography>
          </Box>
        );
      }
      return (
        <>
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Product Sans', fontWeight: 'bold', mb: 1 }}>
            {userCount?.toLocaleString() ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Product Sans' }}>
            <Box component="span" sx={{ color: 'green' }}>
              {percentageChange}% Up
            </Box>
            {' '}from yesterday
          </Typography>
        </>
      );
    };
  
    return (
      <Card sx={{ maxWidth: 300, width: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" component="div" sx={{ fontFamily: 'Product Sans', fontWeight: 'medium' }}>
              Total User
            </Typography>
            <PeopleAltIcon sx={{ color: 'purple' }} />
          </Box>
          {renderContent()}
        </CardContent>
      </Card>
    );
  }