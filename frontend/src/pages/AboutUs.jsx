import { minWidth } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const globalStyles = {
  fontFamily: 'Product Sans, sans-serif',
  container: {
  minHeight: '100vh',
  background: 'linear-gradient(to bottom, #ffffff, #fff5f5)',
  padding: '0',
  },
  hero: {
    position: 'relative',
    fontFamily: 'Product Sans, sans-serif',
    overflow: 'hidden',
    backgroundColor: '#C21807',
    color: '#ffffff',
    padding: '60px 20px',
    textAlign: 'left',
  },
  heroContent: {
    position: 'relative',
    maxWidth: '800px',
    margin: '0',
    fontSize: '18px',
    lineHeight: '1.6',
    marginLeft: '50px',
  },
  blockquote: {
    fontStyle: 'italic',
    color: '#f5f5f5',
    borderLeft: '4px solid #ffccd5',
    padding: '10px 20px',
    margin: '20px 0',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  devTeamCard: {
    backgroundColor: '#f5f5f5',
    padding: '32px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  devTeamCardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
  },
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '64px 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    minWidth: '200px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
  },
  cta: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    padding: '64px 20px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    padding: '12px 32px',
    borderRadius: '8px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#b91c1c',
    transform: 'scale(1.05)',
  },
};

const DevTeam = () => (
  <div style={globalStyles.section}>
    <h2 style={{ 
      color: '#800000', 
      textAlign: 'center',
      marginBottom: '40px',
      fontSize: '2rem',
      fontWeight: 'bold'
    }}>Meet The Team</h2>
    <div style={globalStyles.grid}>
      <div style={{ ...globalStyles.devTeamCard, ...globalStyles.devTeamCardHover }}>
        <img 
          src="https://scontent-mnl1-1.xx.fbcdn.net/v/t39.30808-6/455320902_8077998918942576_3070034767662392834_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHBB7XHW_LCExl91tQfb6p1k9sLDGYlGdeT2wsMZiUZ14egXmQFFN4429HoygFtrE_cGSeTDsf56uNtCQeDcmHz&_nc_ohc=sGUipwuVbbgQ7kNvgFom1_1&_nc_zt=23&_nc_ht=scontent-mnl1-1.xx&_nc_gid=AbT21xltFF7BMzkhVjINHfm&oh=00_AYAKsXreaako5Y-vVOBbwtP3DnAc8YtW3ihKLWEdIpWoeQ&oe=676051B3"
          alt="Enriquez Piolo Frances L."
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            marginBottom: '20px',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto 20px'
          }}
        />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Enriquez Piolo Frances L.</h3>
        <p style={{ color: '#666' }}>Project Lead</p>
      </div>

      <div style={{ ...globalStyles.devTeamCard, ...globalStyles.devTeamCardHover }}>
        <img 
          src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462643654_888495970141297_2550350042686786642_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFr8P-3jg610_XFzaX_bjaZdkvptW2eaWp2S-m1bZ5pajaq8iF-CpgQABucmrIoE-530hYvmPdgRQqFy-mmYaJn&_nc_ohc=INOJtrvohnUQ7kNvgGm_Ukb&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QESmAayDsbmI2nAY3iqWSE9L3ywoqUoATiycMfQldwfeg&oe=6772BD5F"
          alt="Darwin Darryl Jean E. Largoza"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            marginBottom: '20px',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto 20px'
          }}
        />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Darwin Darryl Jean E. Largoza</h3>
        <p style={{ color: '#666' }}>UX/UI Designer</p>
      </div>

      <div style={{ ...globalStyles.devTeamCard, ...globalStyles.devTeamCardHover }}>
        <img 
          src="https://scontent.fcgy2-3.fna.fbcdn.net/v/t1.6435-9/39953524_10204903170175114_1115168862334091264_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=94e2a3&_nc_eui2=AeGZmQCe6SZBv3MDHUnbscQXEBj2g2EZTesQGPaDYRlN64p8IEAYFusdezfxgh5p_Ve12z3D626TQiWlBkqIa-0g&_nc_ohc=wC5WTSbDweQQ7kNvgHfRpIF&_nc_zt=23&_nc_ht=scontent.fcgy2-3.fna&_nc_gid=AQIyM0D956Nn97g2qPr1dLm&oh=00_AYAbNuBPeLv3S6eVwllyAao34pOr_dE5inlT5ZXZGgPPgQ&oe=677D1AB2"
          alt="Malagapo Nathan Rener S."
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            marginBottom: '20px',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto 20px'
          }}
        />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Malagapo Nathan Rener S.</h3>
        <p style={{ color: '#666' }}>Frontend Developer</p>
      </div>

      <div style={{ ...globalStyles.devTeamCard, ...globalStyles.devTeamCardHover }}>
        <img 
          src="https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/468977811_9096160807095516_8034811657684420272_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFJ03hYAdt24DDR-1iE6sy1-PpWVmFDUM34-lZWYUNQzY9GrKt2dL8LSOPsnQEBDlUJXePTBZ3Di0PF1nJBqpE7&_nc_ohc=En2KDtSTd4QQ7kNvgEFw70o&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&_nc_gid=AEO0hQTMmYfLC0zoRSISKL_&oh=00_AYCoHK4XGSj-iTL97khmMjZjfplps6p0sgWJnY_BOKgfdA&oe=67604096"
          alt="Vicci Louise Agramon"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            marginBottom: '20px',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto 20px'
          }}
        />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Vicci Louise Agramon</h3>
        <p style={{ color: '#666' }}>Backend Engineer</p>
      </div>

      <div style={{ ...globalStyles.devTeamCard, ...globalStyles.devTeamCardHover }}>
        <img 
          src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462651954_567543172560281_3790142645783679376_n.png?_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHo_Fxe5zDv_kB5lhwIMafnqyHQrQ-vz7-rIdCtD6_Pv6rN5zTRpLoI0S1s_VJ_xIEg4vOPhIui6EyPEvAr7aiS&_nc_ohc=AS7nTyeqVcYQ7kNvgGvFRH_&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QEAwihXsEBUxwGcxZhMSaeer-0zsDSQS3Fpk3_tVvNYXw&oe=677297E4"
          alt="Jerjen Res Pangalay"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            marginBottom: '20px',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto 20px'
          }}
        />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Jerjen Res Pangalay</h3>
        <p style={{ color: '#666' }}>Frontend Developer</p>
      </div>
    </div>
  </div>
);


