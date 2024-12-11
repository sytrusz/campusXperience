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
import FetchReservations from './pages/RsvpTicket';
import Profile from './pages/Profile'; // Import the Profile page component
import Footer from './components/Footer';

// Component to conditionally render AppBar and Footer
function AppWithAppBar() {
  const location = useLocation();

  // Define routes where the AppBar and Footer should not appear
  const hideFooterRoutes = ['/login', '/signup', '/admin'];
  const showAppBar = !hideFooterRoutes.includes(location.pathname);
  const showFooter = !['/login', '/signup', '/admin'].includes(location.pathname);

  return (
    <>
      {showAppBar && <CustomAppBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/events" element={<EventDashboard />} />
        <Route path="/reservation" element={<FetchReservations />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} /> {/* Admin route */}
      </Routes>
      {showFooter && <Footer />} {/* Exclude Footer in specific routes */}
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
