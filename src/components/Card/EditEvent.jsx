import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import calculateTimeSlots from "../../utils/calculateTimeSlots";
import validateForm from "../../utils/validateForm";
import validateTime from "../../utils/validateTime";

const EditEvent = () => {
  const { id } = useParams();
  const productId = String(id);

  const event = JSON.parse(localStorage.getItem("eventData")) || [];
  const editEventInfo = event.find((item) => item.id === parseInt(productId));

  const [editFormData, setEditFormData] = useState({
    nameEvent: "",
    ImgSRC: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    setEditFormData(editEventInfo);
  });
  // useEffect(() => {
  //   if (editEventInfo && !areObjectsEqual(editFormData, editEventInfo)) {
  //     setEditFormData((prevState) => ({
  //       ...prevState,
  //       ...editEventInfo,
  //     }));
  //   }
  // }, [editEventInfo, editFormData]);

  // useEffect(() => {
  //   if (editEventInfo && !areObjectsEqual(editFormData, editEventInfo)) {
  //     setEditFormData((prevState) => ({
  //       ...prevState,
  //       ...editEventInfo,
  //     }));
  //   }
  // }, [editEventInfo, editFormData]);

  const areObjectsEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getCurrentTime = () => {
    const today = new Date();
    return today.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserID = () => {
    const loginData = localStorage.getItem("loginData");
    return loginData ? JSON.parse(loginData).id : null;
  };

  const handleClick = (date, startTime, endTime, selectedDuration) => {
    if (!validateForm(editFormData, date, startTime, endTime)) {
      toast.error("Please provide valid input for all fields");
      return;
    }

    if (!validateTime(date, startTime, endTime, selectedDuration)) {
      return;
    }

    // const updatedEvents = event.map((item) =>
    //   item.id === parseInt(productId) ? { ...item, ...editFormData } : item
    // );

    // localStorage.setItem("eventData", JSON.stringify(updatedEvents));

    toast.success("Event Edited Successfully");
    navigate("/provider");
  };

  const [selectedDuration, setSelectedDuration] = useState("30");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("handleChange called");
    const { name, value } = e.target;
    setEditFormData((prevState) => ({
      ...prevState,
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
        <h2>Edit Event</h2>
        <label htmlFor="nameEvent">Event Name</label>
        <input
          type="text"
          id="nameEvent"
          name="nameEvent"
          onChange={handleChange}
          value={editFormData.nameEvent}
        />

        <label htmlFor="ImgSRC">Image URL</label>
        <input
          type="text"
          id="ImgSRC"
          name="ImgSRC"
          value={editFormData.ImgSRC}
          onChange={handleChange}
        />

        <label htmlFor="description">Description of event</label>
        <textarea
          id="description"
          name="description"
          cols="1"
          rows="1"
          onChange={handleChange}
          value={editFormData.description}
        ></textarea>

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={editFormData.price}
          name="price"
          onChange={handleChange}
        />

        <label htmlFor="date">Event date</label>
        <input
          type="date"
          id="date"
          onChange={handleDateChange}
          value={editFormData.date}
          min={getCurrentDate()}
        />

        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          onChange={handleTimeChange}
          value={editFormData.startTime}
          min={getCurrentTime()}
        />

        <label htmlFor="endTime">End Time</label>
        <input
          id="endTime"
          type="time"
          value={editFormData.endTime}
          onChange={handleEndTimeChange}
          min={getCurrentTime()}
        />

        <label htmlFor="duration">Select duration of one event</label>
        <select
          name="duration"
          id="duration"
          value={editFormData.duration}
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
            handleClick(date, startTime, endTime, selectedDuration)
          }
        >
          Save Changes
        </button>
      </form>
    </>
  );
};

export default EditEvent;
