import './App.css'
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Homepage from './pages/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';


function App() {

  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path='/login' element={<LoginPage/>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
