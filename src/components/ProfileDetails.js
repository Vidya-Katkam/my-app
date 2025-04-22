import "./style.css";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProfileDetails=() => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [food, setFood] = useState('');
    const [nickname, setNickname] = useState('');
    const [sport, setSport] = useState('');
    useEffect(() => {
        const userEmail = localStorage.getItem('emailId');
        const fullName = localStorage.getItem('fullname');
        const phoneNo = localStorage.getItem('phonenumber');
        if (userEmail && fullName && phoneNo) {
          setFullname(fullName);
          setEmail(userEmail);
          setPhone(phoneNo);
          //axios.post('http://localhost:5001/api/getUser', { email: userEmail })
          axios.post('https://user-profile-backend.onrender.com/api/getUser', { email: userEmail })

            .then((res) => {
              const data = res.data;
              setFood(data.favFood);
              setSport(data.favSport);
              setNickname(data.nickname);
            })
            .catch((err) => {
              console.error('Error fetching user:', err);
            });
        };
        
      }, []);
    return ( 
        <form>
        <div className="profile-header">
            <h1>  </h1>
                <Link to="/" className="logout-link" onClick={() => localStorage.clear()}>Log out</Link>
        </div>
        <h1>Profile Details</h1>
        <div className='profile-details'>
        <label for = "fname" >Full name : </label>
        <input type="text" id="fname" value={fullname} /><br/>

        <label for = "emailid" >Email Id :</label>
        <input type="email" id="emailId" value={email} /><br/>

        <label for = "phoneno" >Phone No :</label>
        <input type="tel" id="phoneno" value={phone} /><br/>

        <label for = "nn" >Nick name :</label>
        <input type="text" id="nn" value={nickname} /><br/>

        <label for = "food" >Favorite Food :</label>
        <input type="text" id="food" value={food} /><br/>

        <label for = "sports" >Favorite sport :</label>
        <input type="text" id="sports" value={sport} /><br/>

        <a href='/profile'>Back to profile page</a>

        </div>
        </form>
    
    );
};
export default ProfileDetails;