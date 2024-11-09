import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Appbar from './components/Appbar'
import Signup from './components/Signup'
import Login from './components/Login'
import EventList from './components/Events' 
import ReminderApp from './components/Reminder'
import UserRecord from './components/UserRecord'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
