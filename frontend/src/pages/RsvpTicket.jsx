import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { sendEmail } from "../components/SendEmail"; 
import {
  CircularProgress,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const FetchReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [successDialog, setSuccessDialog] = useState({ open: false, message: "" }); 
  const [errorDialog, setErrorDialog] = useState({ open: false, message: "" }); 

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.id;
  const email = localStorage.getItem("email");

  const ticketUrl = "http://localhost:8080/ticket";

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
    const token = localStorage.getItem("jwtToken");

    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const userId = currentUser.id;
      const eventId = selectedReservation.event.eventId;

      const ticketBody = {
        event: { eventId: eventId },
        user: { userId: userId },
        ticketType: "VIP",
        price: "100.00",
        purchaseTime: new Date().toISOString(),
      };

      const response = await fetch(`${ticketUrl}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticketBody),
      });

      if (response.headers.get("X-Custom-Error")) {
        setErrorDialog({ open: true, message: response.headers.get("X-Custom-Error") });
      }

      if (response.status === 403) {
        setErrorDialog({ open: true, message: "You are not authorized. Please log in again." });
        return;
      } else if (response.status === 400) {
        setErrorDialog({ open: true, message: "No slots available for this event." });
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to confirm ticket for the event");
      }

      const data = await response.json();
      setSuccessDialog({ open: true, message: "Ticket confirmation successful" });

      const emailData = {
        to: email,
        subject: "Event Confirmation",
        body: `
          <html>
            <head>
              <style>
                body {
                  font-family: Product Sans, sans-serif;
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
      setErrorDialog({ open: true, message: err.message || "An error occurred. Please try again later." });
    }
  };

  const handleCloseDialog = () => {
    setSelectedReservation(null);
  };

  const handleErrorDialogClose = () => {
    setErrorDialog((prevState) => ({ ...prevState, open: false })); 
    setTimeout(() => {
        setErrorDialog((prevState) => ({ ...prevState, message: "" }));
    }, 300); 
};
const handleSuccessDialogClose = () => {
  setSuccessDialog((prevState) => ({ ...prevState, open: false })); 
  setTimeout(() => {
    setSuccessDialog((prevState) => ({ ...prevState, message: "" }));
  }, 300); };


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
    <div style={{ padding: "40px", backgroundColor: "#FFF8F0", minHeight: "100vh", fontFamily: "Product Sans, sans-serif", alignItems: "start", }}>
      <h2 style={{ color: "#C21807", textAlign: "center", fontWeight: "bold", marginBottom: "20px", fontSize: "30px", fontWeight: "600", }}>
        Your Reserved Events
      </h2>
      {reservations.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "start",
            justifyItems: "center",
          }}
        >
          {reservations.map((reservation) => {
            const event = reservation.event;
            return (
              <div
                key={event.eventId}
                onClick={() => handleReservationClick(reservation)}
                style={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  overflow: "hidden",
                  width: "300px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                }}
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
        <Typography style={{ color: "#C21807", textAlign: "center", marginTop: "20px", fontSize: "1.1rem" }}>
          No reservations found for this user.
        </Typography>
      )}
  
      {selectedReservation && (
        <Dialog open={!!selectedReservation} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle style={{ color: "#C21807", fontWeight: "bold" }}>
            {selectedReservation.event.title}
          </DialogTitle>
          <DialogContent style={{ padding: "24px" }}>
            <Typography variant="h6" style={{ color: "#C21807", marginBottom: "12px" }}>
              Description
            </Typography>
            <Typography>{selectedReservation.event.description}</Typography>
  
            <Typography variant="h6" style={{ color: "#C21807", marginTop: "20px", marginBottom: "12px" }}>
              Location
            </Typography>
            <Typography>{selectedReservation.event.location}</Typography>
  
            <Typography variant="h6" style={{ color: "#C21807", marginTop: "20px", marginBottom: "12px" }}>
              Date & Time
            </Typography>
            <Typography>
              {new Date(selectedReservation.event.startTime).toLocaleString()} -{" "}
              {new Date(selectedReservation.event.endTime).toLocaleString()}
            </Typography>
  
            <Typography variant="h6" style={{ color: "#C21807", marginTop: "20px", marginBottom: "12px" }}>
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
                  fontFamily: "Product Sans, sans-serif",
                  maxHeight: "100%",
                  objectFit: "cover",
                  marginTop: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              />
            )}
          </DialogContent>
  
          <DialogActions style={{ justifyContent: "space-between", padding: "12px 24px" }}>
            <Button
              onClick={() => handleTicketDialog(selectedReservation)}
              style={{ backgroundColor: "#C21807", color: "#FFFFFF", padding: "8px 16px", fontWeight: "bold" }}
            >
              Confirm Reservation
            </Button>
            <Button onClick={handleCloseDialog} style={{ color: "#C21807", fontWeight: "bold" }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
  
      <Dialog open={successDialog.open} onClose={handleSuccessDialogClose}>
        <DialogTitle style={{ color: "#C21807", fontWeight: "bold" }}>Success</DialogTitle>
        <DialogContent>
          <Typography>{successDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose} style={{ color: "#C21807", fontWeight: "bold" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  
      <Dialog open={errorDialog.open} onClose={handleErrorDialogClose}>
        <DialogTitle style={{ color: "#C21807", fontWeight: "bold" }}>Error</DialogTitle>
        <DialogContent>
          <Typography>{errorDialog.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} style={{ color: "#C21807", fontWeight: "bold" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  

};

export default FetchReservations;
