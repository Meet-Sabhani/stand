import React from "react";
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

  const showdata = () => {
    let navRight = document.querySelector(".nav-right");
    navRight.classList.toggle("showdata");

    const menu = document.querySelector(".menu");
    menu.classList.toggle("open");
  };

  return (
    <header className="navbar">
      <div className="nav-top">
        <h1>VENUSS</h1>
        <div className="menu" onClick={() => showdata()}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="nav-right">
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
      {/* <div className="navbar-bottom ">
        <div className="nav-b-left">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Dubai, United State"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </div>
        <div className="nav-b-right">
          <div>
            <p>Event Select</p>
            <select name="venue" id="venues">
              <option value="venue">venue</option>
            </select>
          </div>
          <div>
            <p>Select Category</p>
            <select name="venue" id="">
              <option value="venue">venue</option>
            </select>
          </div>
          <div>
            <p>Date</p>
            <input
              type="date"
              style={{ backgroundColor: "rgb(76, 76, 76)", color: "white" }}
            />
          </div>
          <div>
            <p>Duration</p>
            <select name="venue" id="">
              <option value="30">30 minit</option>
              <option value="1H">1 hour</option>
              <option value="2H">2 hour</option>
            </select>
          </div>
        </div>
      </div> */}
    </header>
  );
};

export default Navbar;
