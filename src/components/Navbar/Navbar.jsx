import React, { useState } from "react";
import "./Navbar.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const parsedData = JSON.parse(localStorage.getItem("loginData")) || "";

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) {
      navigate("/");
      toast.success("Logout successFully");
      localStorage.setItem("setLoging", false);
    }
  };

  const [isDataVisible, setIsDataVisible] = useState(false);

  const toggleData = () => {
    setIsDataVisible((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="nav-top">
        <h1>VENUSS</h1>
        <div
          className={`menu ${isDataVisible ? "open" : ""}`}
          onClick={() => toggleData()}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className={`nav-right ${isDataVisible ? "showdata" : ""}`}>
          {parsedData.userType === "user" ? (
            <Link to="/home">Home</Link>
          ) : (
            <Link to="/provider">Home</Link>
          )}
          <i className="fa-solid fa-envelope"></i>
          <i className="fa-solid fa-bell"></i>
          <h2 style={{ whiteSpace: "nowrap" }}>Hello, {parsedData.name}</h2>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
