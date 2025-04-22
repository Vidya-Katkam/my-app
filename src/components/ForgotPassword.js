import "./style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [favSport, setFavSport] = useState("");
  const [favFood, setFavFood] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleReset = async (e) => {
    e.preventDefault();
  
    if (!validatePassword(newPassword)) {
      setError("Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5001/api/resetPassword", {
        email,
        nickname,
        favSport,
        favFood,
        newPassword,
      });
  
      alert("Password reset successful!");
      navigate("/");
    } catch (err) {
      console.error("Reset failed:", err);
      setError("Something went wrong. Please check your answers.");
    }
  };
  


  return (
        <form onSubmit={handleReset}>
          
        <h1 >Reset Your Password</h1>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              required
            />
            <input
              type="text"
              value={favSport}
              onChange={(e) => setFavSport(e.target.value)}
              placeholder="Enter your favorite sport"
              required
            />
            <input
              type="text"
              value={favFood}
              onChange={(e) => setFavFood(e.target.value)}
              placeholder="Enter your favorite food"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">Reset Password</button>
            <a href="/">Back to Sign In</a>
          
        </form>
    
  );
};

export default ForgotPassword;