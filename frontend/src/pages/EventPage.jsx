import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import EventCard from '../components/EventCard';
import ReserveButton from '../components/ReserveButton';

const EventPage = () => {
  const { eventId } = useParams(); // Extract eventId from the route
  const [event, setEvent] = useState(null); // State for event data
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    // Fetch the event details from the backend
    fetch(`http://localhost:8080/event/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data); // Set the event data
      })
      .catch((error) => console.error('Error fetching event:', error));
  }, [eventId]);

  const handleReserve = () => {
    setIsReserved(!isReserved); // Toggle reservation status
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <section style={styles.heroSection}>
          <img
            src={event.image || "https://via.placeholder.com/1600"} // Fallback for image
            alt={event.title}
            style={styles.heroImage}
          />
          <div style={styles.heroOverlay}>
            <h1 style={styles.heroTitle}>{event.title}</h1>
            <p style={styles.heroText}>{event.description}</p>
            <p style={styles.heroText}>
              Date: {event.date} | Time: {event.startTime} - {event.endTime}
            </p>
            <p style={styles.heroText}>Location: {event.location}</p>
            <p style={styles.heroText}>Price: {event.price}</p>
            <ReserveButton isReserved={isReserved} onReserve={handleReserve} />
          </div>
        </section>
        <section style={styles.eventsSection}>
          <h2 style={styles.sectionTitle}>Other Events</h2>
          <div style={styles.eventGrid}>
            {/* Placeholder for other events */}
            <p>Coming soon...</p>
          </div>
        </section>
      </main>
    </div>
  );
};
const styles = {
  page: {
    backgroundColor: '#F8F5F2',
    minHeight: '100vh',
  },
  main: {
    paddingTop: '96px',
    paddingBottom: '48px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  heroSection: {
    position: 'relative',
    height: '60vh',
    borderRadius: '16px',
    overflow: 'hidden',
    marginBottom: '32px',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease, filter 0.3s ease',
      ':hover': {
        transform: 'scale(1.05)', // Slight zoom
        filter: 'brightness(0.9)', // Slightly dimmed
      },
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '32px',
    color: '#ffffff',
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  heroText: {
    maxWidth: '600px',
    fontSize: '16px',
    marginBottom: '24px',
  },
  eventsSection: {
    marginTop: '32px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '16px',
  },
  eventGrid: {
    cursor: 'pointer',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
  },
};

export default EventPage;
