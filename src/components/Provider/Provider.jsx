import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Provider.css";
import Hero from "../Home/Hero";
import AddEvent from "./AddEvent";
import Reuseable from "../Reuseable/Reuseable";
import { useNavigate } from "react-router-dom";

const Provider = () => {
  const { checkAuthAndNavigate } = Reuseable();
  useEffect(() => {
    checkAuthAndNavigate();
  }, []);
  const nav = useNavigate();
  const add = () => {
    nav("/addEvent");
  };

  return (
    <div className="Provider">
      <Navbar />
      <div className="addBtn">
        <button onClick={() => add()}>AddEvent +</button>
      </div>
      <Hero />
    </div>
  );
};

export default Provider;
