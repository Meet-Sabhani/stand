import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Reuseable from "../Reuseable/Reuseable";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    nameEvent: "",
    ImgSRC: "",
    description: "",
    price: "",
  });

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const nav = useNavigate();

  const { checkAuthAndNavigate } = Reuseable();
  useEffect(() => {
    checkAuthAndNavigate();
  }, []);

  const handleClick = () => {
    if (!validateForm()) {
      toast.error("Please provide valid input for all fields");
      return;
    }

    const newFormData = { ...eventData, date, startTime, endTime };

    const existingDataJSON = localStorage.getItem("eventData");
    let existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    if (!Array.isArray(existingData)) {
      existingData = [existingData];
    }

    existingData.push(newFormData);
    localStorage.setItem("eventData", JSON.stringify(existingData));
    console.log("Form Data:", newFormData);
    toast.success("Event Added Successfully");
    nav("/provider");
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const validateForm = () => {
    const isPriceValid =
      /^\d+(\.\d{1,2})?$/.test(eventData.price) &&
      parseFloat(eventData.price) >= 0;
    return (
      eventData.nameEvent.trim() !== "" &&
      eventData.ImgSRC.trim() !== "" &&
      eventData.description.trim() !== "" &&
      isPriceValid &&
      date.trim() !== "" &&
      startTime.trim() !== "" &&
      endTime.trim() !== ""
    );
  };
  return (
    <div>
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
          rows="2"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" onChange={handleChange} />
        <label htmlFor="date">Event date</label>
        <input type="date" onChange={handleDateChange} />
        <label htmlFor="startTime">Start Time</label>
        <input type="time" onChange={handleTimeChange} />
        <label htmlFor="endTime">End Time</label>
        <input type="time" onChange={handleEndTimeChange} />
        <button type="button" onClick={handleClick}>
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
