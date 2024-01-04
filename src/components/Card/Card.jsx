import React, { useEffect, useState } from "react";
import "./Card.css";
import { toast } from "react-toastify";

const Card = ({ sortOption, userEvents }) => {
  const [eventDataList, setEventDataList] = useState(userEvents);
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    nameEvent: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    price: "",
  });

  const storedData = localStorage.getItem("loginData");
  const storedFormData = JSON.parse(storedData);
  const userType = storedFormData ? storedFormData.userType : null;

  useEffect(() => {
    if (userType === "user") {
      const eventDataFromLocalStorage = JSON.parse(
        localStorage.getItem("eventData")
      );
      setEventDataList(eventDataFromLocalStorage);
    } else {
      setEventDataList(userEvents);
    }
  }, [userType, userEvents]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditFormData(eventDataList[index]);
  };

  const handleSaveEdit = () => {
    const updatedEventDataList = [...eventDataList];
    updatedEventDataList[editIndex] = { ...editFormData }; // Copy the edited data
    setEventDataList(updatedEventDataList);
    localStorage.setItem("eventData", JSON.stringify(updatedEventDataList));
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedEventDataList = [...eventDataList];
    updatedEventDataList.splice(index, 1);
    setEventDataList(updatedEventDataList);
    localStorage.setItem("eventData", JSON.stringify(updatedEventDataList));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  function calculateTimeDuration(startTime, endTime) {
    if (!(startTime instanceof Date) || !(endTime instanceof Date)) {
      return "Invalid input";
    }

    const timeDiff = endTime.getTime() - startTime.getTime();
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hours and ${minutes} minutes`;
  }

  const sortEventData = (dataToSort) => {
    if (!dataToSort || !Array.isArray(dataToSort)) {
      return [];
    }

    switch (sortOption) {
      case "price":
        return dataToSort.sort((a, b) => a.price - b.price);
      case "duration":
        return dataToSort.sort(
          (a, b) =>
            new Date(`2023-01-01T${a.endTime}:00`) -
            new Date(`2023-01-01T${b.endTime}:00`)
        );
      case "date":
        return dataToSort.sort((a, b) => new Date(a.date) - new Date(b.date));
      default:
        return dataToSort;
    }
  };

  const sortedEventDataList = sortEventData(eventDataList);

  const [purchasedItems, setPurchasedItems] = useState([]);
  const [bookedEventIds, setBookedEventIds] = useState([]);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("loginData")) || {};
    const loggedInUserId = storedData.id;
    setUserId(loggedInUserId);

    const storedPurchasedItems =
      JSON.parse(localStorage.getItem("purchasedItems")) || [];
    const userBookedEventIds = storedPurchasedItems
      .filter((item) => item.userInfo.id === loggedInUserId)
      .map((item) => item.eventData.id);

    setBookedEventIds(userBookedEventIds);
  }, []);

  const handleBuy = (eventData) => {
    const storedData = JSON.parse(localStorage.getItem("loginData")) || {};
    const loggedInUserId = storedData.id;

    const purchaseInfo = {
      eventData: eventData,
      userInfo: storedData,
    };

    setBookedEventIds((prevBookedEventIds) => [
      ...prevBookedEventIds,
      eventData.id,
    ]);

    const storedPurchasedItems =
      JSON.parse(localStorage.getItem("purchasedItems")) || [];
    const updatedPurchasedItems = [...storedPurchasedItems, purchaseInfo];
    localStorage.setItem(
      "purchasedItems",
      JSON.stringify(updatedPurchasedItems)
    );

    toast.success("Item purchased successfully!");
  };
  return (
    <div className="card-container">
      {sortedEventDataList.length === 0 ? (
        <p>No events to display</p>
      ) : (
        sortedEventDataList.map((eventData, index) => (
          <div key={index} className="Card">
            <img src={eventData.ImgSRC} alt="" />
            <div className="description">
              <div className="description-left">
                <h2>{eventData.nameEvent}</h2>
                <p>{eventData.description}</p>
                <p className="rating">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </p>
              </div>
              <div className="dateTime">
                <h4>{eventData.date}</h4>
                <h5>
                  {eventData.startTime}-{eventData.endTime}
                </h5>
                <h5>
                  Duration:{" "}
                  {calculateTimeDuration(
                    new Date(`2023-01-01T${eventData.startTime}:00`),
                    new Date(`2023-01-01T${eventData.endTime}:00`)
                  )}
                </h5>
                <h3>${eventData.price}</h3>
                {userType === "user" ? (
                  <button
                    onClick={() => handleBuy(eventData)}
                    disabled={bookedEventIds.includes(eventData.id)}
                  >
                    {bookedEventIds.includes(eventData.id) ? "Booked" : "Buy"}
                  </button>
                ) : (
                  <>
                    {editIndex === index ? (
                      <>
                        <input
                          type="text"
                          name="ImgSRC"
                          placeholder="Image Source"
                          value={editFormData.ImgSRC}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="nameEvent"
                          value={editFormData.nameEvent}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="description"
                          value={editFormData.description}
                          onChange={handleChange}
                        />
                        <input
                          type="date"
                          name="date"
                          value={editFormData.date}
                          onChange={handleChange}
                        />
                        <input
                          type="time"
                          name="startTime"
                          value={editFormData.startTime}
                          onChange={handleChange}
                        />
                        <input
                          type="time"
                          name="endTime"
                          value={editFormData.endTime}
                          onChange={handleChange}
                        />
                        <input
                          type="number"
                          name="price"
                          value={editFormData.price}
                          onChange={handleChange}
                        />
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={() => setEditIndex(null)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>
                          Delete
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
