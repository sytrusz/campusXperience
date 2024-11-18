import React from 'react';
import patternImage from '../assets/Pattern.png';
import facebookIcon from '../assets/images/facebook+icon.png';
import twitterIcon from '../assets/images/twitter+icon.png';
import instagramIcon from '../assets/images/instagram+icon.png';

const Footer = () => {
  return (
    <div style={styles.footerContainer}>
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
            type="text"
            placeholder="Enter your email"
            style={styles.emailInput}
          />
          <button style={styles.submitButton}>Submit</button>
        </div>
      </div>

      {/* Links */}
      <div style={styles.linksSection}>
        <a href="#" style={styles.link}>
          Event Discovery
        </a>
        <a href="#" style={styles.link}>
          Reservation and Ticketing
        </a>
        <a href="#" style={styles.link}>
          Event Reminder
        </a>
        <a href="#" style={styles.link}>
          About us
        </a>
      </div>

      {/* Footer Bottom */}
      <div style={styles.footerBottom}>
        <p style={styles.copyrightText}>
          © 2024 CampusXperience. All rights reserved.
        </p>
        <div style={styles.socialIcons}>
          <img src={facebookIcon} alt="Facebook" style={styles.icon} />
          <img src={twitterIcon} alt="Twitter" style={styles.icon} />
          <img src={instagramIcon} alt="Instagram" style={styles.icon} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  footerContainer: {
    margin: '0',
    padding: '50px',
    backgroundColor: '#C21807',
    backgroundImage: `url(${patternImage})`,
    backgroundSize: 'fill',
    backgroundRepeat: 'repeat',
    backgroundBlendMode: 'overlay',
    color: '#ffffff',
    textAlign: 'center',
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
  },
  linksSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '20px 0',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '14px',
  },
  footerBottom: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  copyrightText: {
    marginBottom: '10px',
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
  },
};

export default Footer;
