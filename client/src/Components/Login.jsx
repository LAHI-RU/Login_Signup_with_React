import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation
    if (!email || !password) {
      setMessage("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      
      if (response.data.status) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className={`auth-form ${loading ? 'loading' : ''}`} onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        
        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="auth-links">
          <Link to="/forgotPassword">Forgot Password?</Link>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;