import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./booking.css";
import { Link } from "react-router-dom";

const Bookings = () => {
  const purchasedDataJson = localStorage.getItem("bookingInfo");
  const purchasedDataParse = JSON.parse(purchasedDataJson);

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [userBooked, setUserBooked] = useState([]);
  const loginUser = JSON.parse(localStorage.getItem("loginData"));
  useEffect(() => {
    if (Array.isArray(purchasedDataParse)) {
      const copyBookings = [...purchasedDataParse];

      const filteredEvents = copyBookings.filter((booking) => {
        return booking.eventInfo.providerId === loginUser.id;
      });
      setFilteredEvents(filteredEvents);

      const filteredUserBookings = copyBookings.filter((booking) => {
        return booking.user.id === loginUser.id;
      });

      console.log("filteredUserBookings in br", filteredUserBookings);

      setUserBooked(filteredUserBookings);
    }
  }, []);
  console.log("UserBooked", userBooked);

  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center", padding: "3%" }}>View Bookings</h1>

      {loginUser.userType === "provider" ? (
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
      ) : (
        <>
          <div className="card-container">
            {userBooked.length === 0 ? (
              <h1 style={{width: '300%', textAlign: 'center'}} >You have't book any event </h1>
            ) : (
              <>
                (
                {userBooked.map((booked) => (
                  <Link
                    to={`/detail/${booked.eventInfo.id}`}
                    key={booked.id}
                    className="Card"
                  >
                    <img
                      src={booked.eventInfo.ImgSRC}
                      alt={booked.eventInfo.nameEvent}
                    />
                    <h1>{booked.eventInfo.nameEvent}</h1>
                    <p>{booked.eventInfo.description}</p>
                    <p>{booked.eventInfo.date}</p>
                    <p>
                      {booked.eventInfo.startTime}- {booked.eventInfo.endTime}
                    </p>
                    <div className="slot">{booked.slot}</div>
                  </Link>
                ))}
                )
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Bookings;
