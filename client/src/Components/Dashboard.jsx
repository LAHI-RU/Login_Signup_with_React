import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3000/auth/verify")
      .then((res) => {
        if (res.data.status) {
          setUser(res.data.user || { username: "User" });
          setLoading(false);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/logout");
      if (res.data.status) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <p>Welcome to your protected dashboard, {user?.username || "User"}!</p>
        <p>This is a secure area that requires authentication to access.</p>
        
        <div className="home-buttons" style={{marginTop: '30px'}}>
          <Link to="/" className="home-btn">
            Home
          </Link>
          <button onClick={handleLogout} className="home-btn logout-btn">
            Logout
          </button>
        </div>

        <div style={{marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px'}}>
          <h3>User Information</h3>
          <p><strong>Username:</strong> {user?.username || "N/A"}</p>
          <p><strong>Status:</strong> Authenticated</p>
          <p><strong>Last Login:</strong> {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;