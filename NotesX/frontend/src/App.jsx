// add routes here
import { Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/adminLayout'
import ClientLayout from './layouts/clientLayout'
import Login from './pages/client/Login'
import SignUp from './pages/client/Signup'
import Home from './pages/client/Home'
import VerifyOtp from './pages/client/verifyOtp'
import Auth from './layouts/auth'
import LandingPage from './pages/landingPage'


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
          <Route path="*" element={<div>Error</div>} />
        </Route>
        <Route path='verifyOtp' element={<VerifyOtp />} />

      </Routes>
    </>
  )
}

export default App
