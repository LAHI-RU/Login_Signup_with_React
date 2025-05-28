import React, { useState } from "react";
import "../App.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email) {
      setMessage("Please enter your email address");
      setLoading(false);
      return;
    }

    try {
      const response = await Axios.post("http://localhost:3000/auth/forgot-password", {
        email,
      });
      
      if (response.data.status) {
        setMessage("Password reset link sent to your email!");
        setEmailSent(true);
      } else {
        setMessage(response.data.message || "Failed to send reset email");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Check Your Email</h2>
          <div className="alert alert-success">
            <p>We've sent a password reset link to <strong>{email}</strong></p>
            <p>Please check your email and click the link to reset your password.</p>
            <p><small>The link will expire in 5 minutes.</small></p>
          </div>
          <div className="auth-links">
            <Link to="/login">Back to Login</Link>
            <p>
              <button 
                type="button" 
                onClick={() => {setEmailSent(false); setMessage("");}} 
                style={{background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', textDecoration: 'underline'}}
              >
                Resend Email
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form className={`auth-form ${loading ? 'loading' : ''}`} onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <p style={{textAlign: 'center', marginBottom: '30px', color: '#666'}}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        {message && (
          <div className={`alert ${message.includes('sent') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
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

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;