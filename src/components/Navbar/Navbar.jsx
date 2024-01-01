import React from "react";
import "./Navbar.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const getUser = localStorage.getItem("loginData");
  const parsedData = JSON.parse(getUser);

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) {
      navigate("/");
      toast.success("Logout successFully");
      localStorage.setItem("setLoging", null);
      localStorage.removeItem("loggedInUserId");
      localStorage.setItem("loginData", null);
    }
  };

  return (
    <header className="navbar">
      <div className="nav-top">
        <h1>VENUSS</h1>
        <div className="nav-right">
          <i className="fa-solid fa-envelope"></i>
          <i className="fa-solid fa-bell"></i>
          <h2>Welcome, {parsedData.name}</h2>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
      <div className="navbar-bottom ">
        <input type="text" />
        <div className="nav-b-right">
          <select name="venue" id="venues">
            <option value="venue">venue</option>
          </select>
          <select name="venue" id="">
            <option value="venue">venue</option>
          </select>
          <select name="venue" id="">
            <option value="venue">venue</option>
          </select>
          <select name="venue" id="">
            <option value="venue">venue</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
