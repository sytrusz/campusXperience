import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { sendEmail } from "../components/SendEmail"; 
import { CircularProgress, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const FetchReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null); // State for selected reservation

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.id;
  const email = localStorage.getItem('email');

  const ticketUrl = 'http://localhost:8080/ticket'; 


  console.log("User ID is: " + userId);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `http://localhost:8080/rsvp/getAllbyUserId?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reservations");
      }

      const data = await response.json();
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReservations();
    }
  }, [userId]);

  const handleReservationClick = (reservation) => {
    setSelectedReservation(reservation); 
  };

  const handleTicketDialog = async (selectedReservation) => {
    const token = localStorage.getItem("jwtToken"); // Fetch the token here
    console.log(email)
  
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser")); 
      const userId = currentUser.id; 
      const eventId = selectedReservation.event.eventId;  // Ensure you're accessing the correct event ID
    
      const ticketBody = {
        event: { eventId: eventId },  
        user: { userId: userId },
        ticketType: 'VIP',
        price: '100.00',
        purchaseTime: new Date().toISOString(),
      };
      console.log(userId);
    
      const response = await fetch(`${ticketUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ticketBody),
      });
    
      if (!response.ok) throw new Error('Failed to confirm ticket for the event');

      const data = await response.json();
      alert('Ticket confirmation successful');
      const emailData = {
        to: email,
        subject: "Event Confirmation",
        body: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  color: #333;
                  line-height: 1.6;
                  background-color: #f8f8f8;
                  margin: 0;
                  padding: 0;
                }
                .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: white;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                }
                .header {
                  background-color: #C21807;
                  color: white;
                  text-align: center;
                  padding: 10px;
                  border-radius: 8px 8px 0 0;
                }
                .content {
                  padding: 20px;
                  text-align: center;
                }
                .footer {
                  background-color: #eee;
                  color: #888;
                  padding: 10px;
                  text-align: center;
                  font-size: 12px;
                  border-radius: 0 0 8px 8px;
                }
                .button {
                  display: inline-block;
                  background-color: #C21807;
                  color: white;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <h2>Event Confirmation</h2>
                </div>
                <div class="content">
                  <h3>You have successfully reserved your spot for the event:</h3>
                  <p><strong>${selectedReservation.event.title}</strong></p>
                  <p><strong>Date & Time:</strong> ${new Date(selectedReservation.event.startTime).toLocaleString()}</p>
                  <p><strong>Location:</strong> ${selectedReservation.event.location}</p>
                  <a href="#" class="button">View Event Details</a>
                </div>
                <div class="footer">
                  <p>If you have any questions, feel free to reach out to us.</p>
                  <p>&copy; ${new Date().getFullYear()} CampusXperience</p>
                </div>
              </div>
            </body>
          </html>
        `,
      };      
      sendEmail(emailData, token); 
      setSelectedReservation(null);  
    } catch (err) {
      console.error('Error while confirming ticket:', err);
      alert('Failed to confirm ticket');
    }
  };
  

  const handleCloseDialog = () => {
    setSelectedReservation(null); // Close the dialog
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <div style={{ padding: "40px", backgroundColor: "#F8F5F2", minHeight: "100vh" }}>
      <h2 style={{ color: "#C21807" }}>Your Reserved Events</h2>
      {reservations.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {reservations.map((reservation) => {
            const event = reservation.event;
            return (
              <div
                key={event.eventId}
                onClick={() => handleReservationClick(reservation)} // Click on reservation to show details
                style={{ cursor: "pointer" }}
              >
                <EventCard
                  id={event.eventId}
                  title={event.title}
                  date={new Date(event.startTime).toLocaleDateString()}
                  time={new Date(event.startTime).toLocaleTimeString()}
                  location={event.location}
                  category={event.category || "General"}
                  attendees={event.maxCapacity || 0}
                  description={event.description}
                  image={
                    event.imageUrl
                      ? `http://localhost:8080${event.imageUrl}`
                      : "/path/to/placeholder.jpg"
                  }
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Typography>No reservations found for this user.</Typography>
      )}

      {/* Dialog for reservation details */}
      {selectedReservation && (
        <Dialog open={!!selectedReservation} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>{selectedReservation.event.title}</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Description</Typography>
            <Typography>{selectedReservation.event.description}</Typography>

            <Typography variant="h6" style={{ marginTop: "16px" }}>
              Location
            </Typography>
            <Typography>{selectedReservation.event.location}</Typography>

            <Typography variant="h6" style={{ marginTop: "16px" }}>
              Date & Time
            </Typography>
            <Typography>
              {new Date(selectedReservation.event.startTime).toLocaleString()} -{" "}
              {new Date(selectedReservation.event.endTime).toLocaleString()}
            </Typography>

            <Typography variant="h6" style={{ marginTop: "16px" }}>
              Max Capacity
            </Typography>
            <Typography>{selectedReservation.event.maxCapacity}</Typography>

            {selectedReservation.event.imageUrl && (
              <Box
                component="img"
                src={`http://localhost:8080${selectedReservation.event.imageUrl}`}
                alt={selectedReservation.event.title}
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  marginTop: "16px",
                  borderRadius: "8px",
                }}
              />
            )}
          </DialogContent>

          <DialogActions>
          <Button onClick={() => handleTicketDialog(selectedReservation)}>
              Confirm reservation
              </Button>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default FetchReservations;
