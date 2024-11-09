// pages/EventDashboard.jsx
import React from 'react';
import EventCard from '../components/EventCard';

const events = [
  {
    id: 1,
    title: "Basketball Tournament",
    date: "Nov 1, 2024",
    time: "2:00 PM",
    location: "CIT-U Gym",
    category: "Sports",
    attendees: 42,
    description: "Join us for the annual inter-department basketball tournament!",
    image: "/api/placeholder/400/320"
  },
  {
    id: 2,
    title: "Tech Workshop",
    date: "Nov 1, 2024",
    time: "3:00 PM",
    location: "CIT-U Gym",
    category: "Workshops",
    attendees: 35,
    description: "Learn the latest technologies in this hands-on workshop.",

  },
  {
    id: 3,
    title: "Cultural Night",
    date: "Nov 1, 2024",
    time: "6:00 PM",
    location: "CIT-U Gym",
    category: "Cultural",
    attendees: 56,
    description: "Experience the diverse cultural performances from our students.",
    image: "/api/placeholder/400/320"
  }
];

const EventDashboard = () => {
  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#F8F5F2',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', color: '#C21807' }}>Event Dashboard</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default EventDashboard;