const HeroSection = () => (
  <header
    style={{
      ...globalStyles.hero,
      backgroundImage: 'url("https://scontent.xx.fbcdn.net/v/t1.15752-9/462641148_549689784342221_5622515365787508271_n.png?stp=dst-png_s480x480&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeF6e41YksXPXPWwAwarDM4BsUvZgF0ZzrqxS9mAXRnOuqqH60VMC0PQIz1S7CnZYACkqhSrwnw1K1ybIXRIJj7Q&_nc_ohc=vdDo970ViN4Q7kNvgFZHC7h&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QHh_JKXbC7LHtdlg-Plhkk-mYj7rpsJoNtb6suWJP9v8g&oe=6772BB54")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '60px 20px',
    }}
  >
    <div style={{ flex: 1, ...globalStyles.heroContent }}>
      <h1
        style={{
          fontFamily: 'Product Sans',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginLeft: '20px',
        }}
      >
        For students, By students.
      </h1>
      <blockquote style={globalStyles.blockquote}>
        <p>
          At CampusXperience, we believe every campus event is unique and
          deserves tools that adapt to its needs. Traditional event management
          systems can be too rigid, making it difficult for organizations to
          express their creativity and vision.
        </p>
      </blockquote>
      <blockquote style={globalStyles.blockquote}>
        <p>
          We built CampusXperience to empower students and organizations to
          create, manage, and enjoy events effortlessly. As your campus
          community grows, CampusXperience grows with you—offering solutions
          that evolve to make every event more engaging, inclusive, and
          unforgettable.
        </p>
      </blockquote>
    </div>
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <img
        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/462638903_584546547398297_1577564671319478986_n.png?stp=dst-png_p480x480&_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeELxAB9-ojqKyWpDWwwqLQEbCdpX9j7wPtsJ2lf2PvA-6nAww7aGRkgSEyEHICQwcStFJ28joYKJzeT-xV2DQG6&_nc_ohc=mRK9mirmAcgQ7kNvgE8kTJM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QHXLGNR1BaimlunW5rLCC6w3VcoVEPe-mmagyTt98sOGg&oe=6772A6CB"
        alt="Campus Xperience Illustration"
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  </header>
);
const MissionVisionSection = () => (
  <header
    style={{
      ...globalStyles,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage:
          'url("https://scontent.xx.fbcdn.net/v/t1.15752-9/462641148_549689784342221_5622515365787508271_n.png?stp=dst-png_s480x480&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeF6e41YksXPXPWwAwarDM4BsUvZgF0ZzrqxS9mAXRnOuqqH60VMC0PQIz1S7CnZYACkqhSrwnw1K1ybIXRIJj7Q&_nc_ohc=vdDo970ViN4Q7kNvgFZHC7h&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QHh_JKXbC7LHtdlg-Plhkk-mYj7rpsJoNtb6suWJP9v8g&oe=6772BB54")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        opacity: 0.5,
      }}
    ></div>

    {/* Content Section */}
    <div style={globalStyles.section}>
      <div style={globalStyles.grid}>
        <div style={{ ...globalStyles.card, ...globalStyles.cardHover }}>
          <h2>Our Mission</h2>
          <p>
            To revolutionize campus events by providing innovative, intuitive
            tools that empower organizations to plan, execute, and enjoy
            memorable experiences with ease.
          </p>
        </div>
        <div style={{ ...globalStyles.card, ...globalStyles.cardHover }}>
          <h2>Our Vision</h2>
          <p>
            To become the leading platform that bridges students, faculty, and
            organizations, making event management seamless and accessible
            across every campus.
          </p>
        </div>
        <div style={{ ...globalStyles.card, ...globalStyles.cardHover }}>
          <h2>Our Values</h2>
          <p>
            We are committed to fostering collaboration, innovation, and
            inclusion by providing accessible and intuitive tools that empower
            campus communities to create impactful, sustainable, and memorable
            events, all while delivering excellence and dedicated service.
          </p>
        </div>
      </div>
    </div>
  </header>
);


const CTASection = () => {
  const navigate = useNavigate();

  const handleEventDiscovery = () => {
    // Replace with actual route or remove if no specific route
    console.log("Navigating to events");
    navigate("/events");
  };

  return (
    <div style={globalStyles.cta}>
      <h2>Join Our Community</h2>
      <p>Start your journey with Campus Xperience today.</p>
      <button
        onClick={handleEventDiscovery}
        style={globalStyles.button}
        onMouseOver={(e) => Object.assign(e.target.style, globalStyles.buttonHover)}
        onMouseOut={(e) => Object.assign(e.target.style, globalStyles.button)}
      >
        Get Started
      </button>
    </div>
  );
};


const AboutUs = () => {
  return (
    <div style={globalStyles.container}>
      <HeroSection />
      <DevTeam />
      <MissionVisionSection />
      <CTASection />
    </div>
  );
};

export default AboutUs;