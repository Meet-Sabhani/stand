import React from "react";
import "./Navbar.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) {
      navigate("/");
      toast.success("Logout successFully");
      localStorage.setItem("setLoging", false);
    }
  };
  return (
    <div className="navbar">
      <h1>VENUSS</h1>
      <div className="nav-right">
        <i className="fa-solid fa-envelope"></i>
        <i className="fa-solid fa-bell"></i>
        <h2>Welcome</h2>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
