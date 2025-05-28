import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Check if user is authenticated
    axios.get("http://localhost:3000/auth/verify")
      .then((res) => {
        if (res.data.status) {
          setUser(res.data.user || { username: "User" });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/logout");
      if (res.data.status) {
        setUser(null);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="dashboard-card">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1>Welcome to AuthApp</h1>
      <p>
        A modern authentication system built with MERN stack. 
        {user ? ` Hello, ${user.username}!` : " Please sign in to continue."}
      </p>

      <div className="home-buttons">
        {user ? (
          <>
            <Link to="/dashboard" className="home-btn">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="home-btn logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="home-btn">
              Sign In
            </Link>
            <Link to="/signup" className="home-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {user && (
        <div className="dashboard-card" style={{marginTop: '40px'}}>
          <h3>Quick Actions</h3>
          <p>You are successfully authenticated and can access protected resources.</p>
        </div>
      )}
    </div>
  );
};

export default Home;