import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";
import { toast } from "react-toastify";

const DetailCard = () => {
  const { productId } = useParams();
  const event = JSON.parse(localStorage.getItem("eventData"));
  const matchingEvent = event.find((item) => item.id === parseInt(productId));

  const currentUserInfo = JSON.parse(localStorage?.getItem("loginData")) || {};
  const userType = currentUserInfo.userType;

  const [selectedSlot, setSelectedSlot] = useState([]);

  const Selected_slots = (e) => {
    setSelectedSlot((p) => (p === e ? "" : e));

    localStorage.setItem("selectedSlot", JSON.stringify(e));
  };

  console.log("selectedSlot", selectedSlot);

  const buySlot = () => {
    let currentSlot = selectedSlot;

    const timeSlotsArray = matchingEvent.timeSlot;

    const index = timeSlotsArray.findIndex((t) => t.time === currentSlot);
    console.log("index", index);

    if (index !== -1 && !timeSlotsArray[index].booked) {
      timeSlotsArray[index] = { ...timeSlotsArray[index], booked: true };

      const updatedMatchingEvent = {
        ...matchingEvent,
        timeSlot: timeSlotsArray,
      };

      localStorage.setItem(
        "eventData",
        JSON.stringify(
          event.map((e) =>
            e.id === matchingEvent.id ? updatedMatchingEvent : e
          )
        )
      );

      const existingBookingInfoString = localStorage.getItem("bookingInfo");

      const existingBookingInfo = existingBookingInfoString
        ? JSON.parse(existingBookingInfoString)
        : [];

      const newBookingObject = {
        user: currentUserInfo,
        eventInfo: matchingEvent,
        slot: matchingEvent.timeSlot[index].time,
      };

      existingBookingInfo.push(newBookingObject);
      const updatedBookingInfoString = JSON.stringify(existingBookingInfo);

      localStorage.setItem("bookingInfo", updatedBookingInfoString);
      localStorage.setItem("selectedSlot", "");
      toast.success("Event booked successfully");
    } else {
      toast.error(`Slot ${selectedSlot} is already booked`);
    }
  };

  return (
    <div className="eventCard">
      <div className="e-left">
        <img src={matchingEvent.ImgSRC} alt="" />
      </div>
      <div className="e-right">
        <div className="right-top">
          <h1>{matchingEvent.nameEvent}</h1>
          <h4>{matchingEvent.description}</h4>
          <p className="rating">
            Rating(4)
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </p>
          <h3>{matchingEvent.date}</h3>
          <h3>
            {matchingEvent.startTime} - {matchingEvent.endTime}
          </h3>
          <h3>duration: {matchingEvent.duration}</h3>
        </div>
        <h1 style={{ textAlign: "center" }}>${matchingEvent.price}</h1>
        <h2 style={{ color: "#9333EA" }}>Select slot</h2>
        <div className="time-slot">
          {matchingEvent.timeSlot.map((timeSlot, index) => (
            <div
              key={index}
              onClick={() =>
                timeSlot.booked ? "" : Selected_slots(timeSlot.time)
              }
              className={
                String(timeSlot.time) === selectedSlot || timeSlot.booked
                  ? "selected-slot"
                  : "slot"
              }
            >
              {timeSlot.time}
            </div>
          ))}
        </div>

        {userType === "user" ? (
          <button onClick={() => buySlot()}>Buy</button>
        ) : (
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCard;
