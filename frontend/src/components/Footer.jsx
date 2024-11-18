import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={styles.footerContainer}>
      {/* Background Pattern Overlay */}
      <div style={styles.patternOverlay} />

      {/* Content */}
      <div style={styles.content}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <span style={styles.logoPrimary}>CAMPUS</span>
          <span style={styles.logoSecondary}>XPERIENCE</span>
        </div>

        {/* Email */}
        <div style={styles.emailSection}>
          <p style={styles.emailText}>For more inquiries just send us your email</p>
          <div style={styles.emailInputContainer}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.emailInput}
            />
            <button style={styles.submitButton}>Submit</button>
          </div>
        </div>

        {/* Links */}
        <div style={styles.linksSection}>
          <a href="#" style={styles.link}>Event Discovery</a>
          <a href="#" style={styles.link}>Reservation and Ticketing</a>
          <a href="#" style={styles.link}>Event Reminder</a>
          <a href="#" style={styles.link}>About us</a>
        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>
          <p style={styles.copyrightText}>
            © 2024 CampusXperience. All rights reserved.
          </p>
          <div style={styles.socialIcons}>
            <Facebook style={styles.icon} />
            <Twitter style={styles.icon} />
            <Instagram style={styles.icon} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footerContainer: {
    position: 'relative',
    padding: '50px',
    backgroundColor: '#C21807',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: "'Product Sans', sans-serif",
    overflow: 'hidden',
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
    backgroundImage: `url("https://scontent-mnl1-2.xx.fbcdn.net/v/t1.15752-9/462641148_549689784342221_5622515365787508271_n.png?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeF6e41YksXPXPWwAwarDM4BsUvZgF0ZzrqxS9mAXRnOuqqH60VMC0PQIz1S7CnZYACkqhSrwnw1K1ybIXRIJj7Q&_nc_ohc=CThmZ6BAlzEQ7kNvgEluXRv&_nc_zt=23&_nc_ht=scontent-mnl1-2.xx&oh=03_Q7cD1QH_lzFRxDbhan0vPEIg4hzAGHLEfq_lOH_lgTpukRqNpQ&oe=67624094")`,
    backgroundRepeat: 'repeat',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    marginBottom: '20px',
  },
  logoPrimary: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoSecondary: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#181A2F',
  },
  emailSection: {
    margin: '20px 0',
  },
  emailText: {
    fontSize: '24px',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  emailInputContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  emailInput: {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    width: '250px',
    height: '40px',
  },
  submitButton: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#4E174E',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  linksSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '20px 0',
    flexWrap: 'wrap',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'opacity 0.2s ease',
  },
  footerBottom: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  copyrightText: {
    margin: 0,
    fontSize: '12px',
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  icon: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    color: '#ffffff',
    transition: 'opacity 0.2s ease',
  },
  '@media (max-width: 768px)': {
    footerContainer: {
      padding: '30px 20px',
    },
    emailInput: {
      width: '200px',
    },
    footerBottom: {
      flexDirection: 'column',
      textAlign: 'center',
    },
    linksSection: {
      flexDirection: 'column',
      gap: '15px',
    },
  },
};

// Add hover effects using CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .submitButton:hover {
    background-color: #3a1138;
  }
  
  .link:hover {
    opacity: 0.8;
  }
  
  .icon:hover {
    opacity: 0.8;
  }
`;
document.head.appendChild(styleSheet);

export default Footer;