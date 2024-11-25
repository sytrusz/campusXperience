import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import CustomAppBar from './components/Appbar';
import EventDashboard from './pages/EventDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile'; // Import the Profile page component
import Footer from './components/Footer';

// Component to conditionally render AppBar and Footer
function AppWithAppBar() {
  const location = useLocation();

  // Check if the current route is admin
  const isAdminRoute = location.pathname === '/admin';
  const showAppBar = !['/login', '/signup', '/admin'].includes(location.pathname);

  return (
    <>
      {showAppBar && <CustomAppBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/events" element={<EventDashboard />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin route */}
      </Routes>
      {!isAdminRoute && <Footer />} {/* Exclude Footer in Admin route */}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWithAppBar />
    </Router>
  );
}

export default App;
