import React, { useState } from 'react';
import styled from 'styled-components';
import RsvpButton from './RsvpButton';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
`;

const DateTime = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const DateTimeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
`;

const Description = styled.div`
  margin-bottom: 25px;
  line-height: 1.6;
  color: #555;
`;

const Events = () => {
  const [isReserved, setIsReserved] = useState(false);

  const handleReservation = async () => {
    try {
      if (isReserved) {
        const reservation = {
          event: { eventId: 1 },
          user: { userId: 3 },
          status: "Cancel",
          reservationTime: new Date().toISOString()
        };
        
        await fetch("http://localhost:8080/rsvp/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reservation)
        /*await fetch("http://localhost:8080/rsvp/delete/{rsvpId}", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }*/
        });
      } else {
        const reservation = {
          event: { eventId: 1 },
          user: { userId: 3 },
          status: "Reserved",
          reservationTime: new Date().toISOString()
        };
        
        await fetch("http://localhost:8080/rsvp/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reservation)
        });
      }
      setIsReserved(!isReserved);
    } catch (error) {
      console.error("Reservation request failed:", error);
    }
  };

  return (
    <Container>
      <Title>Concert in the Park</Title>
      <DateTime>
        <DateTimeItem>
          <i className="far fa-calendar"></i>
          <span>September 30, 2023</span>
        </DateTimeItem>
        <DateTimeItem>
          <i className="far fa-clock"></i>
          <span>7:00 PM</span>
        </DateTimeItem>
      </DateTime>
      <Description>
        <p>
          Join us for an evening of live music in the park! Featuring local bands
          and artists, food vendors, and family-friendly activities. Don't miss
          this amazing event under the stars.
        </p>
      </Description>
      <RsvpButton isReserved={isReserved} onReserve={handleReservation} />
    </Container>
  );
};

export default Events;
