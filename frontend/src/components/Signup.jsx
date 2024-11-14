import React, { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [added, setAdded] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Name validation: no numbers, capitalize each word
    const nameRegex = /^[A-Za-z\s]+$/;
    const capitalizeName = name.replace(/\b\w/g, (char) => char.toUpperCase());
    if (!nameRegex.test(name)) {
      setValidationError('Name must only contain letters and spaces.');
      setAdded(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address.');
      setAdded(false);
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setValidationError('Password must be at least 8 characters with letters and numbers.');
      setAdded(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/user/check-email?email=${encodeURIComponent(email)}`);
      const isEmailUnique = await response.json();

      if (!isEmailUnique) {
        setValidationError('Email already exists. Please use a different email.');
        return;
      }

      const student = { name: capitalizeName, email, password };
      await fetch("http://localhost:8080/user/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });
      setAdded(true);
      setValidationError('');
    } catch (error) {
      setValidationError('An error occurred. Please try again.');
    }
  };

  // Common styles for form elements
  const formFieldStyles = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const formContainerStyles = {
    width: '100%',
    maxWidth: '400px',
    padding: '0 20px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left side - Hero Image */}
      <div style={{
        display: window.innerWidth > 768 ? 'block' : 'none',
        width: '40%',
        backgroundImage: 'url(/src/assets/images/side_frame_signup.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>

      {/* Right side - Sign Up Form */}
      <div style={{
        width: window.innerWidth > 768 ? '90%' : '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Product Sans, sans-serif'
      }}>
        <div style={formContainerStyles}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Sign up</h1>

          <p style={{
            textAlign: 'center',
            fontSize: '0.975rem'
          }}>
            Already have an account?{' '}
            <a href="/login" style={{
              color: '#dc2626',
              fontWeight: "bold",
              textDecoration: 'none'
            }}>
              Sign In
            </a>
          </p>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                marginBottom: '0.5rem'
              }}>Username</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={formFieldStyles}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                marginBottom: '0.5rem'
              }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={formFieldStyles}
                required
              />
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                marginBottom: '0.5rem'
              }}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={formFieldStyles}
                required
              />
            </div>

            {validationError && (
              <div style={{
                color: '#dc2626',
                fontSize: '0.875rem'
              }}>{validationError}</div>
            )}

            <button
              type="submit"
              style={{
                ...formFieldStyles,
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Sign Up
            </button>

            {added && (
              <div style={{
                color: '#16a34a',
                fontSize: '0.875rem',
                textAlign: 'center'
              }}>
                Account created successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;