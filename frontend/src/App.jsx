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
    <>
      <Appbar/>

      <ReminderApp/>
      <UserRecord/>
      <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Homepage />} /> */}
                {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} /> 
                  <Route path="/events" element={<EventList />} />*/}
                <Route path="/signup" element={<Signup/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </BrowserRouter>
    </>
  )

}

export default App;
