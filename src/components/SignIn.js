import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/signin", {
        email,
        password,
      });
      
      const { fullname, email: userEmail, phone } = res.data;

      localStorage.setItem("fullname", fullname);
      localStorage.setItem("emailId", userEmail);
      localStorage.setItem("phonenumber", phone);

      navigate("/profile");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <>
      <form onSubmit={handleSignIn}>
        <h2>Sign In</h2>
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
          placeholder="Enter your password"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign In</button>
      

      <div style={{ marginTop: "10px" }}>
      <Link to="/signup">Sign Up</Link>
        <Link to="/forgot-password">Forgot Password?</Link> 
      </div>
      </form>
    </>
  );
};

export default SignIn;
