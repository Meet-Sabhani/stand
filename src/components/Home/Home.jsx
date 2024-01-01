import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const nav = useNavigate();
  const isLoggedIn = localStorage.getItem("setLoging") === "true";

  useEffect(() => {
    if (!isLoggedIn) {
      nav("/");
    }
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="home-text">
        <div>
          <h1>Dubai, United Arab Emirate</h1>
          <p>we Found 324 amazing VENUSS</p>
        </div>
        <select name="sorting" id="">
          <option value="price">sort by : price</option>
          <option value="duration">sort by: duration</option>
        </select>
      </div>
      <Card />
    </div>
  );
};

export default Home;
