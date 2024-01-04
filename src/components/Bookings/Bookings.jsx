import React from "react";
import Navbar from "../Navbar/Navbar";
import "./booking.css";

const Bookings = () => {
  const purchasedDataJson = localStorage.getItem("purchasedItems");
  const purchasedDataParse = JSON.parse(purchasedDataJson);

  if (!Array.isArray(purchasedDataParse)) {
    return <div>No booking data available</div>;
  }
  const loginUser = JSON.parse(localStorage.getItem("loginData"));
  const filteredEvents = purchasedDataParse.filter(
    (event) => event.eventData.providerId === loginUser.id
  );

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", padding: "3%" }}>View Bookings</h1>

      <div className="Booking-card-container">
        {filteredEvents.map((booking, index) => (
          <div className="Booking-card" key={index}>
            <h3>Event Info</h3>
            <img
              src={booking.eventData.ImgSRC}
              alt={booking.eventData.nameEvent}
            />
            <div className="flex">
              <div>{booking.eventData.nameEvent}</div>
              <div>${booking.eventData.price}</div>
            </div>
            <h3>User Info</h3>
            <div className="flex">
              <div>{booking.userInfo.name}</div>
              <p>{booking.userInfo.email}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Bookings;
