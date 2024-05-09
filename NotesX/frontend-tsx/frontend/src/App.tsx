import { Routes, Route } from 'react-router-dom';

import AdminLayout from './common/layouts/AdminLayout';
import ClientLayout from './common/layouts/ClientLayout';
import Login from './common/pages/client/Login.page';
import SignUp from './common/pages/client/Signup.page';
import Home from './common/pages/client/Home.page';
import VerifyOtp from './common/pages/client/VerifyOtp.page';
import Auth from './common/layouts/Auth';
import LandingPage from './common/pages/LandingPage';
import Reminders from './common/pages/client/Reminders.page';
import Notes from './common/pages/client/Notes.page';
import Notifications from './common/pages/client/Notifications.page';
import Profile from './common/pages/client/Profile.page';
import Archives from './common/pages/client/Archives.page';
import Trash from './common/pages/client/Trash.page';
import Labels from './common/pages/client/Labels.page';
import EditLabel from './common/pages/client/EditLabel.page';
import TokenExpired from './common/pages/client/TokenExpired.page';

function App(): JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="login"
          element={
            <Auth>
              <Login />
            </Auth>
          }
        />
        <Route path="signup" element={
          <Auth>
            <SignUp />
          </Auth>
        } />

        <Route path="admin" element={<AdminLayout />}>
          <Route path="*" element={<div>Error</div>} />
        </Route>

        <Route path="user" element={<ClientLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="reminders" element={<Reminders />} />
          <Route path="notes" element={<Notes />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="labels" element={<Labels />} />
          <Route path="profile" element={<Profile />} />
          <Route path="archives" element={<Archives />} />
          <Route path="trash" element={<Trash />} />
          <Route path="editlabel" element={<EditLabel />} />
          <Route path="token-expired" element={<TokenExpired />} />
          <Route path="*" element={<div>Error</div>} />
        </Route>

        <Route path="verifyOtp" element={<VerifyOtp />} />
        <Route path="*" element={<div>Error 404, page not found</div>} />

      </Routes>
    </>
  );
}

export default App;
