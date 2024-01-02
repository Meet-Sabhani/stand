import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Hero from "./Hero";

const Home = () => {
  const nav = useNavigate();

  const isLoggedIn = localStorage.getItem("setLoging") === "true";
  useEffect(() => {
    if (!isLoggedIn) {
      nav("/");
    }
  }, [isLoggedIn, nav]);

  return (
    <div className="home">
      <Navbar />
      <Hero/>
     
    </div>
  );
};

export default Home;
