import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import Updateprofile from './components/Updateprofile';
import ProfileDetails from './components/ProfileDetails';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path='/update-profile' element={<Updateprofile/>}/>
        <Route path='/profile-details' element={<ProfileDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;