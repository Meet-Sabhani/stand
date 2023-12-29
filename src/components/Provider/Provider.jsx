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
  const nav = useNavigate()
  const isLoggedIn = localStorage.getItem('setLoging')
  console.log(isLoggedIn)
  useEffect(()=>{
    if(!isLoggedIn){
      nav('/')
    }
  })

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
      <h1>Add New Event</h1>
      <form>
        <input
          type="text"
          name="nameEvent"
          placeholder="Name of Event"
          onChange={handleChange}
        />
        <input
          type="text"
          name="ImgSRC"
          placeholder="Image SRC"
          onChange={handleChange}
        />
        <textarea
          name="description"
          cols="10"
          rows="4"
          placeholder="Description of event"
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />
        <input type="date" onChange={handleDateChange} />
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
