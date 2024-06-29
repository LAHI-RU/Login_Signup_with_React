import axios from "axios";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("https://localhost:3000/auth/logout")
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      Home
      <button>
        <Link to="/dashboard"> Dashboard </Link>
      </button>
      <br /> <br />
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
};

export default Home;
