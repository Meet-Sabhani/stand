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
  const navigate = useNavigate();

  const { checkAuthAndNavigate } = Reuseable();

  const storedData = localStorage.getItem("loginData");
  const storedFormData = JSON.parse(storedData);
  const userType = storedFormData ? storedFormData.userType : null;

  const [eventIdCounter, setEventIdCounter] = useState(1);

  useEffect(() => {
    const storedEventIdCounter = localStorage.getItem("eventIdCounter");
    if (storedEventIdCounter) {
      setEventIdCounter(parseInt(storedEventIdCounter));
    }
    checkAuthAndNavigate();
    if (userType === "user") {
      navigate("/home");
    }
  }, []);

  const getUserID = () => {
    const loginData = localStorage.getItem("loginData");
    return loginData ? JSON.parse(loginData).id : null;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleClick = () => {
    if (!validateForm()) {
      toast.error("Please provide valid input for all fields");
      return;
    }

    const existingNameJSON = localStorage.getItem("eventData");
    let existingNames = existingNameJSON ? JSON.parse(existingNameJSON) : [];

    const isNameExists = existingNames.some(
      (user) => user.nameEvent === eventData.nameEvent
    );

    if (isNameExists) {
      toast.error("Event with the same name already exists");
      return;
    }

    const newFormData = {
      ...eventData,
      date,
      startTime,
      endTime,
      providerId: getUserID(),
      id: eventIdCounter,
    };

    const existingDataJSON = localStorage.getItem("eventData");
    const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    existingData.push(newFormData);
    localStorage.setItem("eventData", JSON.stringify(existingData));
    console.log("Form Data:", newFormData);
    toast.success("Event Added Successfully");
    navigate("/provider");

    setEventIdCounter((prevEventIdCounter) => prevEventIdCounter + 1);
    localStorage.setItem("eventIdCounter", String(eventIdCounter + 1));
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
    <>
      <form className="AddEvent">
        <h2>Add New Event</h2>
        <label htmlFor="nameEvent">Event Name</label>
        <input
          type="text"
          id="nameEvent"
          name="nameEvent"
          onChange={handleChange}
        />
        <label htmlFor="ImgSRC">Image URL</label>
        <input type="text" id="ImgSRC" name="ImgSRC" onChange={handleChange} />
        <label htmlFor="description">Description of event</label>
        <textarea
          id="description"
          name="description"
          cols="1"
          rows="1"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" onChange={handleChange} />
        <label htmlFor="date">Event date</label>
        <input
          type="date"
          id="date"
          onChange={handleDateChange}
          min={getCurrentDate()}
        />
        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          onChange={handleTimeChange}
          min={getCurrentTime()}
        />
        <label htmlFor="endTime">End Time</label>
        <input
          id="endTime"
          type="time"
          onChange={handleEndTimeChange}
          min={getCurrentTime()}
        />
        <button type="button" onClick={handleClick}>
          Add Event
        </button>
      </form>
    </>
  );
};

export default AddEvent;
