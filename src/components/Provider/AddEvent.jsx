import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Reuseable from "../Reuseable/Reuseable";
import Navbar from "../Navbar/Navbar";
import "./Provider.css";
import calculateTimeSlots from "../../utils/calculateTimeSlots";
import validateTime from "../../utils/validateTime";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    nameEvent: "",
    ImgSRC: "",
    description: "",
    price: "",
  });

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const getCurrentTime = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const validateForm = (eventData, date, startTime, endTime) => {
    const isPriceValid =
      /^\d+(\.\d{1,2})?$/.test(eventData.price) &&
      parseFloat(eventData.price) >= 0;

    return (
      eventData &&
      eventData.nameEvent &&
      eventData.ImgSRC &&
      eventData.description &&
      isPriceValid &&
      eventData.nameEvent.trim() !== "" &&
      eventData.ImgSRC.trim() !== "" &&
      eventData.description.trim() !== "" &&
      date.trim() !== "" &&
      startTime.trim() !== "" &&
      endTime.trim() !== ""
    );
  };

  const getUserID = () => {
    const loginData = localStorage.getItem("loginData");
    return loginData ? JSON.parse(loginData).id : null;
  };

  const handleClick = (
    eventData,
    date,
    startTime,
    endTime,
    selectedDuration
  ) => {
    if (!validateForm(eventData, date, startTime, endTime)) {
      toast.error("Please provide valid input for all fields");
      return;
    }

    if (!validateTime(date, startTime, endTime, selectedDuration)) {
      return;
    }

    const today = getCurrentDate();
    const currentTime = getCurrentTime();

    if (date === today && startTime <= currentTime) {
      toast.error("Start time must be later than the current time");
      return;
    }

    const eventIdCounter =
      parseInt(localStorage.getItem("eventIdCounter")) || 1;

    console.log("startTime", startTime);
    console.log("endTime", endTime);
    console.log("selectedDuration", selectedDuration);

    const newFormData = {
      ...eventData,
      date,
      startTime,
      endTime,
      duration: selectedDuration,
      providerId: getUserID(),
      id: eventIdCounter,
      timeSlot: calculateTimeSlots(
        parseTime(startTime),
        parseTime(endTime),
        +selectedDuration
      ),
    };

    function parseTime(timeString) {
      const [hours, minutes] = timeString.split(":").map(Number);
      return hours * 60 + minutes;
    }

    const existingDataJSON = localStorage.getItem("eventData");
    const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    existingData.push(newFormData);
    localStorage.setItem("eventData", JSON.stringify(existingData));

    toast.success("Event Added Successfully");
    navigate("/provider");

    localStorage.setItem("eventIdCounter", String(eventIdCounter + 1));
  };

  const [selectedDuration, setSelectedDuration] = useState("30");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();
  console.log("endTime", endTime);
  console.log("startTime", startTime);
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

  return (
    <>
      <Navbar />
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
          min={new Date().toISOString().split("T")[0]}
        />

        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          onChange={handleTimeChange}
          min={new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />

        <label htmlFor="endTime">End Time</label>
        <input
          id="endTime"
          type="time"
          onChange={handleEndTimeChange}
          min={new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />

        <label htmlFor="duration">Select duration of one event</label>
        <select
          name="duration"
          id="duration"
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
        >
          <option value="30">30 min</option>
          <option value="60">1 hour</option>
          <option value="90">1 hour 30 min</option>
          <option value="120">2 hour </option>
        </select>

        <button
          type="button"
          onClick={() =>
            handleClick(eventData, date, startTime, endTime, selectedDuration)
          }
        >
          Add Event
        </button>
      </form>
    </>
  );
};

export default AddEvent;
