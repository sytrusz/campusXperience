import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { CircularProgress, Typography, Box } from "@mui/material";

const FetchReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.id;

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
              <EventCard
                key={event.eventId}
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
            );
          })}
        </div>
      ) : (
        <Typography>No reservations found for this user.</Typography>
      )}
    </div>
  );
};

export default FetchReservations;
