import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Provider.css";
import { useNavigate } from "react-router-dom";
import Reuseable from "../Reuseable/Reuseable";
import Card from "../Card/Card";

const Provider = () => {
  const { checkAuthAndNavigate } = Reuseable();
  const nav = useNavigate();

  useEffect(() => {
    checkAuthAndNavigate();
  }, []);

  const [sortOption, setSortOption] = useState("date");

  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginData"));
    const allEvent = JSON.parse(localStorage.getItem("eventData"));
    const filteredEvents = allEvent.filter(
      (event) => event.id === loginUser.id
    );
    setUserEvents(filteredEvents);
  }, []);

  console.log("userEvents", userEvents);

  return (
    <div className="Provider">
      <Navbar />
      <div className="addBtn">
        <button onClick={() => nav("/addEvent")}>Add Event +</button>
      </div>
      <div className="home-text">
        <div>
          <h1>Dubai, United Arab Emirates</h1>
        </div>
        <select name="sorting" onChange={(e) => setSortOption(e.target.value)}>
          <option value="price">Sort by: Price</option>
          <option value="duration">Sort by: Duration</option>
          <option value="date">Sort by: Date</option>
        </select>
      </div>
      <Card userEvents={userEvents} sortOption={sortOption} />
    </div>
  );
};

export default Provider;
