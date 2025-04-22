import "./style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [fullname, setFullName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailId");

    if (storedEmail) {
      setEmailId(storedEmail);

      axios
        .post("http://localhost:5001/api/getUser", { email: storedEmail })
        .then((res) => {
          const user = res.data;
          setFullName(user.full_name || "");
          setPhoneNumber(user.phone_number || "");
        })
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5001/api/updateUser", {
        email: emailId,
        fullname,
        phonenumber,
      });


      localStorage.setItem("fullname", fullname);
      localStorage.setItem("phonenumber", phonenumber);

      navigate("/profile"); 
      alert("Updated Successfully")
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Profile</h1>

      <label htmlFor="fullname">Full Name</label>
      <input
        type="text"
        id="fullname"
        value={fullname}
        onChange={(e) => setFullName(e.target.value)}
        required
      /><br/>

      <label htmlFor="emailId">Email</label><br/>
      <input
        type="email"
        id="emailId"
        value={emailId}
      /><br/>

      <label htmlFor="phonenumber">Phone Number</label>
      <input
        type="tel"
        id="phonenumber"
        value={phonenumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        pattern="[0-9]{10}"
        required
      /><br/>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfile;
