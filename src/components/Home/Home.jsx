import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate()
  const isLoggedIn = localStorage.getItem('setLoging')
  useEffect(()=>{
    if(!isLoggedIn){
      nav('/')
    }
  })
  return (
    <div >
      <Navbar />
      <Card />
    </div>
  );
};

export default Home;
