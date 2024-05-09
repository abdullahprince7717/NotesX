// add routes here
import { Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import ClientLayout from './layouts/ClientLayout'
import Login from './pages/client/Login'
import SignUp from './pages/client/Signup'
import Home from './pages/client/Home'
import VerifyOtp from './pages/client/VerifyOtp'
import Auth from './layouts/Auth'
import LandingPage from './pages/LandingPage'
import Reminders from './pages/client/Reminders'
import Notes from './pages/client/Notes'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={
          <Auth>
            <Login />
          </Auth>
        } />
        <Route path="signup" element={<SignUp />} />

        <Route path="admin" element={<AdminLayout />} >
          <Route path="*" element={<div>Error</div>} />
        </Route>

        <Route path="user" element={<ClientLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="notes" element={<Notes />} />
          <Route path="*" element={<div>Error</div>} />
        </Route>
        <Route path='verifyOtp' element={<VerifyOtp />} />

      </Routes>
    </>
  )
}

export default App
