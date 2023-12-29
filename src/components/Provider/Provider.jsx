import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import { toast } from "react-toastify";
import "./Provider.css";
import { useNavigate } from "react-router-dom";

const Provider = () => {
  const [eventData, setEventData] = useState({
    nameEvent: "",
    ImgSRC: "",
    description: "",
    price: "",
  });

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const nav = useNavigate();

  const isLoggedIn = localStorage.getItem("setLoging") === "true";
  console.log(isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      nav("/");
    }
  }, []);

  const handleClick = () => {
    if (!validateForm()) {
      toast.error("Please provide valid input for all fields");
      return;
    }

    const newFormData = { ...eventData, date, time };

    const existingDataJSON = localStorage.getItem("eventData");
    let existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    if (!Array.isArray(existingData)) {
      existingData = [existingData];
    }

    existingData.push(newFormData);
    localStorage.setItem("eventData", JSON.stringify(existingData));

    console.log("Form Data:", newFormData);
    toast.success("Event Added Successfully");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const validateForm = () => {
    return (
      eventData.nameEvent.trim() !== "" &&
      eventData.ImgSRC.trim() !== "" &&
      eventData.description.trim() !== "" &&
      eventData.price.trim() !== "" &&
      date.trim() !== "" &&
      time.trim() !== ""
    );
  };

  return (
    <div className="Provider">
      <Navbar />
      <form>
        <h2>Add New Event</h2>
        <label htmlFor="nameEvent">Event Name</label>
        <input type="text" name="nameEvent" onChange={handleChange} />
        <label htmlFor="ImgSRC">Image URL</label>
        <input type="text" name="ImgSRC" onChange={handleChange} />
        <label htmlFor="description">Description of event</label>
        <textarea
          name="description"
          cols="10"
          rows="1"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="price">price</label>
        <input type="number" name="price" onChange={handleChange} />
        <label htmlFor="date">Event date</label>
        <input type="date" onChange={handleDateChange} />
        <label htmlFor="date">Event Time</label>
        <input type="time" onChange={handleTimeChange} />
        <button type="button" onClick={handleClick}>
          Add Event
        </button>
      </form>
      <Card />
    </div>
  );
};

export default Provider;
