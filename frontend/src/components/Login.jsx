import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [name, setName] = useState('');
  const [great, setGreat] = useState(false);
  const navigate = useNavigate();
    
    try {
      // Attempt admin login first
      let response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const adminData = await response.json();
        localStorage.setItem("jwtToken", adminData.token);
        localStorage.setItem("role", adminData.role);
        localStorage.setItem("currentUser", JSON.stringify({
          email,
          name: adminData.name,
          role: adminData.role
        }));
        setName(adminData.name);
        setGreat(true);
        navigate("/admin");
        return;
      }

      // Attempt user login if admin login fails
      response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const userData = await response.json();
      localStorage.setItem("jwtToken", userData.token);
      localStorage.setItem("role", userData.role || "User");
      localStorage.setItem("currentUser", JSON.stringify({
        email,
        name: userData.name,
        role: userData.role || "User"
      }));
      setName(userData.name);
      setGreat(true);

      console.log("User name from response:", userData.name);
      navigate("/");


    } catch (err) {
      console.error("Error signing in:", err);
      setValidationError(err.message || "Invalid email or password");
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
        backgroundImage: 'url(/src/assets/images/side_frame.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}></div>

      {/* Right side - Login Form */}
      <div style={{
        width: window.innerWidth > 768 ? '90%' : '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Product Sans, sans-serif'
      }}>
        <div style={formContainerStyles}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Sign in</h1>

          <p style={{
            textAlign: 'center',
            fontSize: '0.975rem'
          }}>
            Don't have an account?{' '}
            <a href="/signup" style={{
              color: '#dc2626',
              fontWeight: "bold",
              textDecoration: 'none'
            }}>
              Sign Up
            </a>
          </p>

          <form onSubmit={handleSignIn} style={{
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
                marginTop: '1rem',
                fontWeight: "bold"
              }}
            >
              Sign In
            </button>

            {great && (
              <div style={{
                color: '#16a34a',
                fontSize: '0.875rem',
                textAlign: 'center'
              }}>
                Welcome back, {name}!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;