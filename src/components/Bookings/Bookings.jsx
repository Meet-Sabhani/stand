import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./booking.css";

const Bookings = () => {
  const purchasedDataJson = localStorage.getItem("bookingInfo");
  const purchasedDataParse = JSON.parse(purchasedDataJson);

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (Array.isArray(purchasedDataParse)) {
      const copyBookings = [...purchasedDataParse];
      const loginUser = JSON.parse(localStorage.getItem("loginData"));

      const filteredEvents = copyBookings.filter((booking) => {
        return booking.eventInfo.providerId === loginUser.id;
      });

      setFilteredEvents(filteredEvents);
    }
  }, [purchasedDataParse]);

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", padding: "3%" }}>View Bookings</h1>
      <div className="Booking-card-container">
        {filteredEvents.length === 0 ? (
          <h1>No Bookings</h1>
        ) : (
          <>
            {filteredEvents.map((booking) => (
              <div className="Booking-card" key={booking.id}>
                <h3>Event Info</h3>
                <img
                  src={booking.eventInfo.ImgSRC}
                  alt={booking.eventInfo.nameEvent}
                />
                <div className="flex">
                  <div>Event :- {booking.eventInfo.nameEvent}</div>
                  <div> Price : ${booking.eventInfo.price}</div>
                </div>
                <h3>User Info</h3>
                <div>Name : {booking.user.name}</div>
                <p>Email : {booking.user.email}</p>
                <h3>Slot</h3>
                <div className="slot">{booking.slot}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
