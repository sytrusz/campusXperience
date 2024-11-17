import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'

import CustomAppBar from './components/Appbar';
import EventDashboard from './pages/EventDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile'; // Import the Profile page component

// Component to conditionally render AppBar based on the current route
function AppWithAppBar() {
  const location = useLocation();

  // Check if the current route is login or signup
  const showAppBar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <>
      {showAppBar && <CustomAppBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/events" element={<EventDashboard />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
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
