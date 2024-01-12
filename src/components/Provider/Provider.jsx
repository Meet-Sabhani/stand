import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Provider.css";
import { Link, useNavigate } from "react-router-dom";
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

    if (allEvent && Array.isArray(allEvent) && allEvent.length > 0) {
      const filteredEvents = allEvent.filter(
        (event) => event.providerId === loginUser.id
      );
      setUserEvents(filteredEvents);
    } else {
      setUserEvents([]);
    }
  }, []);

  console.log("userEvents", userEvents);

  return (
    <div className="Provider">
      <Navbar />
      <div className="addBtn">
        <button onClick={() => nav("/addEvent")}>Add Event +</button>
        <Link to="/bookings">See Bookings</Link>
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
