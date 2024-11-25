import React from 'react';
import { Lightbulb, Users, Accessibility, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const globalStyles = {
  fontFamily: 'Product Sans, sans-serif',  
  container: { 
    minHeight: '100vh', 
    background: 'linear-gradient(to bottom, #ffffff, #fff5f5)',
    fontFamily: 'Product Sans, sans-serif', 
    padding: '0'
  },
  section: { maxWidth: '1200px', margin: '0 auto', padding: '64px 20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' },
  card: { backgroundColor: '#ffffff', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
  iconWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '16px' },
  button: { backgroundColor: '#dc2626', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' },
  cta: { backgroundColor: '#FFFFFFF', color: '#000000', padding: '64px 20px', textAlign: 'center' },
  hero: { position: 'relative', overflow: 'hidden', backgroundColor: '#C21807', color: '#ffffff', padding: '60px 20px' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2 },
  heroContent: { position: 'relative', maxWidth: '1200px', margin: '0 auto', fontSize: '24px'},
  devTeamCard: { backgroundColor: '#ffffff', padding: '32px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' },
};

const HeroSection = () => (
  <div style={globalStyles.hero}>
    <div style={globalStyles.heroContent}>
      <h1>About Us</h1>
      <p>Revolutionizing campus events through innovative management solutions.</p>
    </div>
  </div>
);

const MissionVisionSection = () => (
  <div style={globalStyles.section}>
    <div style={globalStyles.grid}>
      <div style={globalStyles.card}>
        <h2>Our Mission</h2>
        <p>Transforming campus event management with intuitive, powerful tools.</p>
      </div>
      <div style={globalStyles.card}>
        <h2>Our Vision</h2>
        <p>Making event management accessible for every campus organization.</p>
      </div>
    </div>
  </div>
);

const CoreValuesSection = ({ values }) => (
  <div style={globalStyles.section}>
    <h2>Core Values</h2>
    <div style={globalStyles.grid}>
      {values.map((value, index) => (
        <div key={index} style={{ ...globalStyles.card, textAlign: 'center' }}>
          <div style={globalStyles.iconWrapper}>{value.icon}</div>
          <h3>{value.title}</h3>
          <p>{value.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const TimelineSection = () => (
  <div style={globalStyles.section}>
    <div style={globalStyles.card}>
      <h2>Our Story</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
        <Clock size={32} color="#dc2626" />
        <div style={{ marginLeft: '16px' }}>
          <h3>2024</h3>
          <p>Founded by students that want to revolutionize campus event management.</p>
        </div>
      </div>
    </div>
  </div>
);

const DevTeamSection = () => (
  <div style={globalStyles.section}>
    <h2>Meet Our Dev Team</h2>
    <div style={globalStyles.grid}>
      <div style={globalStyles.devTeamCard}>
        <h3>Vicci Louise Agramon</h3>
        <p>Project Lead</p>
      </div>
      <div style={globalStyles.devTeamCard}>
        <h3>Piolo Frances L. Enriquez</h3>
        <p>Full Stack Developer</p>
      </div>
      <div style={globalStyles.devTeamCard}>
        <h3>Darwin Darryl Jean Largoza</h3>
        <p>Front-End Developer</p>
      </div>
      <div style={globalStyles.devTeamCard}>
        <h3>Nathan Rener Malagapo</h3>
        <p>Back-End Developer</p>
      </div>
      <div style={globalStyles.devTeamCard}>
        <h3>Jerjen Res Pangalay</h3>
        <p>UI/UX Designer</p>
      </div>
    </div>
  </div>
);

const CTASection = () => {
  const navigate = useNavigate(); // Initialize navigate here

  const handleEventDiscovery = () => {
    navigate("/events"); // Use navigate function here
  };

  return (
    <div style={globalStyles.cta}>
      <h2>Join Our Community</h2>
      <p>Start your journey with Campus Xperience today.</p>
      <button
        onClick={handleEventDiscovery} // Updated to call handleEventDiscovery
        style={globalStyles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#b91c1c')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#dc2626')}
      >
        Get Started
      </button>
    </div>
  );
};

const AboutUs = () => {
  const values = [
    { icon: <Lightbulb size={32} color="#dc2626" />, title: 'Innovation', description: 'Evolving with cutting-edge technology.' },
    { icon: <Accessibility size={32} color="#dc2626" />, title: 'Accessibility', description: 'Making event planning intuitive for everyone.' },
    { icon: <Users size={32} color="#dc2626" />, title: 'Community', description: 'Fostering connections across campus life.' },
  ];

  return (
    <div style={globalStyles.container}>
      <HeroSection />
      <MissionVisionSection />
      <CoreValuesSection values={values} />
      <TimelineSection />
      <DevTeamSection />
      <CTASection />
    </div>
  );
};

export default AboutUs;
