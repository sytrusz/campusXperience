import './App.css'
import Appbar from './components/Appbar'
import Signup from './components/Signup'
import Login from './components/Login'
import ReminderApp from './components/Reminder'
function App() {

  return (
    <>
      {/* <Appbar/>
      <Signup/>
      <Login/> */}
      <ReminderApp/>
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
