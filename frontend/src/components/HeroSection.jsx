import React, { useState } from 'react';
import bgimg from '../assets/images/piolo.jpg';

const HeroSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={styles.heroSection}>
      {/* Background Image */}
      <div style={styles.background}>
        <div style={styles.overlay} />
      </div>

      {/* Content */}
      <div style={styles.contentContainer}>
        <div style={styles.textContainer}>
          <h1 style={styles.title}>
            Your Events, <br />
            <span style={styles.highlight}>Elevated</span>
          </h1>
          <p style={styles.description}>
            Discover, Join, and Manage Memorable Events<br />
            with our All-in-One Platform
          </p>
          <button
            style={{
              ...styles.button,
              backgroundColor: hovered ? '#E64A19' : '#C21807',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  heroSection: {
    position: 'relative',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    backgroundImage: `url(${bgimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 10,
    margin: '100px',
    maxWidth: '1200px',
  },
  textContainer: {
    maxWidth: '640px',
  },
  title: {
    fontSize: '92px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  highlight: {
    color: '#C21807',
  },
  description: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '2rem',
  },
  button: {
    color: 'white',
    backgroundColor: '#C21807',
    padding: '0.80rem 5rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    fontSize: '20px',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s ease',
  },
};

export default HeroSection;
