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
  console.log("selectedSlot: ", selectedSlot);

  const Selected_slots = (time) => {
    setSelectedSlot((prevSelectedSlots) => {
      if (prevSelectedSlots.includes(time)) {
        return prevSelectedSlots.filter(
          (selectedTime) => selectedTime !== time
        );
      } else {
        return [...prevSelectedSlots, time];
      }
    });
  };

  const buySlot = () => {
    const timeSlotsArray = [...matchingEvent.timeSlot];

    if (selectedSlot.length === 0) {
      toast.error("Please select a slot before clicking Buy");
      return;
    }

    const selectedSlotsInfo = selectedSlot
      .map((slot) => {
        const index = timeSlotsArray.findIndex((t) => t.time === slot);

        if (index !== -1 && !timeSlotsArray[index].booked) {
          timeSlotsArray[index] = { ...timeSlotsArray[index], booked: true };
          return slot;
        } else {
          toast.error("selected slots are already booked");
          return null;
        }
      })
      .filter(Boolean);

    if (selectedSlotsInfo.length > 0) {
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

      const existingBookingInfo =
        JSON.parse(localStorage.getItem("bookingInfo")) || [];

      const newBookingObject = {
        user: currentUserInfo,
        eventInfo: matchingEvent,
        slots: selectedSlotsInfo,
      };

      existingBookingInfo.push(newBookingObject);
      const updatedBookingInfoString = JSON.stringify(existingBookingInfo);

      localStorage.setItem("bookingInfo", updatedBookingInfoString);
      toast.success("Slots booked successfully");
      setSelectedSlot([]);
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
                selectedSlot.includes(timeSlot.time) || timeSlot.booked
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
