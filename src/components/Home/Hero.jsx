import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./home.css";
import Reuseable from "../Reuseable/Reuseable";

const Hero = () => {
  const [sortOption, setSortOption] = useState("date");

  const { checkAuthAndNavigate } = Reuseable();
  useEffect(() => {
    checkAuthAndNavigate();
  }, []);

  return (
    <div>
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

export default Hero;
