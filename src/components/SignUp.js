import "./style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [favSport, setFavSport] = useState("");
  const [favFood, setFavFood] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Signup button clicked");
  
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.");
      return;
    }
  
    try {
    const response = await axios.post("http://localhost:5001/signup", {
      email,
      password,
      nickname,
      favSport,
      favFood
    });

    console.log(response.data); 
    navigate("/");
  } catch (err) {
    console.error("Signup failed:", err); 
    alert("your email already exits");
    setError("Signup failed. Please try again.");
  }
  };
  

  return (
    <form onSubmit={handleSignUp}>
      <h1>Sign Up</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create a password"
        required
      />
      {error && <p className="error-message">{error}</p>}

      <h4>Security Questions</h4>
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
      <button type="submit" className="btn">Sign Up</button>
      <a href="/">Back to Sign In</a>
    </form>
  );
};

export default SignUp;
