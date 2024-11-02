import './App.css';
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReminderApp from './components/Reminder';
import { Login } from '@mui/icons-material';
import Signup from './components/Signup';
function App() {
  return (
    <>
      {/* <Appbar/>
      <Signup/>
      <Login/> */}
      <ReminderApp />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Homepage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} /> */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
