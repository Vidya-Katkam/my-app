import './pstyle.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('emailId');
    const fullName = (localStorage.getItem('fullname')?localStorage.getItem('fullname'):'Loading full name...');
    const phoneNo = (localStorage.getItem('phonenumber')?localStorage.getItem('phonenumber'):"Loading phone number...");
    if (userEmail|| fullName || phoneNo) {
      setEmail(userEmail);
      setFullname(fullName);
      setPhone(phoneNo);
      axios.post('http://localhost:5001/getUser', { email: userEmail })
        .then((res) => {
          console.log("Fetched user:", res.data); 
          const data = res.data;
          setFullname(data.fullname);
          setPhone(data.phonenumber);
          localStorage.setItem('full_name', data.fullname);
          localStorage.setItem('phone_number', data.phonenumber);
        })
        .catch((err) => {
          console.error('Error fetching user:', err);
        });
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <Link to="/" className="logout-link" onClick={() => localStorage.clear()}>Log out</Link>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {email ? email.charAt(0).toUpperCase() : 'U'}
        </div>

        <div className="profile-info">
          <p>{email || 'Loading email...'}</p>
          <p>{fullname || 'Loading fullname...'}</p>
          <p>{phone || 'Loading phonenumber...'}</p>
        </div>
      </div>
        
      <div className="profile-actions">
        <Link to="/update-profile" className="update-profile-btn">
          Update Profile
        </Link> 
      </div>
      <div className="profile-actions">
        <Link to="/profile-details" className="update-profile-btn">  View details</Link>
      </div>
    </div>
  );
};

export default Profile;
