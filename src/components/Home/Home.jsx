import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Reuseable from "../Reuseable/Reuseable";
import Card from "../Card/Card";

const Home = () => {
  const nav = useNavigate();

  const isLoggedIn = localStorage.getItem("setLoging") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      nav("/");
    }
  }, [isLoggedIn, nav]);

  const [sortOption, setSortOption] = useState("date");

  const { checkAuthAndNavigate } = Reuseable();
  useEffect(() => {
    checkAuthAndNavigate();
  }, []);

  return (
    <div className="home">
      <Navbar />

      <div className="home-text">
        <div>
          <h1>Dubai, United Arab Emirate</h1>
          <p>we Found 324 amazing VENUS</p>
        </div>
        <select name="sorting" onChange={(e) => setSortOption(e.target.value)}>
          <option value="price">sort by : price</option>
          <option value="duration">sort by : duration</option>
          <option value="date">sort by : date</option>
        </select>
      </div>
      <Card sortOption={sortOption} />
    </div>
  );
};

export default Home;
