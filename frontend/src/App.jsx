import React from 'react';
import './App.css';
import CustomAppBar from './components/Appbar';
import './fonts.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReminderList from './components/Reminder';
import EventDashboard from './pages/EventDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <CustomAppBar />
            <Homepage />
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* Add other routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
