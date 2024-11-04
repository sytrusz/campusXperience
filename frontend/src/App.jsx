import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Appbar from './components/Appbar'
import Signup from './components/Signup'
import EventList from './components/Events' 
import Login from './components/Login' 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Set the Sign-In page as the initial route */}
                <Route path="/login" element={<Login />} />
                <Route path="/events" element={<EventList />} />
                {/* Add other routes here as needed */}
            </Routes>
        </Router>
    );
}

export default App;
