import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import CustomAppBar from './components/Appbar';
import EventDashboard from './pages/EventDashboard';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Homepage from './pages/Homepage';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import FetchReservations from './pages/RsvpTicket';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage'; // Create this page

// Protected Admin Route Component
const ProtectedAdminRoute = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isAdmin = currentUser && currentUser.role === 'Admin';

  return isAdmin ? <AdminDashboard /> : <Navigate to="/404" replace />;
};

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
        
        {/* Protected Admin Route */}
        <Route path="/admin" element={<ProtectedAdminRoute />} />
        
        {/* 404 Page */}
        <Route path="/404" element={<NotFoundPage />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
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